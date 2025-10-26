import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { Task, Project, Activity, TaskStatus, TaskPriority, Analytics } from '@/types/task'

interface TaskStore {
  projects: Project[]
  currentProjectId: string | null
  activities: Activity[]
  selectedTask: Task | null

  // Project actions
  addProject: (name: string, description: string, color: string) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (id: string) => void

  // Task actions
  addTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'projectId'>) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  moveTask: (taskId: string, newStatus: TaskStatus) => void
  setSelectedTask: (task: Task | null) => void

  // Activity actions
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void

  // Analytics
  getAnalytics: () => Analytics
  getCurrentProject: () => Project | null
  getTasksByStatus: (status: TaskStatus) => Task[]
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      activities: [],
      selectedTask: null,

      addProject: (name, description, color) => {
        const project: Project = {
          id: uuidv4(),
          name,
          description,
          color,
          createdAt: new Date().toISOString(),
          members: [
            {
              id: '1',
              name: 'You',
              avatar: 'https://ui-avatars.com/api/?name=You&background=3b82f6&color=fff',
              role: 'owner',
            },
          ],
          tasks: [],
        }

        set((state) => ({
          projects: [...state.projects, project],
          currentProjectId: project.id,
        }))
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }))
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId:
            state.currentProjectId === id
              ? state.projects[0]?.id || null
              : state.currentProjectId,
        }))
      },

      setCurrentProject: (id) => {
        set({ currentProjectId: id })
      },

      addTask: (projectId, task) => {
        const newTask: Task = {
          ...task,
          id: uuidv4(),
          projectId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, tasks: [...p.tasks, newTask] }
              : p
          ),
        }))

        get().addActivity({
          type: 'task_created',
          userId: '1',
          userName: 'You',
          taskId: newTask.id,
          taskTitle: newTask.title,
          projectId,
          details: `Created task "${newTask.title}"`,
        })
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) => ({
            ...p,
            tasks: p.tasks.map((t) =>
              t.id === taskId
                ? { ...t, ...updates, updatedAt: new Date().toISOString() }
                : t
            ),
          })),
        }))

        const task = get().projects
          .flatMap((p) => p.tasks)
          .find((t) => t.id === taskId)

        if (task) {
          get().addActivity({
            type: 'task_updated',
            userId: '1',
            userName: 'You',
            taskId,
            taskTitle: task.title,
            projectId: task.projectId,
            details: `Updated task "${task.title}"`,
          })
        }
      },

      deleteTask: (taskId) => {
        const task = get().projects
          .flatMap((p) => p.tasks)
          .find((t) => t.id === taskId)

        set((state) => ({
          projects: state.projects.map((p) => ({
            ...p,
            tasks: p.tasks.filter((t) => t.id !== taskId),
          })),
        }))

        if (task) {
          get().addActivity({
            type: 'task_deleted',
            userId: '1',
            userName: 'You',
            taskId,
            taskTitle: task.title,
            projectId: task.projectId,
            details: `Deleted task "${task.title}"`,
          })
        }
      },

      moveTask: (taskId, newStatus) => {
        get().updateTask(taskId, { status: newStatus })
      },

      setSelectedTask: (task) => {
        set({ selectedTask: task })
      },

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
        }

        set((state) => ({
          activities: [newActivity, ...state.activities].slice(0, 50),
        }))
      },

      getAnalytics: () => {
        const { projects, currentProjectId, activities } = get()
        const currentProject = projects.find((p) => p.id === currentProjectId)
        const tasks = currentProject?.tasks || []

        const totalTasks = tasks.length
        const completedTasks = tasks.filter((t) => t.status === 'done').length
        const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length
        const todoTasks = tasks.filter((t) => t.status === 'todo').length

        const tasksByPriority = {
          low: tasks.filter((t) => t.priority === 'low').length,
          medium: tasks.filter((t) => t.priority === 'medium').length,
          high: tasks.filter((t) => t.priority === 'high').length,
          urgent: tasks.filter((t) => t.priority === 'urgent').length,
        }

        const tasksByStatus = {
          todo: todoTasks,
          'in-progress': inProgressTasks,
          review: tasks.filter((t) => t.status === 'review').length,
          done: completedTasks,
        }

        return {
          totalTasks,
          completedTasks,
          inProgressTasks,
          todoTasks,
          completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
          tasksByPriority,
          tasksByStatus,
          recentActivity: activities.slice(0, 10),
        }
      },

      getCurrentProject: () => {
        const { projects, currentProjectId } = get()
        return projects.find((p) => p.id === currentProjectId) || null
      },

      getTasksByStatus: (status) => {
        const project = get().getCurrentProject()
        return project?.tasks.filter((t) => t.status === status) || []
      },
    }),
    {
      name: 'task-storage',
    }
  )
)
