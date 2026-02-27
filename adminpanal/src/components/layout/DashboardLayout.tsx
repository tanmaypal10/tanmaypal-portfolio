import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Menu, PanelsTopLeft, Image, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projects', label: 'Projects', icon: PanelsTopLeft },
  { to: '/gallery', label: 'Gallery', icon: Image },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
];

export const DashboardLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-900/60 bg-slate-950/80 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-20 items-center gap-2 border-b border-slate-900/70 px-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-blue-600 text-xl font-bold">
              TP
            </div>
            <div>
              <p className="text-sm text-slate-400">Admin Panel</p>
              <p className="text-lg font-semibold">Tanmay Portfolio</p>
            </div>
          </div>

          <nav className="mt-8 flex flex-col gap-1 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary/10 text-white shadow-inner shadow-primary/20'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex flex-1 flex-col lg:ml-64">
          <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-900/70 bg-slate-950/60 px-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 lg:hidden">
              <Button variant="ghost" onClick={() => setMobileOpen((prev) => !prev)}>
                <Menu className="h-5 w-5" />
              </Button>
              <span className="text-sm font-semibold tracking-wide text-slate-300">Menu</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="text-right text-sm">
                <p className="font-semibold text-white">{admin?.name || 'Admin'}</p>
                <p className="text-slate-400">{admin?.email}</p>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="text-slate-300 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
