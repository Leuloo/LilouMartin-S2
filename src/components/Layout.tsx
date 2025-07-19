
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, User, BookOpen, LayoutDashboard, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, signOut, isAdmin } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/', icon: BookOpen },
    { name: 'Tutoriels', href: '/tutorials', icon: BookOpen },
    ...(user ? [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Paramètres', href: '/settings', icon: Settings },
      ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: User }] : [])
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img
 src="/logo.svg"
   alt="Logo Colorlab"
  className="w-30 h-30 object-contain"
                />
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 hidden md:block">
                    {profile?.email}
                  </span>
                  {isAdmin && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      Admin
                    </span>
                  )}
                  <Button
                    onClick={signOut}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/auth">
                    <Button variant="outline" size="sm">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-purple-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 GraphiLearn - Plateforme d'apprentissage en graphisme</p>
            <p className="text-sm italic">Travail pédagogique sans objectifs commerciaux</p>
            <div className="mt-4 space-x-4">
              <Link to="/privacy" className="text-purple-600 hover:underline text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/legal" className="text-purple-600 hover:underline text-sm">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
