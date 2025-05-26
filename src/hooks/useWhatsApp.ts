
import { useState, useEffect, useCallback } from 'react';
import { whatsappService } from '../services/whatsappService';

interface UseWhatsAppConnection {
  id: string;
  name: string;
  isConnected: boolean;
  qrCode?: string;
  phone?: string;
  status: 'connecting' | 'connected' | 'disconnected' | 'qr_ready';
}

export const useWhatsApp = () => {
  const [connections, setConnections] = useState<UseWhatsAppConnection[]>([]);
  const [loading, setLoading] = useState(false);

  // Atualizar conexão
  const updateConnection = useCallback((connectionId: string, updates: Partial<UseWhatsAppConnection>) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId ? { ...conn, ...updates } : conn
      )
    );
  }, []);

  // Criar nova conexão
  const createConnection = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const connectionId = `conn-${Date.now()}`;
      const newConnection: UseWhatsAppConnection = {
        id: connectionId,
        name,
        isConnected: false,
        status: 'connecting'
      };

      setConnections(prev => [...prev, newConnection]);
      
      // Criar sessão no serviço
      whatsappService.createSession(connectionId);
      
      // Gerar QR Code
      setTimeout(async () => {
        try {
          await whatsappService.generateQRCode(connectionId);
          updateConnection(connectionId, { status: 'qr_ready' });
        } catch (error) {
          console.error('Erro ao gerar QR Code:', error);
        }
      }, 1000);

      return connectionId;
    } finally {
      setLoading(false);
    }
  }, [updateConnection]);

  // Remover conexão
  const removeConnection = useCallback((connectionId: string) => {
    whatsappService.removeSession(connectionId);
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  }, []);

  // Conectar WhatsApp
  const connectWhatsApp = useCallback((connectionId: string) => {
    whatsappService.simulateConnection(connectionId);
  }, []);

  // Desconectar WhatsApp
  const disconnectWhatsApp = useCallback((connectionId: string) => {
    whatsappService.disconnect(connectionId);
    updateConnection(connectionId, { 
      isConnected: false, 
      status: 'disconnected',
      phone: undefined 
    });
  }, [updateConnection]);

  // Refresh QR Code
  const refreshQRCode = useCallback(async (connectionId: string) => {
    updateConnection(connectionId, { status: 'connecting' });
    
    setTimeout(async () => {
      try {
        await whatsappService.generateQRCode(connectionId);
        updateConnection(connectionId, { status: 'qr_ready' });
      } catch (error) {
        console.error('Erro ao refresh QR Code:', error);
      }
    }, 1000);
  }, [updateConnection]);

  // Enviar mensagem
  const sendMessage = useCallback(async (connectionId: string, to: string, message: string) => {
    try {
      return await whatsappService.sendMessage(connectionId, to, message);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }, []);

  // Setup event listeners
  useEffect(() => {
    const handleQRGenerated = ({ connectionId, qrCode }: any) => {
      updateConnection(connectionId, { qrCode, status: 'qr_ready' });
    };

    const handleConnected = ({ connectionId, session }: any) => {
      updateConnection(connectionId, {
        isConnected: true,
        status: 'connected',
        phone: session.phone,
        qrCode: undefined
      });
    };

    const handleDisconnected = ({ connectionId }: any) => {
      updateConnection(connectionId, {
        isConnected: false,
        status: 'disconnected',
        phone: undefined
      });
    };

    whatsappService.on('qr', handleQRGenerated);
    whatsappService.on('connected', handleConnected);
    whatsappService.on('disconnected', handleDisconnected);

    return () => {
      // Cleanup listeners seria feito aqui se tivéssemos um método off
    };
  }, [updateConnection]);

  return {
    connections,
    loading,
    createConnection,
    removeConnection,
    connectWhatsApp,
    disconnectWhatsApp,
    refreshQRCode,
    sendMessage
  };
};
