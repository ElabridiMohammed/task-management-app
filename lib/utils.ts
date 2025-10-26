import { format, formatDistanceToNow, isAfter, isBefore, isToday, isTomorrow } from 'date-fns'
import { TaskPriority, TaskStatus } from '@/types/task'

export function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy')
}

export function formatDateTime(date: string): string {
  return format(new Date(date), 'MMM d, yyyy h:mm a')
}

export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false
  return isBefore(new Date(dueDate), new Date()) && !isToday(new Date(dueDate))
}

export function isDueSoon(dueDate: string | null): boolean {
  if (!dueDate) return false
  const date = new Date(dueDate)
  return (isToday(date) || isTomorrow(date)) && isAfter(date, new Date())
}

export function getPriorityColor(priority: TaskPriority): string {
  const colors = {
    low: 'bg-gray-100 text-gray-700 border-gray-300',
    medium: 'bg-blue-100 text-blue-700 border-blue-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    urgent: 'bg-red-100 text-red-700 border-red-300',
  }
  return colors[priority]
}

export function getStatusColor(status: TaskStatus): string {
  const colors = {
    todo: 'bg-gray-200',
    'in-progress': 'bg-blue-200',
    review: 'bg-yellow-200',
    done: 'bg-green-200',
  }
  return colors[status]
}

export function getStatusLabel(status: TaskStatus): string {
  const labels = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    review: 'Review',
    done: 'Done',
  }
  return labels[status]
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function generateAvatar(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`
}
