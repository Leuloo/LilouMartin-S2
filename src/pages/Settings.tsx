
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Lock, Trash2, AlertTriangle, Settings as SettingsIcon } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword
    });

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Mot de passe modifié avec succès",
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }

    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'SUPPRIMER') {
      toast({
        title: "Erreur",
        description: "Veuillez taper 'SUPPRIMER' pour confirmer",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Supprimer les données utilisateur
      if (user) {
        await supabase.from('user_progress').delete().eq('user_id', user.id);
        await supabase.from('profiles').delete().eq('id', user.id);
      }

      // Supprimer le compte
      const { error } = await supabase.auth.admin.deleteUser(user?.id || '');
      
      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le compte",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Compte supprimé",
          description: "Votre compte a été supprimé avec succès",
        });
        signOut();
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Paramètres
            </span>
          </h1>
          <p className="text-gray-600">Gérez votre compte et vos préférences</p>
        </div>
      </div>

      {/* Account Information */}
      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-purple-600" />
            <span>Informations du compte</span>
          </CardTitle>
          <CardDescription>
            Vos informations personnelles sur GraphiLearn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profile?.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rôle</Label>
              <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700 capitalize">
                  {profile?.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Membre depuis</Label>
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700">
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'Non disponible'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <span>Changer le mot de passe</span>
          </CardTitle>
          <CardDescription>
            Modifiez votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {loading ? 'Modification...' : 'Changer le mot de passe'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="bg-white/70 backdrop-blur-sm border border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            <span>Zone de danger</span>
          </CardTitle>
          <CardDescription>
            Actions irréversibles concernant votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Attention :</strong> La suppression de votre compte est définitive. 
              Toutes vos données (progression, historique) seront perdues.
            </AlertDescription>
          </Alert>
          
          {!showDeleteConfirmation ? (
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer mon compte
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="space-y-2">
                <Label htmlFor="deleteConfirmation">
                  Pour confirmer, tapez <strong>SUPPRIMER</strong> ci-dessous :
                </Label>
                <Input
                  id="deleteConfirmation"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="SUPPRIMER"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={loading || deleteConfirmation !== 'SUPPRIMER'}
                >
                  {loading ? 'Suppression...' : 'Confirmer la suppression'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteConfirmation(false);
                    setDeleteConfirmation('');
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-sm text-gray-500">
        <p>
          Besoin d'aide ? Consultez notre{' '}
          <button className="text-purple-600 hover:underline">
            centre d'aide
          </button>{' '}
          ou contactez notre support.
        </p>
      </div>
    </div>
  );
};

export default Settings;
