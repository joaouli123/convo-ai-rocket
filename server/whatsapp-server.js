
const express = require('express');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const QRCode = require('qrcode');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenar instâncias dos clientes WhatsApp
const whatsappClients = new Map();
const qrCodes = new Map();

// Rota para criar nova conexão WhatsApp
app.post('/api/whatsapp/create', async (req, res) => {
  const { connectionId, name } = req.body;
  
  try {
    if (whatsappClients.has(connectionId)) {
      return res.status(400).json({ error: 'Conexão já existe' });
    }

    const client = new Client({
      authStrategy: new LocalAuth({
        clientId: connectionId,
        dataPath: path.join(__dirname, 'sessions')
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      }
    });

    // Event listeners
    client.on('qr', (qr) => {
      console.log(`QR Code gerado para ${connectionId}`);
      QRCode.toDataURL(qr, (err, url) => {
        if (!err) {
          qrCodes.set(connectionId, url);
        }
      });
    });

    client.on('ready', () => {
      console.log(`Cliente ${connectionId} está pronto!`);
      qrCodes.delete(connectionId);
    });

    client.on('authenticated', () => {
      console.log(`Cliente ${connectionId} autenticado`);
    });

    client.on('auth_failure', (msg) => {
      console.error(`Falha na autenticação para ${connectionId}:`, msg);
    });

    client.on('disconnected', (reason) => {
      console.log(`Cliente ${connectionId} desconectado:`, reason);
      whatsappClients.delete(connectionId);
      qrCodes.delete(connectionId);
    });

    client.on('message', async (message) => {
      console.log(`Mensagem recebida em ${connectionId}:`, message.body);
      // Aqui você pode implementar a lógica para processar mensagens
    });

    whatsappClients.set(connectionId, {
      client,
      name,
      status: 'connecting',
      createdAt: new Date()
    });

    await client.initialize();

    res.json({ 
      success: true, 
      connectionId,
      message: 'Conexão iniciada. Aguarde o QR Code.' 
    });

  } catch (error) {
    console.error('Erro ao criar conexão:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para obter QR Code
app.get('/api/whatsapp/qr/:connectionId', (req, res) => {
  const { connectionId } = req.params;
  const qrCode = qrCodes.get(connectionId);
  
  if (!qrCode) {
    return res.status(404).json({ error: 'QR Code não encontrado' });
  }
  
  res.json({ qrCode });
});

// Rota para listar conexões
app.get('/api/whatsapp/connections', (req, res) => {
  const connections = Array.from(whatsappClients.entries()).map(([id, data]) => ({
    id,
    name: data.name,
    status: data.client.info ? 'connected' : 'connecting',
    createdAt: data.createdAt,
    phoneNumber: data.client.info?.wid?.user || null
  }));
  
  res.json(connections);
});

// Rota para status da conexão
app.get('/api/whatsapp/status/:connectionId', async (req, res) => {
  const { connectionId } = req.params;
  const clientData = whatsappClients.get(connectionId);
  
  if (!clientData) {
    return res.status(404).json({ error: 'Conexão não encontrada' });
  }
  
  const isConnected = await clientData.client.getState() === 'CONNECTED';
  
  res.json({
    connectionId,
    name: clientData.name,
    status: isConnected ? 'connected' : 'connecting',
    phoneNumber: clientData.client.info?.wid?.user || null,
    hasQrCode: qrCodes.has(connectionId)
  });
});

// Rota para enviar mensagem
app.post('/api/whatsapp/send/:connectionId', async (req, res) => {
  const { connectionId } = req.params;
  const { to, message } = req.body;
  
  const clientData = whatsappClients.get(connectionId);
  
  if (!clientData) {
    return res.status(404).json({ error: 'Conexão não encontrada' });
  }
  
  try {
    const chatId = to.includes('@') ? to : `${to}@c.us`;
    await clientData.client.sendMessage(chatId, message);
    
    res.json({ success: true, message: 'Mensagem enviada' });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

// Rota para desconectar
app.delete('/api/whatsapp/disconnect/:connectionId', async (req, res) => {
  const { connectionId } = req.params;
  const clientData = whatsappClients.get(connectionId);
  
  if (!clientData) {
    return res.status(404).json({ error: 'Conexão não encontrada' });
  }
  
  try {
    await clientData.client.destroy();
    whatsappClients.delete(connectionId);
    qrCodes.delete(connectionId);
    
    res.json({ success: true, message: 'Conexão desconectada' });
  } catch (error) {
    console.error('Erro ao desconectar:', error);
    res.status(500).json({ error: 'Erro ao desconectar' });
  }
});

// Criar diretório de sessões se não existir
const sessionsDir = path.join(__dirname, 'sessions');
if (!fs.existsSync(sessionsDir)) {
  fs.mkdirSync(sessionsDir, { recursive: true });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor WhatsApp rodando na porta ${PORT}`);
  console.log(`Servidor acessível em: http://0.0.0.0:${PORT}`);
});
