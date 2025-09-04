import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Camera, 
  Trophy, 
  Flame, 
  Star, 
  Award, 
  Target, 
  TrendingUp,
  Settings,
  Share2
} from 'lucide-react';

interface UserStats {
  level: number;
  points: number;
  streak: number;
  challengesCompleted: number;
  totalPhotos: number;
  communityLikes: number;
  rank: number;
  joinDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface SavedPhoto {
  likes?: number;
}

export default function Profile() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    points: 120,
    streak: 3,
    challengesCompleted: 8,
    totalPhotos: 8,
    communityLikes: 24,
    rank: 847,
    joinDate: '2024-01-15'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first_photo',
      title: 'Primera Captura',
      description: 'Completa tu primer reto fotográfico',
      icon: '📸',
      unlocked: true
    },
    {
      id: 'streak_3',
      title: 'Constancia',
      description: 'Mantén una racha de 3 días',
      icon: '🔥',
      unlocked: true
    },
    {
      id: 'streak_7',
      title: 'Dedicación',
      description: 'Mantén una racha de 7 días',
      icon: '⚡',
      unlocked: false,
      progress: 3,
      maxProgress: 7
    },
    {
      id: 'community_love',
      title: 'Favorito de la Comunidad',
      description: 'Recibe 50 likes en tus fotos',
      icon: '❤️',
      unlocked: false,
      progress: 24,
      maxProgress: 50
    },
    {
      id: 'technique_master',
      title: 'Maestro de Técnicas',
      description: 'Domina 5 técnicas diferentes',
      icon: '🎨',
      unlocked: false,
      progress: 2,
      maxProgress: 5
    },
    {
      id: 'level_5',
      title: 'Fotógrafo Experimentado',
      description: 'Alcanza el nivel 5',
      icon: '🌟',
      unlocked: false,
      progress: 1,
      maxProgress: 5
    }
  ]);

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = JSON.parse(localStorage.getItem('fotografiarte_progress') || '{}');
    const savedPhotos: SavedPhoto[] = JSON.parse(localStorage.getItem('fotografiarte_photos') || '[]');
    
    if (Object.keys(savedProgress).length > 0) {
      setUserStats(prev => ({
        ...prev,
        ...savedProgress,
        totalPhotos: savedPhotos.length,
        communityLikes: savedPhotos.reduce((sum: number, photo: SavedPhoto) => sum + (photo.likes || 0), 24)
      }));
    }
  }, []);

  const levelProgress = (userStats.points % 200) / 2; // Each level needs 200 points
  const nextLevelPoints = 200 - (userStats.points % 200);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto pt-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          <User className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Mi Perfil
        </h1>
        <p className="text-gray-600">
          Miembro desde {new Date(userStats.joinDate).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long' 
          })}
        </p>
      </div>

      {/* Level Card */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Nivel {userStats.level}</CardTitle>
              <p className="text-indigo-100">Fotógrafo Principiante</p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-orange-300 mb-1">
                <Flame className="w-5 h-5 mr-1" />
                <span className="font-bold">{userStats.streak}</span>
              </div>
              <p className="text-indigo-100 text-sm">días seguidos</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{userStats.points} puntos</span>
              <span>{nextLevelPoints} para subir nivel</span>
            </div>
            <Progress value={levelProgress} className="bg-indigo-400" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Camera className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.totalPhotos}</p>
            <p className="text-sm text-gray-600">Fotos Capturadas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.challengesCompleted}</p>
            <p className="text-sm text-gray-600">Retos Completados</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-pink-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.communityLikes}</p>
            <p className="text-sm text-gray-600">Likes Recibidos</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">#{userStats.rank}</p>
            <p className="text-sm text-gray-600">Ranking Global</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Logros ({unlockedAchievements.length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Unlocked Achievements */}
          {unlockedAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-2xl mr-3">{achievement.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-green-900">{achievement.title}</h4>
                <p className="text-sm text-green-700">{achievement.description}</p>
              </div>
              <Badge className="bg-green-100 text-green-800">
                Desbloqueado
              </Badge>
            </div>
          ))}
          
          {/* Locked Achievements with Progress */}
          {lockedAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-2xl mr-3 opacity-50">{achievement.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-700">{achievement.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                {achievement.progress !== undefined && achievement.maxProgress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                      <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => {/* Settings functionality */}}
        >
          <Settings className="w-4 h-4 mr-3" />
          Configuración
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => {/* Share profile functionality */}}
        >
          <Share2 className="w-4 h-4 mr-3" />
          Compartir Perfil
        </Button>
      </div>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-3" />
          <h3 className="font-bold mb-2">¡Sigue Creciendo!</h3>
          <p className="text-sm text-yellow-100 mb-4">
            Completa más retos para desbloquear nuevos logros y subir de nivel
          </p>
          <Button 
            onClick={() => window.location.href = '/challenge'}
            className="bg-white text-orange-600 hover:bg-gray-100"
          >
            Ir al Reto Diario
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}