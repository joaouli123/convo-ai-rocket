
const API_BASE_URL = 'http://localhost:3001/api/whatsapp';

export interface WhatsAppConnection {
  id: string;
  name: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  phoneNumber?: string;
  createdAt: Date;
  qrCode?: string;
}

class WhatsAppService {
  private connections: Map<string, WhatsAppConnection> = new Map();

  async createConnection(name: string): Promise<string> {
    const connectionId = `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionId, name }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar conexão');
      }

      const data = await response.json();
      
      // Adicionar conexão local
      this.connections.set(connectionId, {
        id: connectionId,
        name,
        status: 'connecting',
        createdAt: new Date(),
      });

      // Começar a monitorar QR Code
      this.pollQrCode(connectionId);
      
      return connectionId;
    } catch (error) {
      console.error('Erro ao criar conexão:', error);
      throw error;
    }
  }

  async getConnections(): Promise<WhatsAppConnection[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/connections`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar conexões');
      }

      const connections = await response.json();
      
      // Atualizar cache local
      connections.forEach((conn: any) => {
        this.connections.set(conn.id, {
          id: conn.id,
          name: conn.name,
          status: conn.status,
          phoneNumber: conn.phoneNumber,
          createdAt: new Date(conn.createdAt),
        });
      });

      return Array.from(this.connections.values());
    } catch (error) {
      console.error('Erro ao buscar conexões:', error);
      return Array.from(this.connections.values());
    }
  }

  async getConnectionStatus(connectionId: string): Promise<WhatsAppConnection | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/status/${connectionId}`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      
      const connection: WhatsAppConnection = {
        id: data.connectionId,
        name: data.name,
        status: data.status,
        phoneNumber: data.phoneNumber,
        createdAt: new Date(),
      };

      this.connections.set(connectionId, connection);
      
      return connection;
    } catch (error) {
      console.error('Erro ao buscar status:', error);
      return null;
    }
  }

  async getQrCode(connectionId: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/qr/${connectionId}`);
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.qrCode;
    } catch (error) {
      console.error('Erro ao buscar QR Code:', error);
      return null;
    }
  }

  async sendMessage(connectionId: string, to: string, message: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/send/${connectionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, message }),
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return false;
    }
  }

  async disconnectConnection(connectionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/disconnect/${connectionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.connections.delete(connectionId);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      return false;
    }
  }

  private async pollQrCode(connectionId: string) {
    const maxAttempts = 60; // 5 minutos
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        console.log('Timeout ao aguardar QR Code');
        return;
      }

      const connection = this.connections.get(connectionId);
      if (!connection || connection.status === 'connected') {
        return;
      }

      try {
        const qrCode = await this.getQrCode(connectionId);
        if (qrCode) {
          connection.qrCode = qrCode;
          this.connections.set(connectionId, connection);
        }

        // Verificar status
        const status = await this.getConnectionStatus(connectionId);
        if (status?.status === 'connected') {
          const updatedConnection = this.connections.get(connectionId);
          if (updatedConnection) {
            updatedConnection.status = 'connected';
            updatedConnection.qrCode = undefined;
            this.connections.set(connectionId, updatedConnection);
          }
          return;
        }

        attempts++;
        setTimeout(poll, 5000); // Poll a cada 5 segundos
      } catch (error) {
        console.error('Erro no polling:', error);
        attempts++;
        setTimeout(poll, 5000);
      }
    };

    poll();
  }
}

export const whatsappService = new WhatsAppService();
