import React from 'react';
import { Filter } from 'lucide-react';

const Filters = ({ status, priority, onStatusChange, onPriorityChange }) => {
  return (
    <div className="filters-bar">
      <div className="flex items-center gap-2 text-gray-500 mr-4">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="filter-select"
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {(status || priority) && (
        <button
          onClick={() => {
            onStatusChange('');
            onPriorityChange('');
          }}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium ml-2"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filters;
