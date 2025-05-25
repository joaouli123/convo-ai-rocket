
import { Card } from '@/components/ui/card';
import { MessageSquare, Users, Bot, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Conversas Ativas',
      value: '24',
      change: '+12%',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Leads no Funil',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'IA Ativa',
      value: '18',
      change: '+25%',
      icon: Bot,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Vendas Hoje',
      value: 'R$ 4.200',
      change: '+15%',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do seu sistema de atendimento</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversas Recentes</h3>
          <div className="space-y-3">
            {[
              { name: 'Maria Silva', message: 'Gostaria de saber mais sobre o produto...', time: '2 min' },
              { name: 'João Santos', message: 'Quando vocês podem fazer a entrega?', time: '5 min' },
              { name: 'Ana Costa', message: 'Obrigada pelo atendimento!', time: '10 min' },
            ].map((conv, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-medium">
                  {conv.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{conv.name}</p>
                  <p className="text-sm text-gray-600 truncate">{conv.message}</p>
                </div>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funil de Vendas</h3>
          <div className="space-y-4">
            {[
              { stage: 'Novo Lead', count: 45, color: 'bg-blue-500' },
              { stage: 'Em Atendimento', count: 32, color: 'bg-yellow-500' },
              { stage: 'Proposta Enviada', count: 18, color: 'bg-orange-500' },
              { stage: 'Fechado', count: 12, color: 'bg-green-500' },
            ].map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{stage.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
