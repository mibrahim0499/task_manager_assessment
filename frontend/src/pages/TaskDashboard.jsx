import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import { Layout, Search, Sparkles } from 'lucide-react';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(statusFilter, priorityFilter);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);

  const handleCreate = async (taskData) => {
    try {
      await createTask(taskData);
      fetchTasks();
    } catch (err) {
      alert('Error creating task');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert('Error deleting task');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layout className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        
        <div className="flex items-center gap-4">
           <Filters 
            status={statusFilter} 
            priority={priorityFilter} 
            onStatusChange={setStatusFilter} 
            onPriorityChange={setPriorityFilter} 
          />
        </div>
      </header>

      <main className="dashboard-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              <TaskForm onSubmit={handleCreate} />
              
              <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                  <Sparkles className="w-5 h-5" />
                  <h3 className="font-bold">Pro Tip</h3>
                </div>
                <p className="text-sm text-indigo-600 leading-relaxed">
                  Focus on high-priority tasks first to maximize your productivity today.
                </p>
              </div>
            </div>
          </aside>

          {/* List Section */}
          <section className="lg:col-span-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p>Loading your tasks...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 text-center">
                <p className="font-medium">{error}</p>
              </div>
            ) : tasks.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Search className="text-gray-400 w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No tasks found</h3>
                <p className="text-gray-500">Try adjusting your filters or create a new task to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={handleUpdateStatus} 
                    onDelete={handleDelete} 
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;
