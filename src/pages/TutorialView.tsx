
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tutorial, UserProgress } from '@/types/database';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, CheckCircle, Play, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

const TutorialView = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTutorial();
      if (user) {
        fetchProgress();
      }
    }
  }, [id, user]);

  const fetchTutorial = async () => {
    const { data, error } = await (supabase as any)
      .from('tutorials')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Error fetching tutorial:', error);
    } else {
      setTutorial(data);
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    if (!user || !id) return;

    const { data, error } = await (supabase as any)
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('tutorial_id', id)
      .single();

    if (!error && data) {
      setProgress(data);
    }
  };

  const updateProgress = async (progressPercentage: number, completed: boolean = false) => {
    if (!user || !id) return;

    const progressData = {
      user_id: user.id,
      tutorial_id: id,
      progress_percentage: progressPercentage,
      completed,
      ...(completed && { completed_at: new Date().toISOString() }),
      updated_at: new Date().toISOString()
    };

    if (progress) {
      const { error } = await (supabase as any)
        .from('user_progress')
        .update(progressData)
        .eq('id', progress.id);

      if (error) {
        console.error('Error updating progress:', error);
      } else {
        setProgress({ ...progress, ...progressData });
        if (completed) {
          toast({
            title: "Félicitations !",
            description: "Vous avez terminé ce tutoriel avec succès.",
          });
        }
      }
    } else {
      const { data, error } = await (supabase as any)
        .from('user_progress')
        .insert([progressData])
        .select()
        .single();

      if (error) {
        console.error('Error creating progress:', error);
      } else {
        setProgress(data);
      }
    }
  };

  const markAsCompleted = async () => {
    await updateProgress(100, true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!tutorial) {
    return <Navigate to="/tutorials" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/tutorials">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux tutoriels
          </Button>
        </Link>
      </div>

      {/* Tutorial Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-8">
          {tutorial.image_url && (
            <div className="lg:w-1/3">
              <img
                src={tutorial.image_url}
                alt={tutorial.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className={getDifficultyColor(tutorial.difficulty_level)} variant="secondary">
                {tutorial.difficulty_level}
              </Badge>
              {tutorial.category && (
                <Badge 
                  style={{ backgroundColor: tutorial.category.color + '20', color: tutorial.category.color }}
                  variant="outline"
                >
                  {tutorial.category.name}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {tutorial.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-6">
              {tutorial.description}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{tutorial.duration_minutes} minutes</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Tutoriel interactif</span>
              </div>
            </div>

            {/* Progress Section (only for authenticated users) */}
            {user && (
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-purple-800">Votre progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-700">
                        Progression : {progress?.progress_percentage || 0}%
                      </span>
                      {progress?.completed && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Terminé
                        </Badge>
                      )}
                    </div>
                    <Progress 
                      value={progress?.progress_percentage || 0} 
                      className="h-2"
                    />
                    {!progress?.completed && (
                      <Button
                        onClick={markAsCompleted}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Marquer comme terminé
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Video Section */}
      {tutorial.video_url && (
        <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-purple-600" />
              <span>Vidéo du tutoriel</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              {tutorial.video_url.includes('youtube.com') || tutorial.video_url.includes('youtu.be') ? (
                <iframe
                  src={tutorial.video_url.replace('watch?v=', 'embed/')}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={tutorial.title}
                />
              ) : (
                <video
                  src={tutorial.video_url}
                  controls
                  className="w-full h-full rounded-lg"
                  title={tutorial.title}
                >
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Section */}
      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle>Contenu du tutoriel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-purple max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-semibold text-purple-700 mb-4 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-purple-600 mb-3 mt-5">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed text-justify">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 ml-6 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 ml-6 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-purple-800">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-300 pl-4 italic text-purple-700 my-6">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {tutorial.content || 'Contenu du tutoriel en cours de rédaction...'}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      {user && !progress?.completed && (
        <div className="text-center py-8">
          <Button
            onClick={markAsCompleted}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-8 py-3"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            J'ai terminé ce tutoriel !
          </Button>
        </div>
      )}
    </div>
  );
};

export default TutorialView;
