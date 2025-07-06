
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tutorial, Category } from '@/types/database';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    video_url: '',
    image_url: '',
    category_id: '',
    difficulty_level: 'Débutant' as 'Débutant' | 'Intermédiaire' | 'Avancé',
    duration_minutes: 30,
    is_published: false
  });

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    // Fetch tutorials
    const { data: tutorialsData } = await supabase
      .from('tutorials')
      .select(`
        *,
        category:categories(*)
      `)
      .order('created_at', { ascending: false });

    if (tutorialsData) {
      setTutorials(tutorialsData);
    }

    // Fetch categories
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesData) {
      setCategories(categoriesData);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      video_url: '',
      image_url: '',
      category_id: '',
      difficulty_level: 'Débutant',
      duration_minutes: 30,
      is_published: false
    });
    setEditingTutorial(null);
  };

  const handleEdit = (tutorial: Tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title,
      description: tutorial.description || '',
      content: tutorial.content || '',
      video_url: tutorial.video_url || '',
      image_url: tutorial.image_url || '',
      category_id: tutorial.category_id,
      difficulty_level: tutorial.difficulty_level,
      duration_minutes: tutorial.duration_minutes,
      is_published: tutorial.is_published
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTutorial) {
      // Update existing tutorial
      const { error } = await supabase
        .from('tutorials')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingTutorial.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de modifier le tutoriel",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Tutoriel modifié avec succès",
        });
      }
    } else {
      // Create new tutorial
      const { error } = await supabase
        .from('tutorials')
        .insert([formData]);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de créer le tutoriel",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Tutoriel créé avec succès",
        });
      }
    }

    setIsDialogOpen(false);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce tutoriel ?')) {
      const { error } = await supabase
        .from('tutorials')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le tutoriel",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Succès",
          description: "Tutoriel supprimé avec succès",
        });
        fetchData();
      }
    }
  };

  const togglePublish = async (tutorial: Tutorial) => {
    const { error } = await supabase
      .from('tutorials')
      .update({ 
        is_published: !tutorial.is_published,
        updated_at: new Date().toISOString()
      })
      .eq('id', tutorial.id);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut de publication",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: `Tutoriel ${!tutorial.is_published ? 'publié' : 'dépublié'} avec succès`,
      });
      fetchData();
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
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

  const stats = {
    total: tutorials.length,
    published: tutorials.filter(t => t.is_published).length,
    draft: tutorials.filter(t => !t.is_published).length
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard Admin
            </span>
          </h1>
          <p className="text-gray-600">Gérez les tutoriels et le contenu de la plateforme</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau tutoriel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTutorial ? 'Modifier le tutoriel' : 'Créer un nouveau tutoriel'}
              </DialogTitle>
              <DialogDescription>
                Remplissez les informations du tutoriel de graphisme
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <select
                    id="category"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Niveau</Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty_level}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      difficulty_level: e.target.value as 'Débutant' | 'Intermédiaire' | 'Avancé'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) || 30 })}
                    min="1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">URL Vidéo (optionnel)</Label>
                <Input
                  id="video_url"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL Image (optionnel)</Label>
                <Input
                  id="image_url"
                  type="url"
                  placeholder="https://exemple.com/image.jpg"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu (Markdown)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  placeholder="Rédigez le contenu du tutoriel en Markdown..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                />
                <Label htmlFor="is_published">Publier immédiatement</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  {editingTutorial ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total</CardTitle>
            <BookOpen className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs opacity-90">tutoriels au total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Publiés</CardTitle>
            <TrendingUp className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs opacity-90">visibles par les utilisateurs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Brouillons</CardTitle>
            <Users className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draft}</div>
            <p className="text-xs opacity-90">en cours de rédaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Tutorials List */}
      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle>Gestion des Tutoriels</CardTitle>
          <CardDescription>
            Liste complète des tutoriels avec actions de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-100">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-800">{tutorial.title}</h4>
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
                    <Badge 
                      variant={tutorial.is_published ? "default" : "secondary"}
                      className={tutorial.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                    >
                      {tutorial.is_published ? "Publié" : "Brouillon"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Durée: {tutorial.duration_minutes} min • Créé le {new Date(tutorial.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to={`/tutorial/${tutorial.id}`}>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(tutorial)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={tutorial.is_published ? "secondary" : "default"}
                    onClick={() => togglePublish(tutorial)}
                  >
                    {tutorial.is_published ? "Dépublier" : "Publier"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDelete(tutorial.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
