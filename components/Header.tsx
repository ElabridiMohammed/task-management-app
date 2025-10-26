'use client'

import { useState } from 'react'
import { LayoutDashboard, KanbanSquare, Activity, Plus } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'
import AddTaskModal from './AddTaskModal'

interface HeaderProps {
  currentView: string
  onViewChange: (view: 'board' | 'dashboard' | 'activity') => void
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const currentProject = useTaskStore((state) => state.getCurrentProject())
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentProject?.name || 'TaskFlow'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {currentProject?.description}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Tabs */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('board')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentView === 'board'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <KanbanSquare className="w-4 h-4" />
              Board
            </button>
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('activity')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                currentView === 'activity'
                  ? 'bg-white shadow-sm text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              Activity
            </button>
          </div>

          <button 
            onClick={() => setIsAddTaskModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </div>

      <AddTaskModal 
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </header>
  )
}
