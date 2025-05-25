
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Upload, Play } from 'lucide-react';

const ProspectionManager = () => {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'TechCorp Soluções', phone: '(11) 98765-4321', site: 'techcorp.com.br', segment: 'Tecnologia', city: 'São Paulo' },
    { id: 2, name: 'InovaTech LTDA', phone: '(11) 97654-3210', site: 'inovatech.com', segment: 'Tecnologia', city: 'São Paulo' },
    { id: 3, name: 'Digital Solutions', phone: '(11) 96543-2109', site: 'digitalsol.com.br', segment: 'Marketing', city: 'São Paulo' },
  ]);

  const campaigns = [
    { id: 1, name: 'Campanha Tecnologia SP', sent: 150, delivered: 142, read: 89, replied: 23, status: 'active' },
    { id: 2, name: 'Prospecção Marketing', sent: 89, delivered: 85, read: 52, replied: 12, status: 'completed' },
    { id: 3, name: 'Leads Qualificados', sent: 45, delivered: 43, read: 28, replied: 8, status: 'paused' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Prospecção</h1>
        <p className="text-gray-600">Encontre e engaje novos leads automaticamente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Leads</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>São Paulo</option>
                  <option>Rio de Janeiro</option>
                  <option>Belo Horizonte</option>
                  <option>Porto Alegre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Segmento</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Tecnologia</option>
                  <option>Marketing</option>
                  <option>Saúde</option>
                  <option>Educação</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Palavras-chave</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: software, desenvolvimento, automação..."
                defaultValue="software, desenvolvimento"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Search className="w-4 h-4 mr-2" />
              Buscar Leads
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Importar Contatos</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">Arraste e solte seu arquivo CSV aqui</p>
              <p className="text-xs text-gray-500 mb-4">ou clique para selecionar</p>
              <Button variant="outline">Selecionar Arquivo</Button>
            </div>
            <div className="text-xs text-gray-500">
              <p>Formato esperado: Nome, Telefone, Empresa, Email</p>
              <p>Máximo: 1000 contatos por arquivo</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-0 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados da Busca</h3>
        <div className="space-y-3">
          {searchResults.map((result) => (
            <div key={result.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{result.name}</h4>
                    <p className="text-sm text-gray-600">{result.phone}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>{result.site}</p>
                    <p>{result.city}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">{result.segment}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Adicionar ao CRM</Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-green-500">
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Campanhas de Disparo</h3>
          <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Nova Campanha
          </Button>
        </div>
        
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <Badge className={
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {campaign.status === 'active' ? 'Ativa' : 
                     campaign.status === 'completed' ? 'Concluída' : 'Pausada'}
                  </Badge>
                </div>
                <Button variant="outline" size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  {campaign.status === 'paused' ? 'Retomar' : 'Pausar'}
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{campaign.sent}</p>
                  <p className="text-sm text-gray-600">Enviadas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{campaign.delivered}</p>
                  <p className="text-sm text-gray-600">Entregues</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{campaign.read}</p>
                  <p className="text-sm text-gray-600">Lidas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{campaign.replied}</p>
                  <p className="text-sm text-gray-600">Respondidas</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProspectionManager;
