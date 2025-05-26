
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Smartphone, Users } from 'lucide-react';
import WhatsAppConnections from './WhatsAppConnections';
import WhatsAppConversations from './WhatsAppConversations';
import AttendantManager from './AttendantManager';

const WhatsAppTabs = () => {
  return (
    <div className="space-y-6">
      {/* Header com logo no canto superior esquerdo */}
      <div className="bg-white border-b border-gray-200 p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">LOGO</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WhatsApp Manager</h1>
              <p className="text-sm text-gray-600">Gerencie múltiplas conexões e conversas do WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections" className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>Conexões</span>
          </TabsTrigger>
          <TabsTrigger value="conversations" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Conversas</span>
          </TabsTrigger>
          <TabsTrigger value="attendants" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Atendentes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <WhatsAppConnections />
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <WhatsAppConversations />
        </TabsContent>

        <TabsContent value="attendants" className="space-y-4">
          <AttendantManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppTabs;
