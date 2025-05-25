
import { Home, MessageSquare, Users, Bot, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'crm', label: 'CRM Kanban', icon: Users },
    { id: 'ai-config', label: 'Config. IA', icon: Bot },
    { id: 'prospection', label: 'Prospecção', icon: Search },
    { id: 'templates', label: 'Templates', icon: FileText },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">CRM WhatsApp IA</h1>
        <p className="text-sm text-gray-600">Sistema Completo</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
