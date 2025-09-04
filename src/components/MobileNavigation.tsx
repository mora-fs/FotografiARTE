import { Camera, Users, User, Image } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'gallery', label: 'Galería', icon: Image, path: '/gallery' },
    { id: 'challenge', label: 'Reto', icon: Camera, path: '/challenge' },
    { id: 'community', label: 'Comunidad', icon: Users, path: '/community' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;