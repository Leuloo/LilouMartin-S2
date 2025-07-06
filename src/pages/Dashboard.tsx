
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tutorial, UserProgress } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Clock, TrendingUp, Award, Eye } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [recentTutorials, setRecentTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    completed: 0,
    inProgress: 0,
    totalMinutes: 0,
    averageProgress: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    // Fetch user progress
    const { data: progressData } = await supabase
      .from('user_progress')
      .select(`
        *,
        tutorial:tutorials(*)
      `)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (progressData) {
      setUserProgress(progressData);
      
      // Calculate stats
      const completed = progressData.filter(p => p.completed).length;
      const inProgress = progressData.filter(p => !p.completed && p.progress_percentage > 0).length;
      const totalMinutes = progressData
        .filter(p => p.completed)
        .reduce((acc, p) => acc + (p.tutorial?.duration_minutes || 0), 0);
      const averageProgress = progressData.length > 0 
        ? Math.round(progressData.reduce((acc, p) => acc + p.progress_percentage, 0) / progressData.length)
        : 0;

      setStats({ completed, inProgress, totalMinutes, averageProgress });
    }

    // Fetch recent tutorials
    const { data: tutorialsData } = await supabase
      .from('tutorials')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (tutorialsData) {
      setRecentTutorials(tutorialsData);
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mon Dashboard
            </span>
          </h1>
          <p className="text-gray-600">Suivez votre progression en design graphique</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Terminés</CardTitle>
            <CheckCircle className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs opacity-90">tutoriels complétés</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">En cours</CardTitle>
            <TrendingUp className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs opacity-90">tutoriels démarrés</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Temps d'étude</CardTitle>
            <Clock className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMinutes}</div>
            <p className="text-xs opacity-90">minutes d'apprentissage</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Progression</CardTitle>
            <Award className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs opacity-90">moyenne générale</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      {userProgress.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Vos Tutoriels</span>
            </CardTitle>
            <CardDescription>
              Suivez votre progression sur chaque tutoriel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProgress.map((progress) => (
                <div key={progress.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-purple-100">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">
                        {progress.tutorial?.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        {progress.tutorial && (
                          <Badge className={getDifficultyColor(progress.tutorial.difficulty_level)} variant="secondary">
                            {progress.tutorial.difficulty_level}
                          </Badge>
                        )}
                        {progress.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Terminé
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={progress.progress_percentage} className="h-2 mb-2" />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{progress.progress_percentage}% complété</span>
                      <span>{progress.tutorial?.duration_minutes} min</span>
                    </div>
                  </div>
                  <Link to={`/tutorial/${progress.tutorial_id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Voir
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Tutorials */}
      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Tutoriels Récents</span>
          </CardTitle>
          <CardDescription>
            Découvrez les derniers tutoriels ajoutés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentTutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-white rounded-lg border border-purple-100 p-4 hover:shadow-md transition-shadow">
                {tutorial.image_url && (
                  <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                    <img
                      src={tutorial.image_url}
                      alt={tutorial.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
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
                  <h4 className="font-medium text-gray-800 line-clamp-2">
                    {tutorial.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <Link to={`/tutorial/${tutorial.id}`}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Eye className="w-4 h-4 mr-1" />
                      Commencer
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {userProgress.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
          <CardContent className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Commencez votre apprentissage !
            </h3>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore commencé de tutoriels. Explorez notre catalogue pour débuter.
            </p>
            <Link to="/tutorials">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                Voir les tutoriels
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
