
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Bot, Check } from 'lucide-react';

const WhatsAppManager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    {
      id: 1,
      name: 'Maria Silva',
      lastMessage: 'Oi, gostaria de saber mais sobre seus produtos',
      time: '14:32',
      unread: 2,
      aiActive: true,
      status: 'lead',
    },
    {
      id: 2,
      name: 'João Santos',
      lastMessage: 'Perfeito, vou aguardar o orçamento',
      time: '13:45',
      unread: 0,
      aiActive: false,
      status: 'proposta',
    },
    {
      id: 3,
      name: 'Ana Costa',
      lastMessage: 'Muito obrigada pelo atendimento!',
      time: '12:10',
      unread: 1,
      aiActive: true,
      status: 'fechado',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">WhatsApp Manager</h1>
        <p className="text-gray-600">Gerencie suas conversas do WhatsApp</p>
      </div>

      {!isConnected ? (
        <Card className="p-8 border-0 shadow-lg text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mx-auto mb-6 flex items-center justify-center">
            <MessageSquare className="w-16 h-16 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Conecte seu WhatsApp</h3>
          <p className="text-gray-600 mb-6">Escaneie o QR Code com seu celular para iniciar</p>
          <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-6 flex items-center justify-center">
            <span className="text-gray-500">QR Code apareceria aqui</span>
          </div>
          <Button onClick={() => setIsConnected(true)} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
            Simular Conexão
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          <Card className="lg:col-span-1 p-4 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Conversas</h3>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{chat.name}</span>
                        {chat.aiActive && <Bot className="w-4 h-4 text-blue-500" />}
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{chat.time}</span>
                        <Badge
                          className={
                            chat.status === 'lead'
                              ? 'bg-blue-100 text-blue-800'
                              : chat.status === 'proposta'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }
                        >
                          {chat.status}
                        </Badge>
                      </div>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-4 border-0 shadow-lg">
            {selectedChat ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-medium">
                      {selectedChat.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedChat.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Online</span>
                        {selectedChat.aiActive && (
                          <Badge className="bg-blue-100 text-blue-800">IA Ativa</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      {selectedChat.aiActive ? 'Desativar IA' : 'Ativar IA'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Encerrar Atendimento
                    </Button>
                  </div>
                </div>

                <div className="flex-1 py-4 space-y-4 overflow-auto">
                  <div className="flex">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Oi, gostaria de saber mais sobre seus produtos</p>
                      <span className="text-xs text-gray-500">14:30</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Olá! Ficamos felizes com seu interesse. Em que posso ajudá-la?</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className="text-xs opacity-80">14:32</span>
                        <Check className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Selecione uma conversa para visualizar</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default WhatsAppManager;
