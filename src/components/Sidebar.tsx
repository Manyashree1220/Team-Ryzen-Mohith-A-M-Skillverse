import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Briefcase, 
  User, 
  Settings, 
  BarChart3, 
  FileText,
  Users,
  Building,
  LogOut,
  GraduationCap,
  Shield
} from 'lucide-react'
import { useSidebar } from '../contexts/SidebarContext'
import { useAuth } from '../contexts/AuthContext'

const recruiterLinks = [
  { icon: Briefcase, label: 'Dashboard', path: '/recruiter/dashboard' },
  { icon: Users, label: 'Candidates', path: '/recruiter/candidates' },
  { icon: Building, label: 'Job Postings', path: '/recruiter/jobs' },
  { icon: BarChart3, label: 'Analytics', path: '/recruiter/analytics' },
  { icon: Settings, label: 'Settings', path: '/recruiter/settings' },
]

const candidateLinks = [
  { icon: User, label: 'Dashboard', path: '/candidate/dashboard' },
  { icon: Briefcase, label: 'Jobs', path: '/candidate/jobs' },
  { icon: FileText, label: 'Profile', path: '/candidate/profile' },
  { icon: BarChart3, label: 'Progress', path: '/candidate/progress' },
  { icon: Settings, label: 'Settings', path: '/candidate/settings' },
]

const adminLinks = [
  { icon: BarChart3, label: 'Overview', path: '/admin' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Building, label: 'Companies', path: '/admin/companies' },
  { icon: Shield, label: 'Security', path: '/admin/security' },
  { icon: Settings, label: 'System', path: '/admin/system' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, closeSidebar } = useSidebar()
  const { user, logout } = useAuth()
  
  if (!user) return null
  
  const isRecruiter = user.role === 'recruiter'
  const isCandidate = user.role === 'student'
  const isAdmin = user.role === 'admin'
  
  const links = isRecruiter ? recruiterLinks : isCandidate ? candidateLinks : adminLinks

  const handleLogout = () => {
    logout()
    navigate('/')
    closeSidebar()
  }

  const getRoleIcon = () => {
    switch (user.role) {
      case 'student':
        return <GraduationCap className="h-5 w-5 text-blue-500" />
      case 'recruiter':
        return <Briefcase className="h-5 w-5 text-purple-500" />
      case 'admin':
        return <Shield className="h-5 w-5 text-green-500" />
      default:
        return <User className="h-5 w-5 text-gray-500" />
    }
  }

  const getRoleLabel = () => {
    switch (user.role) {
      case 'student':
        return 'Candidate'
      case 'recruiter':
        return 'Recruiter'
      case 'admin':
        return 'Administrator'
      default:
        return user.role
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 glass-effect border-r border-gray-200/50 dark:border-gray-700/50
        transform transition-transform duration-300 z-50 pt-16
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full overflow-y-auto px-4 py-6">
          {/* User Profile */}
          <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  {getRoleIcon()}
                  <span>{getRoleLabel()}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
              {user.email}
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-8">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-4">
              Navigation
            </h3>
            <nav className="space-y-2">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = location.pathname === link.path || 
                               (link.path !== '/' && location.pathname.startsWith(link.path))
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeSidebar}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <Link
              to="/"
              onClick={closeSidebar}
              className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-colors mb-2"
            >
              <Home size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}