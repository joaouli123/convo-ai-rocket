import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MessageSquare, Bot, Check, Filter, Paperclip, Send, MoreHorizontal, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

const WhatsAppManager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterTag, setFilterTag] = useState('todas');
  const [filterAI, setFilterAI] = useState('todos');
  const [isContactSheetOpen, setIsContactSheetOpen] = useState(false);

  const tags = [
    { id: 'lead', name: 'Lead', color: 'bg-blue-100 text-blue-800' },
    { id: 'proposta', name: 'Proposta', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'fechado', name: 'Fechado', color: 'bg-green-100 text-green-800' },
    { id: 'suporte', name: 'Suporte', color: 'bg-purple-100 text-purple-800' },
    { id: 'perdido', name: 'Perdido', color: 'bg-red-100 text-red-800' },
  ];

  const messageTemplates = [
    { id: 1, name: 'Saudação inicial', content: 'Olá! Bem-vindo(a)! Como posso ajudá-lo(a) hoje?' },
    { id: 2, name: 'Solicitar orçamento', content: 'Ficamos felizes com seu interesse! Para enviar um orçamento personalizado, preciso de algumas informações...' },
    { id: 3, name: 'Agradecimento', content: 'Muito obrigado(a) pelo seu tempo! Estamos aqui sempre que precisar.' },
    { id: 4, name: 'Envio de proposta', content: 'Conforme conversamos, estou enviando nossa proposta. Quando podemos conversar sobre os próximos passos?' },
  ];

  const chats = [
    {
      id: 1,
      name: 'Maria Silva',
      phone: '(11) 99999-1234',
      email: 'maria.silva@email.com',
      lastMessage: 'Oi, gostaria de saber mais sobre seus produtos',
      time: '14:32',
      date: '2024-01-15',
      unread: 2,
      aiActive: true,
      status: 'lead',
      notes: 'Cliente interessada em produtos para cabelo cacheado. Trabalha na área de beleza.',
      address: 'São Paulo, SP',
    },
    {
      id: 2,
      name: 'João Santos',
      phone: '(11) 99999-5678',
      email: 'joao.santos@empresa.com',
      lastMessage: 'Perfeito, vou aguardar o orçamento',
      time: '13:45',
      date: '2024-01-15',
      unread: 0,
      aiActive: false,
      status: 'proposta',
      notes: 'Dono de salão. Interessado em compra em grande quantidade.',
      address: 'Santos, SP',
    },
    {
      id: 3,
      name: 'Ana Costa',
      phone: '(11) 99999-9012',
      email: 'ana.costa@email.com',
      lastMessage: 'Muito obrigada pelo atendimento!',
      time: '12:10',
      date: '2024-01-14',
      unread: 1,
      aiActive: true,
      status: 'fechado',
      notes: 'Cliente satisfeita. Possível indicação de novos clientes.',
      address: 'Campinas, SP',
    },
  ];

  const filteredChats = chats.filter(chat => {
    if (filterStatus !== 'todos' && chat.status !== filterStatus) return false;
    if (filterTag !== 'todas' && chat.status !== filterTag) return false;
    if (filterAI === 'ativa' && !chat.aiActive) return false;
    if (filterAI === 'inativa' && chat.aiActive) return false;
    return true;
  });

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Enviando mensagem:', messageText);
      setMessageText('');
      setSelectedTemplate('');
    }
  };

  const handleTemplateSelect = (template) => {
    setMessageText(template.content);
    setSelectedTemplate('');
  };

  const handleFileUpload = () => {
    console.log('Abrindo seletor de arquivos...');
  };

  const updateChatTag = (chatId, newTag) => {
    console.log(`Atualizando etiqueta do chat ${chatId} para ${newTag}`);
  };

  const getTagInfo = (tagId) => {
    return tags.find(tag => tag.id === tagId) || tags[0];
  };

  return (
    <div className="space-y-6">
      {/* Header com espaço para logo */}
      <div className="bg-white border-b border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-500">Logo</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WhatsApp Manager</h1>
              <p className="text-gray-600">Gerencie suas conversas do WhatsApp</p>
            </div>
          </div>
          {isConnected && (
            <Badge className="bg-green-100 text-green-800">WhatsApp Conectado</Badge>
          )}
        </div>
      </div>

      {isConnected ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px]">
          <Card className="lg:col-span-1 p-4 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Conversas</h3>
            </div>

            {/* Filtros */}
            <div className="space-y-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <Filter className="w-4 h-4" />
                <span>Filtros</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="lead">Novos leads</SelectItem>
                    <SelectItem value="proposta">Proposta enviada</SelectItem>
                    <SelectItem value="fechado">Fechados</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterAI} onValueChange={setFilterAI}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="IA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">IA - Todos</SelectItem>
                    <SelectItem value="ativa">IA Ativa</SelectItem>
                    <SelectItem value="inativa">IA Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 overflow-auto">
              {filteredChats.map((chat) => {
                return (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100 ${
                      selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{chat.name}</span>
                          {chat.aiActive && <Bot className="w-4 h-4 text-blue-500" />}
                        </div>
                        <p className="text-sm text-gray-600 truncate mb-1">{chat.lastMessage}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{chat.time}</span>
                            <Badge className={getTagInfo(chat.status).color + " text-xs"}>
                              {getTagInfo(chat.status).name}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="lg:col-span-2 p-4 border-0 shadow-lg">
            {selectedChat ? (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setIsContactSheetOpen(true)}
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-medium hover:shadow-md transition-shadow"
                    >
                      {selectedChat.name.charAt(0)}
                    </button>
                    <div>
                      <button 
                        onClick={() => setIsContactSheetOpen(true)}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {selectedChat.name}
                      </button>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Online</span>
                        <Select value={selectedChat.status} onValueChange={(value) => updateChatTag(selectedChat.id, value)}>
                          <SelectTrigger className="h-6 w-auto border-0 bg-transparent p-0 focus:ring-0">
                            <Badge className={getTagInfo(selectedChat.status).color}>
                              {getTagInfo(selectedChat.status).name}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent className="bg-white border shadow-lg z-50">
                            {tags.map(tag => (
                              <SelectItem key={tag.id} value={tag.id}>
                                <Badge className={tag.color}>{tag.name}</Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                    <Sheet open={isContactSheetOpen} onOpenChange={setIsContactSheetOpen}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-96">
                        <SheetHeader>
                          <SheetTitle className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span>Informações do Contato</span>
                          </SheetTitle>
                        </SheetHeader>
                        
                        <div className="space-y-6 mt-6">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                              {selectedChat.name.charAt(0)}
                            </div>
                            <h3 className="font-semibold text-lg">{selectedChat.name}</h3>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Etiqueta</label>
                            <Select value={selectedChat.status} onValueChange={(value) => updateChatTag(selectedChat.id, value)}>
                              <SelectTrigger className="w-full">
                                <Badge className={getTagInfo(selectedChat.status).color}>
                                  {getTagInfo(selectedChat.status).name}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent className="bg-white border shadow-lg z-50">
                                {tags.map(tag => (
                                  <SelectItem key={tag.id} value={tag.id}>
                                    <Badge className={tag.color}>{tag.name}</Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{selectedChat.phone}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <input 
                                type="email" 
                                defaultValue={selectedChat.email}
                                className="text-sm border border-gray-300 rounded px-2 py-1 flex-1"
                                placeholder="Email do contato"
                              />
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <input 
                                type="text" 
                                defaultValue={selectedChat.address}
                                className="text-sm border border-gray-300 rounded px-2 py-1 flex-1"
                                placeholder="Endereço"
                              />
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">Última conversa: {selectedChat.date}</span>
                            </div>
                          </div>

                          <div>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                              <FileText className="w-4 h-4" />
                              <span>Anotações</span>
                            </label>
                            <textarea
                              defaultValue={selectedChat.notes}
                              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none"
                              rows={4}
                              placeholder="Adicione suas anotações sobre este contato..."
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1" onClick={() => setIsContactSheetOpen(false)}>
                              Salvar
                            </Button>
                            <Button variant="outline" onClick={() => setIsContactSheetOpen(false)}>
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
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

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex space-x-2">
                    <Select value={selectedTemplate} onValueChange={(value) => {
                      const template = messageTemplates.find(t => t.id.toString() === value);
                      if (template) handleTemplateSelect(template);
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Mensagens prontas" />
                      </SelectTrigger>
                      <SelectContent>
                        {messageTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleFileUpload}
                      className="px-3"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    >
                      <Send className="w-4 h-4" />
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
      ) : (
        <div className="h-[650px] flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-gray-600">Conecte seu WhatsApp para começar</p>
          </div>
        </div>
      )}

      {/* Barra inferior com conexão WhatsApp */}
      {!isConnected && (
        <Card className="p-6 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Conecte seu WhatsApp</h3>
                <p className="text-gray-600">Escaneie o QR Code com seu celular para iniciar</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">QR Code</span>
              </div>
              <Button onClick={() => setIsConnected(true)} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                Simular Conexão
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default WhatsAppManager;
