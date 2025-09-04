import { useState } from 'react';
import { Heart, Award, Calendar, Filter, Grid, List, Camera } from 'lucide-react';

interface ChallengePhoto {
  id: string;
  imageUrl: string;
  challengeTitle: string;
  challengeDescription: string;
  score: number;
  likes: number;
  date: string;
  category: string;
}

const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for past challenge photos
  const challengePhotos: ChallengePhoto[] = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      challengeTitle: 'Hora Dorada',
      challengeDescription: 'Captura la magia de la luz dorada durante el amanecer o atardecer',
      score: 95,
      likes: 24,
      date: '2024-01-15',
      category: 'Paisaje'
    },
    {
      id: '2',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      challengeTitle: 'Retrato Natural',
      challengeDescription: 'Fotografía un retrato usando solo luz natural',
      score: 88,
      likes: 18,
      date: '2024-01-12',
      category: 'Retrato'
    },
    {
      id: '3',
      imageUrl: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=400&fit=crop',
      challengeTitle: 'Macro Detalle',
      challengeDescription: 'Captura detalles extremos usando la función macro de tu teléfono',
      score: 92,
      likes: 31,
      date: '2024-01-10',
      category: 'Macro'
    },
    {
      id: '4',
      imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
      challengeTitle: 'Arquitectura Urbana',
      challengeDescription: 'Encuentra líneas y patrones interesantes en edificios urbanos',
      score: 85,
      likes: 15,
      date: '2024-01-08',
      category: 'Arquitectura'
    },
    {
      id: '5',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      challengeTitle: 'Naturaleza Salvaje',
      challengeDescription: 'Captura la belleza de la naturaleza en su estado más puro',
      score: 90,
      likes: 27,
      date: '2024-01-05',
      category: 'Naturaleza'
    },
    {
      id: '6',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
      challengeTitle: 'Sombras y Luces',
      challengeDescription: 'Juega con el contraste entre sombras y luces dramáticas',
      score: 87,
      likes: 22,
      date: '2024-01-03',
      category: 'Artístico'
    },
    {
      id: '7',
      imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop',
      challengeTitle: 'Vida Nocturna',
      challengeDescription: 'Captura la energía y las luces de la ciudad por la noche',
      score: 93,
      likes: 35,
      date: '2024-01-01',
      category: 'Nocturna'
    },
    {
      id: '8',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e732a1e?w=400&h=400&fit=crop',
      challengeTitle: 'Minimalismo',
      challengeDescription: 'Crea una composición minimalista con elementos simples',
      score: 89,
      likes: 19,
      date: '2023-12-28',
      category: 'Minimalista'
    }
  ];

  const categories = ['all', ...Array.from(new Set(challengePhotos.map(photo => photo.category)))];

  const filteredPhotos = selectedCategory === 'all' 
    ? challengePhotos 
    : challengePhotos.filter(photo => photo.category === selectedCategory);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 pt-6 pb-20">
      <div className="px-6 max-w-6xl mx-auto">

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todas las categorías</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Photos Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.challengeTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${getScoreColor(photo.score)}`}>
                      {photo.score}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{photo.challengeTitle}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{photo.challengeDescription}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-red-500" />
                      <span className="font-medium">{photo.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(photo.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
                    <img
                      src={photo.imageUrl}
                      alt={photo.challengeTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{photo.challengeTitle}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ml-3 flex-shrink-0 ${getScoreColor(photo.score)}`}>
                        <Award size={14} className="inline mr-1" />
                        {photo.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">{photo.challengeDescription}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Heart size={16} className="text-red-500" />
                          <span className="font-medium">{photo.likes} likes</span>
                        </div>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-300 mb-6">
              <Camera size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">No hay fotos en esta categoría</h3>
            <p className="text-gray-600 text-lg">Completa más retos para llenar tu galería</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;