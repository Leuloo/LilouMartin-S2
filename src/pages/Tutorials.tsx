
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tutorial, Category } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorials();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterTutorials();
  }, [tutorials, searchTerm, selectedCategory, selectedDifficulty]);

  const fetchTutorials = async () => {
    const { data, error } = await (supabase as any)
      .from('tutorials')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tutorials:', error);
    } else {
      setTutorials(data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await (supabase as any)
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
  };

  const filterTutorials = () => {
    let filtered = tutorials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category_id === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.difficulty_level === selectedDifficulty);
    }

    setFilteredTutorials(filtered);
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tutoriels de Graphisme
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explorez notre collection de tutoriels soigneusement conçus pour vous accompagner 
          dans votre apprentissage du design graphique, de l'identité visuelle au design numérique.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Rechercher un tutoriel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200 focus:border-purple-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-5 h-5 text-gray-500" />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-lg bg-white focus:border-purple-400 focus:outline-none"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-purple-200 rounded-lg bg-white focus:border-purple-400 focus:outline-none"
            >
              <option value="all">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucun tutoriel trouvé
          </h3>
          <p className="text-gray-500">
            Essayez de modifier vos critères de recherche ou de filtrage.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105 group overflow-hidden">
              {tutorial.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={tutorial.image_url}
                    alt={tutorial.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    className={getDifficultyColor(tutorial.difficulty_level)}
                    variant="secondary"
                  >
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
                
                <CardTitle className="text-xl text-gray-800 group-hover:text-purple-700 transition-colors">
                  {tutorial.title}
                </CardTitle>
                
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tutorial.duration_minutes} min</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                  {tutorial.description}
                </CardDescription>
                
                <Link to={`/tutorial/${tutorial.id}`}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group-hover:shadow-lg transition-all">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir le tutoriel
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutorials;
