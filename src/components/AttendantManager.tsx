
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Plus, Trash2, Edit, Users, Building } from 'lucide-react';

interface Attendant {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  isActive: boolean;
  connectionIds: number[];
}

interface Department {
  id: number;
  name: string;
  color: string;
  description: string;
}

const AttendantManager = () => {
  const [attendants, setAttendants] = useState<Attendant[]>([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria@empresa.com',
      departmentId: 1,
      isActive: true,
      connectionIds: [1, 2]
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao@empresa.com',
      departmentId: 2,
      isActive: true,
      connectionIds: [1]
    }
  ]);

  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'Vendas', color: 'bg-blue-100 text-blue-800', description: 'Equipe de vendas e novos clientes' },
    { id: 2, name: 'Suporte', color: 'bg-green-100 text-green-800', description: 'Atendimento e suporte técnico' },
    { id: 3, name: 'Financeiro', color: 'bg-yellow-100 text-yellow-800', description: 'Cobrança e questões financeiras' }
  ]);

  const [showAttendantModal, setShowAttendantModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [editingAttendant, setEditingAttendant] = useState<Attendant | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  
  const [newAttendant, setNewAttendant] = useState({
    name: '',
    email: '',
    departmentId: 0
  });

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    color: 'bg-blue-100 text-blue-800',
    description: ''
  });

  const getDepartmentById = (id: number) => {
    return departments.find(dept => dept.id === id);
  };

  const addAttendant = () => {
    if (newAttendant.name && newAttendant.email && newAttendant.departmentId) {
      const attendant: Attendant = {
        id: Date.now(),
        name: newAttendant.name,
        email: newAttendant.email,
        departmentId: newAttendant.departmentId,
        isActive: true,
        connectionIds: []
      };
      
      setAttendants([...attendants, attendant]);
      setNewAttendant({ name: '', email: '', departmentId: 0 });
      setShowAttendantModal(false);
    }
  };

  const addDepartment = () => {
    if (newDepartment.name) {
      const department: Department = {
        id: Date.now(),
        name: newDepartment.name,
        color: newDepartment.color,
        description: newDepartment.description
      };
      
      setDepartments([...departments, department]);
      setNewDepartment({ name: '', color: 'bg-blue-100 text-blue-800', description: '' });
      setShowDepartmentModal(false);
    }
  };

  const removeAttendant = (id: number) => {
    setAttendants(attendants.filter(att => att.id !== id));
  };

  const removeDepartment = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  const toggleAttendantStatus = (id: number) => {
    setAttendants(attendants.map(att => 
      att.id === id ? { ...att, isActive: !att.isActive } : att
    ));
  };

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-800', label: 'Azul' },
    { value: 'bg-green-100 text-green-800', label: 'Verde' },
    { value: 'bg-yellow-100 text-yellow-800', label: 'Amarelo' },
    { value: 'bg-red-100 text-red-800', label: 'Vermelho' },
    { value: 'bg-purple-100 text-purple-800', label: 'Roxo' },
    { value: 'bg-pink-100 text-pink-800', label: 'Rosa' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 rounded-lg shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Gerenciamento de Atendentes e Departamentos</h1>
        <p className="text-sm text-gray-600">Configure os atendentes e departamentos para suas conexões</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seção Departamentos */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Departamentos</h3>
                <p className="text-sm text-gray-600">{departments.length} departamentos</p>
              </div>
            </div>
            <Button onClick={() => setShowDepartmentModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Departamento
            </Button>
          </div>

          <div className="space-y-3">
            {departments.map((department) => (
              <div key={department.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className={department.color}>{department.name}</Badge>
                  <div>
                    <p className="text-sm font-medium">{department.name}</p>
                    <p className="text-xs text-gray-500">{department.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeDepartment(department.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Seção Atendentes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Atendentes</h3>
                <p className="text-sm text-gray-600">{attendants.length} atendentes</p>
              </div>
            </div>
            <Button onClick={() => setShowAttendantModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Atendente
            </Button>
          </div>

          <div className="space-y-3">
            {attendants.map((attendant) => {
              const department = getDepartmentById(attendant.departmentId);
              return (
                <div key={attendant.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {attendant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">{attendant.name}</p>
                        <Badge className={attendant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {attendant.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{attendant.email}</p>
                      {department && (
                        <Badge className={department.color + " text-xs mt-1"}>
                          {department.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleAttendantStatus(attendant.id)}
                    >
                      {attendant.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAttendant(attendant.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Modal Novo Departamento */}
      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4">Novo Departamento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  placeholder="Ex: Vendas, Suporte..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                <Select 
                  value={newDepartment.color} 
                  onValueChange={(value) => setNewDepartment({...newDepartment, color: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <Badge className={option.value}>{option.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <Input
                  value={newDepartment.description}
                  onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                  placeholder="Descrição do departamento..."
                />
              </div>
              <div className="flex space-x-3">
                <Button onClick={addDepartment} className="flex-1">Criar</Button>
                <Button variant="outline" onClick={() => setShowDepartmentModal(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Modal Novo Atendente */}
      {showAttendantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96 p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4">Novo Atendente</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  value={newAttendant.name}
                  onChange={(e) => setNewAttendant({...newAttendant, name: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={newAttendant.email}
                  onChange={(e) => setNewAttendant({...newAttendant, email: e.target.value})}
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <Select 
                  value={newAttendant.departmentId.toString()} 
                  onValueChange={(value) => setNewAttendant({...newAttendant, departmentId: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        <Badge className={dept.color}>{dept.name}</Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-3">
                <Button onClick={addAttendant} className="flex-1">Criar</Button>
                <Button variant="outline" onClick={() => setShowAttendantModal(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AttendantManager;
