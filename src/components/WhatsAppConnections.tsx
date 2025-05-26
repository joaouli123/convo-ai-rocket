
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Trash2, QrCode, Smartphone, User, Users } from 'lucide-react';

interface Connection {
  id: number;
  name: string;
  phone: string;
  isConnected: boolean;
  qrCode: string;
  status: string;
  attendantId?: number;
  departmentId?: number;
}

const WhatsAppConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [newConnectionName, setNewConnectionName] = useState('');

  // Dados mockados para atendentes e departamentos
  const attendants = [
    { id: 1, name: 'Maria Silva', departmentId: 1 },
    { id: 2, name: 'João Santos', departmentId: 2 }
  ];

  const departments = [
    { id: 1, name: 'Vendas', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Suporte', color: 'bg-green-100 text-green-800' }
  ];

  const addNewConnection = () => {
    if (newConnectionName.trim()) {
      const newConnection: Connection = {
        id: Date.now(),
        name: newConnectionName,
        phone: '',
        isConnected: false,
        qrCode: `qr-${Date.now()}`,
        status: 'connecting'
      };
      setConnections([...connections, newConnection]);
      setNewConnectionName('');
      setShowConnectionModal(false);
    }
  };

  const removeConnection = (connectionId: number) => {
    setConnections(connections.filter(conn => conn.id !== connectionId));
  };

  const connectWhatsApp = (connectionId: number) => {
    setConnections(connections.map(conn => 
      conn.id === connectionId 
        ? { ...conn, isConnected: true, status: 'connected', phone: '(11) 99999-' + Math.floor(Math.random() * 9999) }
        : conn
    ));
  };

  const updateConnectionAttendant = (connectionId: number, attendantId: number) => {
    const attendant = attendants.find(att => att.id === attendantId);
    setConnections(connections.map(conn => 
      conn.id === connectionId 
        ? { ...conn, attendantId, departmentId: attendant?.departmentId }
        : conn
    ));
  };

  const getAttendantName = (attendantId?: number) => {
    return attendants.find(att => att.id === attendantId)?.name || 'Não atribuído';
  };

  const getDepartmentInfo = (departmentId?: number) => {
    return departments.find(dept => dept.id === departmentId);
  };

  return (
    <div className="space-y-6">
      {/* Seção de Conexões WhatsApp */}
      <Card className="p-6 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Conexões WhatsApp</h3>
              <p className="text-gray-600">Gerencie múltiplos números do WhatsApp</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowConnectionModal(true)}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Conexão
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const departmentInfo = getDepartmentInfo(connection.departmentId);
            return (
              <Card key={connection.id} className="p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{connection.name}</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeConnection(connection.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {connection.isConnected ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800 mb-2">Conectado</Badge>
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                          <Smartphone className="w-4 h-4" />
                          <span>{connection.phone}</span>
                        </div>
                      </div>

                      {/* Atribuição de Atendente */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Atendente Responsável
                          </label>
                          <Select 
                            value={connection.attendantId?.toString() || ''} 
                            onValueChange={(value) => updateConnectionAttendant(connection.id, parseInt(value))}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Selecionar atendente" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border shadow-lg z-50">
                              {attendants.map(attendant => (
                                <SelectItem key={attendant.id} value={attendant.id.toString()}>
                                  <div className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>{attendant.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Informações do Atendente */}
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{getAttendantName(connection.attendantId)}</span>
                          </div>
                          {departmentInfo && (
                            <div className="flex items-center space-x-2 mt-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <Badge className={departmentInfo.color + " text-xs"}>
                                {departmentInfo.name}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* QR Code mais visível e robusto */}
                      <div className="bg-white border-4 border-gray-200 rounded-xl p-6 shadow-inner">
                        <div className="w-48 h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mx-auto">
                          <div className="text-center">
                            <QrCode className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                            <div className="text-xs text-gray-500 space-y-1">
                              <p className="font-medium">QR Code para Conexão</p>
                              <p>Escaneie com o WhatsApp</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-3">
                        <Badge className="bg-yellow-100 text-yellow-800">Aguardando Conexão</Badge>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-medium">Como conectar:</p>
                          <ol className="text-xs text-gray-500 space-y-1 text-left">
                            <li>1. Abra o WhatsApp no celular</li>
                            <li>2. Vá em Configurações → Aparelhos conectados</li>
                            <li>3. Toque em "Conectar um aparelho"</li>
                            <li>4. Escaneie o QR Code acima</li>
                          </ol>
                        </div>
                        <Button 
                          onClick={() => connectWhatsApp(connection.id)}
                          size="sm"
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                        >
                          Simular Conexão
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Modal para Nova Conexão */}
      {showConnectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4">Nova Conexão WhatsApp</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Conexão
                </label>
                <input
                  type="text"
                  value={newConnectionName}
                  onChange={(e) => setNewConnectionName(e.target.value)}
                  placeholder="Ex: Vendas, Suporte, Principal..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={addNewConnection}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Criar Conexão
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowConnectionModal(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WhatsAppConnections;
