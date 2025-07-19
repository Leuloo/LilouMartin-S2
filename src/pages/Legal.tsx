
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Building, User, Globe, BookOpen, Shield } from 'lucide-react';

const Legal = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Mentions Légales
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Informations légales et conditions d'utilisation de Colorlab
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-purple-600" />
            <span>Identification du site</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Nom du site</h3>
              <p className="text-gray-700">Colorlab</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Nature du site</h3>
              <p className="text-gray-700">Plateforme d'apprentissage en ligne</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Domaine d'activité</h3>
              <p className="text-gray-700">Formation en design graphique</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Statut</h3>
              <p className="text-gray-700">Projet pédagogique</p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-purple-800 font-medium flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Important : Travail pédagogique sans objectifs commerciaux
            </p>
            <p className="text-purple-700 text-sm mt-1">
              Cette plateforme est développée dans un cadre éducatif et ne poursuit aucun but lucratif.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-purple-600" />
            <span>Responsable de la publication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Directeur de publication</h3>
              <p className="text-gray-700">Équipe pédagogique Colorlab</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
              <p className="text-gray-700">contact@colorlab.edu</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Responsabilité éditoriale</h3>
              <p className="text-gray-700">Contenus pédagogiques validés</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Modération</h3>
              <p className="text-gray-700">Équipe administrative</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <span>Hébergement</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Hébergeur web</h3>
              <p className="text-gray-700">Supabase Inc.</p>
              <p className="text-gray-600 text-sm">Services cloud et base de données</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Plateforme de déploiement</h3>
              <p className="text-gray-700">Lovable</p>
              <p className="text-gray-600 text-sm">Environnement de développement</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Localisation des serveurs</h3>
              <p className="text-gray-700">Union Européenne</p>
              <p className="text-gray-600 text-sm">Conformité RGPD</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Sécurité</h3>
              <p className="text-gray-700">Chiffrement SSL/TLS</p>
              <p className="text-gray-600 text-sm">Protection des données</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Propriété intellectuelle</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Contenus pédagogiques</h3>
              <p className="text-gray-700 text-sm">
                Les tutoriels, textes, images et vidéos présents sur GraphiLearn sont créés à des fins pédagogiques. 
                Leur utilisation est autorisée dans un cadre éducatif non commercial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Marques et logos</h3>
              <p className="text-gray-700 text-sm">
                Le nom "Colorlab" et le logo associé sont utilisés exclusivement dans le cadre de ce projet pédagogique.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Ressources externes</h3>
              <p className="text-gray-700 text-sm">
                Les images d'illustration proviennent de banques libres de droits (Unsplash, Pexels) 
                ou sont créées spécifiquement pour ce projet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Licence d'utilisation</h3>
              <p className="text-gray-700 text-sm">
                Le code source et les contenus sont disponibles sous licence éducative. 
                Toute utilisation commerciale est interdite.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scale className="w-5 h-5 text-purple-600" />
            <span>Conditions d'utilisation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Accès au service</h3>
              <p className="text-gray-700 text-sm">
                L'accès à Colorlab est gratuit et réservé à un usage pédagogique. 
                L'inscription nécessite une adresse email valide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Utilisation responsable</h3>
              <ul className="text-gray-700 text-sm space-y-1 ml-4">
                <li>• Respecter les autres utilisateurs</li>
                <li>• Ne pas partager ses identifiants de connexion</li>
                <li>• Signaler tout dysfonctionnement</li>
                <li>• Utiliser la plateforme conformément à sa vocation pédagogique</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Limitation de responsabilité</h3>
              <p className="text-gray-700 text-sm">
                Colorlab étant un projet pédagogique, nous nous efforçons de maintenir un service de qualité 
                mais ne pouvons garantir une disponibilité continue du service.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Modification des conditions</h3>
              <p className="text-gray-700 text-sm">
                Ces conditions peuvent être modifiées pour améliorer le service. 
                Les utilisateurs en seront informés par email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle>Contact et réclamations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700">
              Pour toute question juridique ou réclamation concernant le site :
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">Équipe Colorlab</p>
              <p className="text-gray-600">Email : legal@colorlab.edu</p>
              <p className="text-gray-600">Objet : [LEGAL] suivi de votre demande</p>
            </div>
            <p className="text-gray-700 text-sm">
              Nous nous engageons à traiter vos demandes dans les meilleurs délais.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500 border-t border-purple-100 pt-8">
        <p>
          Ces mentions légales sont conformes à la législation française et européenne en vigueur.
          <br />
          Elles peuvent être mises à jour pour refléter les évolutions du projet ou de la réglementation.
        </p>
      </div>
    </div>
  );
};

export default Legal;
