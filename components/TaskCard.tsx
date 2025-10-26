'use client'

import { Task } from '@/types/task'
import { Calendar, MessageSquare, Paperclip, User } from 'lucide-react'
import { getPriorityColor, formatDate, isOverdue, isDueSoon } from '@/lib/utils'

interface TaskCardProps {
  task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card bg-white rounded-lg p-4 border border-gray-200 shadow-sm cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
          {task.title}
        </h4>
        <span
          className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.map((label, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {task.assignee && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
            </div>
          )}
          {task.dueDate && (
            <div className={`flex items-center gap-1 ${
              isOverdue(task.dueDate) ? 'text-red-600' : 
              isDueSoon(task.dueDate) ? 'text-yellow-600' : ''
            }`}>
              <Calendar className="w-3 h-3" />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
