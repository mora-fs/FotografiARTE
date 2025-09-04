import { useState } from 'react';
import { Camera, Upload, CheckCircle, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  points: number;
  tips: string[];
}

interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  overallComment: string;
}

export default function Challenge() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const todayChallenge: Challenge = {
    id: '1',
    title: 'Hora Dorada',
    description: 'Captura la magia de la luz dorada durante el amanecer o atardecer. Busca cómo la luz suave resalta texturas y crea atmósferas cálidas.',
    difficulty: 'Medio',
    points: 150,
    tips: [
      'Fotografía 1 hora antes del atardecer o después del amanecer',
      'Busca sujetos con texturas interesantes',
      'Experimenta con siluetas y contraluces',
      'Usa el modo manual para controlar la exposición'
    ]
  };

  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Simulate AI feedback
    const mockFeedback: Feedback = {
      score: 87,
      strengths: [
        'Excelente uso de la luz dorada',
        'Composición equilibrada con regla de tercios',
        'Buen contraste entre luces y sombras'
      ],
      improvements: [
        'Podrías experimentar con diferentes ángulos',
        'La saturación podría ser un poco más sutil'
      ],
      overallComment: 'Una captura hermosa que demuestra buen entendimiento de la fotografía en hora dorada. El uso de la luz natural es muy efectivo.'
    };

    setFeedback(mockFeedback);
    setIsSubmitted(true);
  };

  const resetChallenge = () => {
    setCapturedImage(null);
    setIsSubmitted(false);
    setFeedback(null);
  };

  if (isSubmitted && feedback) {
    return (
      <div className="p-4 space-y-6 max-w-md mx-auto pt-8">
        {/* Success Header */}
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Reto Completado!
          </h1>
          <p className="text-gray-600">
            Has ganado {todayChallenge.points} puntos
          </p>
        </div>

        {/* Final Score */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-8 h-8 mr-2" />
              <span className="text-3xl font-bold">{feedback.score}</span>
              <span className="text-xl ml-1">/100</span>
            </div>
            <p className="text-blue-100">Puntaje Final</p>
          </CardContent>
        </Card>

        {/* Captured Image */}
        {capturedImage && (
          <Card>
            <CardContent className="p-4">
              <img
                src={capturedImage}
                alt="Foto capturada"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">Tu Captura</h3>
              <p className="text-sm text-gray-600">{todayChallenge.title}</p>
            </CardContent>
          </Card>
        )}

        {/* AI Feedback */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Retroalimentación IA
            </h3>
            
            <div>
              <h4 className="font-medium text-green-700 mb-2">Fortalezas:</h4>
              <ul className="space-y-1">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-blue-700 mb-2">Áreas de mejora:</h4>
              <ul className="space-y-1">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t">
              <p className="text-sm text-gray-700 italic">
                "{feedback.overallComment}"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          onClick={resetChallenge}
          className="w-full"
          size="lg"
        >
          Nuevo Reto
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto pt-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant={todayChallenge.difficulty === 'Fácil' ? 'secondary' : 
                       todayChallenge.difficulty === 'Medio' ? 'default' : 'destructive'}>
          {todayChallenge.difficulty} • {todayChallenge.points} puntos
        </Badge>
      </div>

      {/* Challenge Card */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {todayChallenge.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {todayChallenge.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Consejos:</h3>
            <ul className="space-y-2">
              {todayChallenge.tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Camera Section */}
      {!capturedImage ? (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <Camera className="w-16 h-16 text-gray-400 mx-auto" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Captura tu foto
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Toma una foto que cumpla con el reto de hoy
              </p>
              <label htmlFor="camera-input">
                <Button asChild size="lg" className="cursor-pointer">
                  <span>
                    <Camera className="w-5 h-5 mr-2" />
                    Abrir Cámara
                  </span>
                </Button>
              </label>
              <input
                id="camera-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-4">
            <img
              src={capturedImage}
              alt="Foto capturada"
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit}
                className="flex-1"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Enviar Foto
              </Button>
              <Button 
                onClick={() => setCapturedImage(null)}
                variant="outline"
                size="lg"
              >
                Cambiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}