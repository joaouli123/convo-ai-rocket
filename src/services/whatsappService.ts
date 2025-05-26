
interface WhatsAppSession {
  id: string;
  clientId: string;
  isConnected: boolean;
  qrCode?: string;
  phone?: string;
  lastSeen?: Date;
}

class WhatsAppService {
  private sessions: Map<string, WhatsAppSession> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  // Criar nova sessão
  createSession(connectionId: string): WhatsAppSession {
    const session: WhatsAppSession = {
      id: connectionId,
      clientId: `client-${connectionId}-${Date.now()}`,
      isConnected: false,
    };

    this.sessions.set(connectionId, session);
    return session;
  }

  // Gerar QR Code para sessão
  async generateQRCode(connectionId: string): Promise<string> {
    const session = this.sessions.get(connectionId);
    if (!session) {
      throw new Error('Sessão não encontrada');
    }

    // Simular geração de QR Code do WhatsApp Web
    const qrData = {
      clientId: session.clientId,
      timestamp: Date.now(),
      server: 'web.whatsapp.com',
      ref: Math.random().toString(36).substring(7)
    };

    const qrString = JSON.stringify(qrData);
    session.qrCode = qrString;
    
    this.sessions.set(connectionId, session);
    this.emit('qr', { connectionId, qrCode: qrString });

    // Simular expiração do QR em 20 segundos
    setTimeout(() => {
      if (session && !session.isConnected) {
        this.generateQRCode(connectionId);
      }
    }, 20000);

    return qrString;
  }

  // Simular conexão
  simulateConnection(connectionId: string): void {
    const session = this.sessions.get(connectionId);
    if (!session) return;

    session.isConnected = true;
    session.phone = `(11) 99${Math.floor(Math.random() * 1000)}-${Math.floor(Math.random() * 9999)}`;
    session.lastSeen = new Date();
    session.qrCode = undefined;

    this.sessions.set(connectionId, session);
    this.emit('connected', { connectionId, session });
  }

  // Desconectar sessão
  disconnect(connectionId: string): void {
    const session = this.sessions.get(connectionId);
    if (!session) return;

    session.isConnected = false;
    session.qrCode = undefined;
    session.lastSeen = new Date();

    this.sessions.set(connectionId, session);
    this.emit('disconnected', { connectionId });
  }

  // Remover sessão
  removeSession(connectionId: string): void {
    this.sessions.delete(connectionId);
    this.eventListeners.delete(connectionId);
    this.emit('removed', { connectionId });
  }

  // Obter sessão
  getSession(connectionId: string): WhatsAppSession | undefined {
    return this.sessions.get(connectionId);
  }

  // Listar todas as sessões
  getAllSessions(): WhatsAppSession[] {
    return Array.from(this.sessions.values());
  }

  // Sistema de eventos
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  private emit(event: string, data: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Enviar mensagem (simulado)
  async sendMessage(connectionId: string, to: string, message: string): Promise<boolean> {
    const session = this.sessions.get(connectionId);
    if (!session || !session.isConnected) {
      throw new Error('Sessão não conectada');
    }

    // Simular envio de mensagem
    console.log(`Enviando mensagem via ${connectionId} para ${to}: ${message}`);
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.emit('message_sent', { connectionId, to, message, timestamp: new Date() });
    return true;
  }

  // Verificar status de conexão
  isConnected(connectionId: string): boolean {
    const session = this.sessions.get(connectionId);
    return session?.isConnected || false;
  }
}

// Singleton instance
export const whatsappService = new WhatsAppService();

export default WhatsAppService;
