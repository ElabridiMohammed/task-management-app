# 📋 TaskFlow - Collaborative Project Management Tool

A powerful, Trello/Asana-style project management application built with Next.js, TypeScript, and Tailwind CSS. Manage tasks with drag-and-drop Kanban boards, track team productivity, and collaborate in real-time.


## ✨ Features

### 📊 Kanban Board
- Drag-and-drop task management
- Multiple status columns (To Do, In Progress, Review, Done)
- Real-time task updates
- Visual task organization
- Smooth animations and transitions

### 🎯 Task Management
- Create, edit, and delete tasks
- Task priorities (Low, Medium, High, Urgent)
- Due dates with overdue indicators
- Task labels and tags
- Assignee management
- Comments and attachments tracking

### 🗂️ Multiple Projects
- Create unlimited projects
- Project-specific workspaces
- Color-coded project identification
- Quick project switching
- Project descriptions and settings

### 📈 Analytics Dashboard
- Task completion rate
- Tasks by status breakdown
- Tasks by priority distribution
- Interactive charts (Bar, Pie)
- Real-time statistics
- Team productivity metrics

### 📢 Activity Feed
- Real-time activity tracking
- Task creation/update notifications
- User action history
- Timeline view
- Activity filtering

### 🎨 Modern UI/UX
- Clean, professional interface
- Responsive design (mobile, tablet, desktop)
- Smooth animations
- Intuitive navigation
- Accessibility features

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Drag & Drop:** @dnd-kit
- **State Management:** Zustand
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Date Handling:** date-fns

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel


1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Deploy to Netlify

1. Build: `npm run build`
2. Deploy the `.next` folder

## 📁 Project Structure

```
task-management-app/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── Header.tsx            # Top navigation
│   ├── Sidebar.tsx           # Project sidebar
│   ├── KanbanBoard.tsx       # Kanban board view
│   ├── TaskColumn.tsx        # Kanban column
│   ├── TaskCard.tsx          # Individual task card
│   ├── Dashboard.tsx         # Analytics dashboard
│   └── ActivityFeed.tsx      # Activity timeline
├── store/
│   └── taskStore.ts          # Zustand store
├── lib/
│   └── utils.ts              # Utility functions
├── types/
│   └── task.ts               # TypeScript types
└── public/                   # Static assets
```

## 🎯 Key Features Implementation

### Drag and Drop
- Built with @dnd-kit for smooth dragging
- Cross-column task movement
- Optimistic UI updates
- Touch-friendly for mobile

### State Management
- Zustand for lightweight state
- Persistent storage with localStorage
- Optimistic updates
- Real-time synchronization

### Analytics
- Real-time calculation of metrics
- Interactive data visualizations
- Completion rate tracking
- Priority distribution analysis

### Performance
- Next.js Server Components
- Code splitting
- Lazy loading
- Optimized re-renders

## 💡 Usage

### Creating a Project
1. Click the "+" button in the sidebar
2. Enter project name and description
3. Choose a project color
4. Click "Create"

### Managing Tasks
1. Click "New Task" in the header
2. Fill in task details:
   - Title (required)
   - Description
   - Priority level
   - Due date
   - Labels
   - Assignee
3. Drag tasks between columns to update status

### Viewing Analytics
1. Click "Dashboard" in the header
2. View task statistics
3. Analyze completion rates
4. Check priority distributions

### Activity Tracking
1. Click "Activity" in the header
2. View recent actions
3. Track team progress
4. Monitor task updates

## 📸 Screenshots



## 🔧 Configuration

### Customization
Edit `tailwind.config.ts` to customize:
- Colors
- Fonts
- Spacing
- Animations

### Features
Toggle features in `store/taskStore.ts`:
- Activity tracking
- Analytics
- Notifications

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the framework
- [@dnd-kit](https://dndkit.com/) for drag and drop
- [Recharts](https://recharts.org/) for charts
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- Trello and Asana for design inspiration

## 🔮 Future Enhancements

- [ ] Real-time collaboration with WebSockets
- [ ] File attachments
- [ ] Comments system
- [ ] User authentication
- [ ] Team management
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Export to CSV/PDF
- [ ] Dark mode
- [ ] Keyboard shortcuts

---

**Built with ❤️ for productive teams**
