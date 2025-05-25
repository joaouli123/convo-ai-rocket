
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Calendar } from 'lucide-react';

const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Primeiro Contato',
      category: 'Prospecção',
      content: 'Olá {nome}, tudo bem? Meu nome é {atendente} e trabalho na {empresa}. Vi que você tem interesse em soluções de {produto}. Posso te ajudar?',
      variables: ['nome', 'atendente', 'empresa', 'produto'],
      used: 45,
      created: '2024-01-15',
    },
    {
      id: 2,
      name: 'Envio de Proposta',
      category: 'Vendas',
      content: 'Oi {nome}! Conforme conversamos, estou enviando nossa proposta personalizada. O investimento fica em {valor} com {prazo} de prazo. Quando podemos conversar?',
      variables: ['nome', 'valor', 'prazo'],
      used: 23,
      created: '2024-01-10',
    },
    {
      id: 3,
      name: 'Follow-up Pós-venda',
      category: 'Pós-venda',
      content: 'Oi {nome}! Como está sendo sua experiência com nosso {produto}? Estou aqui para qualquer dúvida. Sua satisfação é muito importante para nós! 😊',
      variables: ['nome', 'produto'],
      used: 12,
      created: '2024-01-08',
    },
  ]);

  const categories = ['Todos', 'Prospecção', 'Vendas', 'Pós-venda', 'Suporte'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredTemplates = selectedCategory === 'Todos' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates de Mensagens</h1>
          <p className="text-gray-600">Crie e gerencie mensagens prontas para seu atendimento</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Template
        </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-gradient-to-r from-blue-500 to-green-500" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <Badge className="bg-blue-100 text-blue-800 mt-1">{template.category}</Badge>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700">{template.content}</p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Variáveis disponíveis:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable) => (
                    <Badge key={variable} variant="outline" className="text-xs">
                      {`{${variable}}`}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(template.created).toLocaleDateString('pt-BR')}</span>
                </div>
                <span>{template.used} usos</span>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-green-500">
                  Usar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-0 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Criar Novo Template</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Template</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Boas-vindas para novos clientes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Prospecção</option>
                <option>Vendas</option>
                <option>Pós-venda</option>
                <option>Suporte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Variáveis</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: nome, empresa, produto (separadas por vírgula)"
              />
              <p className="text-xs text-gray-500 mt-1">Use {`{variavel}`} no texto para inserir valores dinâmicos</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo da Mensagem</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={8}
              placeholder="Escreva sua mensagem aqui... Use {nome}, {empresa} e outras variáveis para personalizar automaticamente."
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">0/500 caracteres</span>
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                Salvar Template
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Templates;
