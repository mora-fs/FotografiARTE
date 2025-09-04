import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Trophy, Flame, Users } from 'lucide-react';

interface CommunityPhoto {
  id: string;
  username: string;
  avatar: string;
  challengeTitle: string;
  technique: string;
  image: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timeAgo: string;
  level: number;
}

export default function Community() {
  const [photos, setPhotos] = useState<CommunityPhoto[]>([]);
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'top'>('trending');

  useEffect(() => {
    // Mock community data
    const mockPhotos: CommunityPhoto[] = [
      {
        id: '1',
        username: 'Ana_Fotógrafa',
        avatar: '👩‍🎨',
        challengeTitle: 'Luz Dorada',
        technique: 'Iluminación Natural',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZiZjAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkx1eiBEb3JhZGE8L3RleHQ+PC9zdmc+',
        likes: 42,
        comments: 8,
        isLiked: false,
        timeAgo: '2h',
        level: 5
      },
      {
        id: '2',
        username: 'Carlos_Urbano',
        avatar: '👨‍💼',
        challengeTitle: 'Sombras Dramáticas',
        technique: 'Contraste',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmZmO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZCkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U29tYnJhcyBEcmFtw6F0aWNhczwvdGV4dD48L3N2Zz4=',
        likes: 28,
        comments: 5,
        isLiked: true,
        timeAgo: '4h',
        level: 3
      },
      {
        id: '3',
        username: 'Maria_Natura',
        avatar: '🌿',
        challengeTitle: 'Macro Detalles',
        technique: 'Enfoque Selectivo',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjgwIiBmaWxsPSIjNGZiZjRmIiBvcGFjaXR5PSIwLjgiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjMmY4MDJmIi8+PHRleHQgeD0iNTAlIiB5PSI4NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TWFjcm8gRGV0YWxsZXM8L3RleHQ+PC9zdmc+',
        likes: 35,
        comments: 12,
        isLiked: false,
        timeAgo: '6h',
        level: 7
      }
    ];
    setPhotos(mockPhotos);
  }, []);

  const handleLike = (photoId: string) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { 
            ...photo, 
            isLiked: !photo.isLiked,
            likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1
          }
        : photo
    ));
  };

  const filteredPhotos = photos.filter(photo => {
    if (activeTab === 'top') return photo.likes >= 30;
    if (activeTab === 'recent') return true; // All photos are recent in mock data
    return true; // trending - all photos
  });

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto pt-8">

      {/* Community Stats */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6" />
              <div>
                <p className="font-semibold">1,247 Fotógrafos</p>
                <p className="text-purple-100 text-sm">Activos hoy</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">8,432</p>
              <p className="text-purple-100 text-sm">Fotos compartidas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'trending' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('trending')}
          className="flex-1"
        >
          <Flame className="w-4 h-4 mr-1" />
          Trending
        </Button>
        <Button
          variant={activeTab === 'recent' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('recent')}
          className="flex-1"
        >
          Recientes
        </Button>
        <Button
          variant={activeTab === 'top' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('top')}
          className="flex-1"
        >
          <Trophy className="w-4 h-4 mr-1" />
          Top
        </Button>
      </div>

      {/* Photo Feed */}
      <div className="space-y-4">
        {filteredPhotos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            {/* User Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {photo.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{photo.username}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        Nivel {photo.level}
                      </Badge>
                      <span className="text-xs text-gray-500">{photo.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* Photo */}
            <div className="relative">
              <img 
                src={photo.image} 
                alt={photo.challengeTitle}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-black/70 text-white">
                  {photo.challengeTitle}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="outline" className="bg-white/90 text-xs">
                  {photo.technique}
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(photo.id)}
                    className="flex items-center space-x-1 transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${photo.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                    <span className="text-sm font-medium">{photo.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-600">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{photo.comments}</span>
                  </button>
                </div>
                
                <button className="text-gray-600">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Prompt */}
      <Card className="border-2 border-dashed border-indigo-300 bg-indigo-50">
        <CardContent className="p-6 text-center">
          <Trophy className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
          <h3 className="font-medium text-indigo-900 mb-2">
            ¡Comparte tu Arte!
          </h3>
          <p className="text-sm text-indigo-700 mb-4">
            Completa retos diarios y comparte tus mejores fotos con la comunidad
          </p>
          <Button 
            onClick={() => window.location.href = '/challenge'}
            className="bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Ir al Reto Diario
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}