'use client'

import { Folder, Plus, X } from 'lucide-react'
import { useTaskStore } from '@/store/taskStore'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { projects, currentProjectId, setCurrentProject } = useTaskStore()

  if (!isOpen) return null

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">TaskFlow</h2>
          <button onClick={onToggle} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">Projects</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setCurrentProject(project.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentProjectId === project.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <span className="text-sm font-medium truncate">{project.name}</span>
              <span className="ml-auto text-xs text-gray-500">
                {project.tasks.length}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
