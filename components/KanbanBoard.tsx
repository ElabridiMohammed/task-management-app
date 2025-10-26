'use client'

import { useTaskStore } from '@/store/taskStore'
import TaskColumn from './TaskColumn'

export default function KanbanBoard() {
  const currentProject = useTaskStore((state) => state.getCurrentProject())
  
  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No project selected</p>
      </div>
    )
  }

  const columns: Array<{ id: string; title: string; status: any }> = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' },
    { id: 'review', title: 'Review', status: 'review' },
    { id: 'done', title: 'Done', status: 'done' },
  ]

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            title={column.title}
            status={column.status}
            tasks={currentProject.tasks.filter((t) => t.status === column.status)}
          />
        ))}
      </div>
    </div>
  )
}
