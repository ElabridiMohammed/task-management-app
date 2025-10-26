'use client'

import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import KanbanBoard from '@/components/KanbanBoard'
import Dashboard from '@/components/Dashboard'
import ActivityFeed from '@/components/ActivityFeed'

type View = 'board' | 'dashboard' | 'activity'

export default function Home() {
  const { projects, currentProjectId, addProject } = useTaskStore()
  const [currentView, setCurrentView] = useState<View>('board')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // Initialize with a default project if none exists
    if (projects.length === 0) {
      addProject(
        'My First Project',
        'Get started with your first project',
        '#3b82f6'
      )
    }
  }, [projects.length, addProject])

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col">
        <Header 
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {currentView === 'board' && <KanbanBoard />}
          {currentView === 'dashboard' && <Dashboard />}
          {currentView === 'activity' && <ActivityFeed />}
        </main>
      </div>
    </div>
  )
}
