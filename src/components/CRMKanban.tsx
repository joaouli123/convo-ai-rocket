
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Plus } from 'lucide-react';

const CRMKanban = () => {
  const [leads, setLeads] = useState({
    'novo-lead': [
      { id: 1, name: 'Carlos Mendes', value: 'R$ 1.200', source: 'Google', phone: '(11) 99999-0001' },
      { id: 2, name: 'Patricia Lima', value: 'R$ 850', source: 'Instagram', phone: '(11) 99999-0002' },
    ],
    'em-atendimento': [
      { id: 3, name: 'Roberto Silva', value: 'R$ 2.100', source: 'Indicação', phone: '(11) 99999-0003' },
      { id: 4, name: 'Fernanda Costa', value: 'R$ 950', source: 'WhatsApp', phone: '(11) 99999-0004' },
    ],
    'proposta-enviada': [
      { id: 5, name: 'Lucas Santos', value: 'R$ 3.200', source: 'Site', phone: '(11) 99999-0005' },
    ],
    'fechado': [
      { id: 6, name: 'Marina Oliveira', value: 'R$ 1.800', source: 'Google', phone: '(11) 99999-0006' },
    ],
    'perdido': [
      { id: 7, name: 'André Pereira', value: 'R$ 750', source: 'Instagram', phone: '(11) 99999-0007' },
    ],
  });

  const columns = [
    { id: 'novo-lead', title: 'Novo Lead', color: 'bg-blue-500', count: leads['novo-lead'].length },
    { id: 'em-atendimento', title: 'Em Atendimento', color: 'bg-yellow-500', count: leads['em-atendimento'].length },
    { id: 'proposta-enviada', title: 'Proposta Enviada', color: 'bg-orange-500', count: leads['proposta-enviada'].length },
    { id: 'fechado', title: 'Fechado', color: 'bg-green-500', count: leads['fechado'].length },
    { id: 'perdido', title: 'Perdido', color: 'bg-red-500', count: leads['perdido'].length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM Kanban</h1>
          <p className="text-gray-600">Gerencie seus leads visualmente</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Novo Lead
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-h-[600px]">
        {columns.map((column) => (
          <Card key={column.id} className="p-4 border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
              </div>
              <Badge variant="secondary">{column.count}</Badge>
            </div>

            <div className="space-y-3">
              {leads[column.id].map((lead) => (
                <Card key={lead.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">{lead.name}</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">{lead.value}</div>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          lead.source === 'Google'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.source === 'Instagram'
                            ? 'bg-pink-100 text-pink-800'
                            : lead.source === 'Indicação'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {lead.source}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600">{lead.phone}</div>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-3 border-dashed">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-0 shadow-lg">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total de Leads</p>
              <p className="text-xl font-bold text-gray-900">
                {Object.values(leads).flat().length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-0 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">%</div>
            <div>
              <p className="text-sm text-gray-600">Taxa de Conversão</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round((leads['fechado'].length / Object.values(leads).flat().length) * 100)}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-0 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">R$</div>
            <div>
              <p className="text-sm text-gray-600">Valor Total</p>
              <p className="text-xl font-bold text-gray-900">R$ 12.850</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CRMKanban;
