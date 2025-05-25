
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import WhatsAppManager from '@/components/WhatsAppManager';
import CRMKanban from '@/components/CRMKanban';
import AIConfig from '@/components/AIConfig';
import ProspectionManager from '@/components/ProspectionManager';
import Templates from '@/components/Templates';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'whatsapp':
        return <WhatsAppManager />;
      case 'crm':
        return <CRMKanban />;
      case 'ai-config':
        return <AIConfig />;
      case 'prospection':
        return <ProspectionManager />;
      case 'templates':
        return <Templates />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
