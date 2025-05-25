
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Settings } from 'lucide-react';

const AIConfig = () => {
  const [selectedPersonality, setSelectedPersonality] = useState('vendedor');

  const personalities = [
    {
      id: 'vendedor',
      name: 'Vendedor Consultivo',
      description: 'Focado em identificar necessidades e apresentar soluções',
      tone: 'Persuasivo e empático',
      example: 'Entendo sua necessidade. Baseado no que você me contou, acredito que nossa solução premium seria ideal...',
    },
    {
      id: 'suporte',
      name: 'Suporte Técnico',
      description: 'Especializado em resolver problemas e tirar dúvidas',
      tone: 'Técnico e prestativo',
      example: 'Vou ajudá-lo a resolver esse problema. Primeiro, preciso entender melhor o que está acontecendo...',
    },
    {
      id: 'consultor',
      name: 'Consultor Especialista',
      description: 'Oferece orientações profissionais e especializadas',
      tone: 'Formal e expertise',
      example: 'Com base na minha experiência no setor, recomendo que considere os seguintes pontos...',
    },
    {
      id: 'amigavel',
      name: 'Atendente Amigável',
      description: 'Caloroso e acolhedor, cria conexão emocional',
      tone: 'Descontraído e caloroso',
      example: 'Oi! Que bom ter você aqui! Estou super animado para te ajudar com o que precisar! 😊',
    },
  ];

  const niches = [
    { id: 'estetica', name: 'Estética e Beleza', active: false },
    { id: 'saude', name: 'Saúde e Bem-estar', active: false },
    { id: 'advocacia', name: 'Advocacia', active: false },
    { id: 'tecnologia', name: 'Tecnologia', active: true },
    { id: 'educacao', name: 'Educação', active: false },
    { id: 'imobiliario', name: 'Imobiliário', active: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuração da IA</h1>
        <p className="text-gray-600">Personalize o comportamento do seu agente inteligente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalidades Disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalities.map((personality) => (
                <div
                  key={personality.id}
                  onClick={() => setSelectedPersonality(personality.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPersonality === personality.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Bot className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-gray-900">{personality.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{personality.description}</p>
                  <Badge className="bg-blue-100 text-blue-800 mb-3">{personality.tone}</Badge>
                  <div className="text-xs text-gray-500 italic">
                    "{personality.example}"
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações do Produto/Serviço</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Produto/Serviço
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Descreva o que sua empresa oferece..."
                  defaultValue="Soluções tecnológicas personalizadas para empresas que buscam automatizar processos e aumentar a produtividade."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Público-Alvo
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Empresários, PMEs, Startups..."
                  defaultValue="Empresários e gestores de PMEs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principais Objeções
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Ex: Preço muito alto, Não temos tempo, Já temos uma solução..."
                  defaultValue="Preço, Complexidade de implementação, Tempo de adaptação"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gatilhos e Palavras-chave</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras para Qualificação
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: preço, orçamento, quanto custa..."
                  defaultValue="preço, orçamento, quanto custa, valor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras para Proposta
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: quero, preciso, interessado..."
                  defaultValue="quero, preciso, interessado, quando"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Modelos por Nicho</h3>
            <div className="space-y-3">
              {niches.map((niche) => (
                <div
                  key={niche.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">{niche.name}</span>
                  <Badge className={niche.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {niche.active ? 'Ativo' : 'Disponível'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Teste da IA</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Mensagem de teste:</p>
                <p className="text-sm">"Oi, gostaria de saber o preço dos seus serviços"</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Resposta da IA:</p>
                <p className="text-sm">
                  "Olá! Fico feliz com seu interesse. Para te dar um orçamento preciso, 
                  preciso entender melhor suas necessidades. Que tipo de solução você está buscando?"
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500">
                Testar Configuração
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">IA Ativa</h4>
                <p className="text-sm text-gray-600">Status do agente inteligente</p>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancelar</Button>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Settings className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default AIConfig;
