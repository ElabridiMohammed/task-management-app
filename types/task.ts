export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string | null
  labels: string[]
  dueDate: string | null
  createdAt: string
  updatedAt: string
  projectId: string
  attachments: number
  comments: number
}

export interface Project {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  members: ProjectMember[]
  tasks: Task[]
}

export interface ProjectMember {
  id: string
  name: string
  avatar: string
  role: 'owner' | 'admin' | 'member'
}

export interface Activity {
  id: string
  type: 'task_created' | 'task_updated' | 'task_completed' | 'task_deleted' | 'comment_added'
  userId: string
  userName: string
  taskId: string
  taskTitle: string
  projectId: string
  timestamp: string
  details: string
}

export interface Analytics {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  todoTasks: number
  completionRate: number
  tasksByPriority: {
    low: number
    medium: number
    high: number
    urgent: number
  }
  tasksByStatus: {
    todo: number
    'in-progress': number
    review: number
    done: number
  }
  recentActivity: Activity[]
}
