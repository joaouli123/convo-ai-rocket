import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Smartphone, Wifi, WifiOff, QrCode, Trash2, RefreshCw } from 'lucide-react';
import { whatsappService, WhatsAppConnection } from '@/services/whatsappService';
import { toast } from 'sonner';

const WhatsAppConnections = () => {
  const [connections, setConnections] = useState<WhatsAppConnection[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newConnectionName, setNewConnectionName] = useState('');
  const [selectedQrConnection, setSelectedQrConnection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadConnections();

    // Atualizar conexões a cada 10 segundos
    const interval = setInterval(loadConnections, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadConnections = async () => {
    try {
      const data = await whatsappService.getConnections();
      setConnections(data);
    } catch (error) {
      console.error('Erro ao carregar conexões:', error);
      toast.error('Erro ao carregar conexões');
    }
  };

  const handleCreateConnection = async () => {
    if (!newConnectionName.trim()) {
      toast.error('Nome da conexão é obrigatório');
      return;
    }

    setIsLoading(true);
    try {
      await whatsappService.createConnection(newConnectionName);
      toast.success('Conexão criada! Aguarde o QR Code...');
      setNewConnectionName('');
      setIsCreateDialogOpen(false);
      await loadConnections();
    } catch (error) {
      console.error('Erro ao criar conexão:', error);
      toast.error('Erro ao criar conexão');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    try {
      const success = await whatsappService.disconnectConnection(connectionId);
      if (success) {
        toast.success('Conexão desconectada');
        await loadConnections();
      } else {
        toast.error('Erro ao desconectar');
      }
    } catch (error) {
      console.error('Erro ao desconectar:', error);
      toast.error('Erro ao desconectar');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800"><Wifi className="w-3 h-3 mr-1" />Conectado</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-100 text-yellow-800"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Conectando</Badge>;
      case 'disconnected':
        return <Badge className="bg-red-100 text-red-800"><WifiOff className="w-3 h-3 mr-1" />Desconectado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>;
    }
  };

  const QrCodeDialog = ({ connectionId }: { connectionId: string }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [isLoadingQr, setIsLoadingQr] = useState(true);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      const fetchQrCode = async () => {
        try {
          const qr = await whatsappService.getQrCode(connectionId);
          if (qr) {
            setQrCode(qr);
            setIsLoadingQr(false);
          }

          // Verificar se foi conectado
          const status = await whatsappService.getConnectionStatus(connectionId);
          if (status?.status === 'connected') {
            setSelectedQrConnection(null);
            await loadConnections();
            toast.success('WhatsApp conectado com sucesso!');
          }
        } catch (error) {
          console.error('Erro ao buscar QR Code:', error);
        }
      };

      fetchQrCode();
      interval = setInterval(fetchQrCode, 3000);

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [connectionId]);

    return (
      <Dialog open={selectedQrConnection === connectionId} onOpenChange={() => setSelectedQrConnection(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Conectar WhatsApp
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Escaneie o QR Code com seu WhatsApp para conectar
            </p>
            {isLoadingQr ? (
              <div className="flex items-center justify-center h-64">
                <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Gerando QR Code...</span>
              </div>
            ) : qrCode ? (
              <img src={qrCode} alt="QR Code" className="mx-auto border rounded-lg" />
            ) : (
              <div className="text-gray-500">QR Code não disponível</div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              O QR Code expira em alguns minutos. Se não funcionar, tente criar uma nova conexão.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conexões WhatsApp</h1>
          <p className="text-gray-600">Gerencie múltiplos números do WhatsApp</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Conexão
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Nova Conexão</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nome da Conexão</label>
                <Input
                  placeholder="Ex: Vendas, Suporte, etc."
                  value={newConnectionName}
                  onChange={(e) => setNewConnectionName(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleCreateConnection} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Conexão'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <Card key={connection.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Smartphone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                  {connection.phoneNumber && (
                    <p className="text-sm text-gray-600">{connection.phoneNumber}</p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDisconnect(connection.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                {getStatusBadge(connection.status)}
              </div>

              {connection.status === 'connecting' && (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedQrConnection(connection.id)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Ver QR Code
                  </Button>
                  <QrCodeDialog connectionId={connection.id} />
                </div>
              )}

              {connection.status === 'connected' && (
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Conectado desde: {connection.createdAt.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {connections.length === 0 && (
        <div className="text-center py-12">
          <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conexão encontrada</h3>
          <p className="text-gray-600 mb-4">Crie sua primeira conexão WhatsApp para começar</p>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeira Conexão
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppConnections;