'use client'

import { Task } from '@/types/task'
import { Plus } from 'lucide-react'
import TaskCard from './TaskCard'

interface TaskColumnProps {
  title: string
  status: string
  tasks: Task[]
}

export default function TaskColumn({ title, status, tasks }: TaskColumnProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          {title}
          <span className="ml-2 text-sm text-gray-500">({tasks.length})</span>
        </h3>
        <button className="text-gray-400 hover:text-gray-600">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
