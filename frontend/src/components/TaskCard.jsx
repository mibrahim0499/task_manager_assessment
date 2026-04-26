import React from 'react';
import { Trash2, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const TaskCard = ({ task, onUpdateStatus, onDelete }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'todo': return <Clock className="w-4 h-4 text-gray-400" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="task-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <button 
          onClick={() => onDelete(task.id)}
          className="delete-btn"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <select
          value={task.status}
          onChange={(e) => onUpdateStatus(task.id, e.target.value)}
          className="status-select"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;
