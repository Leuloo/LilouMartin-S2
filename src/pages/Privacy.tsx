
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, Cookie, Mail, Lock } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Politique de Confidentialité
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          Colorlab respecte votre vie privée et protège vos données personnelles
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-purple-600" />
            <span>Introduction</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-purple max-w-none">
          <p className="text-gray-700 leading-relaxed">
            Colorlab est une plateforme éducative dédiée à l'apprentissage du design graphique. 
            Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons 
            vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Important :</strong> Colorlab est un projet pédagogique sans objectifs commerciaux. 
            Nous ne vendons pas vos données et ne les utilisons que dans le cadre éducatif.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-purple-600" />
            <span>Données collectées</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Données d'inscription</h3>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• Adresse email (obligatoire pour la création de compte)</li>
                <li>• Mot de passe (crypté et sécurisé)</li>
                <li>• Date d'inscription</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Données d'utilisation</h3>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• Progression dans les tutoriels</li>
                <li>• Tutoriels commencés et terminés</li>
                <li>• Temps passé sur la plateforme</li>
                <li>• Préférences d'apprentissage</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Données techniques</h3>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• Adresse IP (anonymisée)</li>
                <li>• Type de navigateur et version</li>
                <li>• Pages visitées et durée des sessions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-purple-600" />
            <span>Utilisation des données</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700"><strong>Nous utilisons vos données pour :</strong></p>
            <ul className="text-gray-700 space-y-2 ml-4">
              <li>• Créer et gérer votre compte utilisateur</li>
              <li>• Suivre votre progression pédagogique</li>
              <li>• Personnaliser votre expérience d'apprentissage</li>
              <li>• Améliorer nos contenus et services</li>
              <li>• Assurer la sécurité de la plateforme</li>
              <li>• Respecter nos obligations légales</li>
            </ul>
            <p className="text-gray-700 font-medium">
              <strong>Nous ne vendons jamais vos données à des tiers.</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cookie className="w-5 h-5 text-purple-600" />
            <span>Cookies et technologies similaires</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Nous utilisons des cookies essentiels pour le fonctionnement de la plateforme :
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800">Cookies essentiels</h4>
                <p className="text-gray-600 text-sm">
                  Nécessaires pour l'authentification et la navigation sur le site
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Cookies de performance</h4>
                <p className="text-gray-600 text-sm">
                  Nous aident à comprendre comment vous utilisez la plateforme pour l'améliorer
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-purple-600" />
            <span>Vos droits RGPD</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700 font-medium">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Droit d'accès</h4>
                <p className="text-gray-600 text-sm">
                  Consulter les données que nous détenons sur vous
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Droit de rectification</h4>
                <p className="text-gray-600 text-sm">
                  Corriger vos données inexactes ou incomplètes
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Droit à l'effacement</h4>
                <p className="text-gray-600 text-sm">
                  Supprimer vos données personnelles
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Droit à la portabilité</h4>
                <p className="text-gray-600 text-sm">
                  Récupérer vos données dans un format structuré
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm">
              Pour exercer ces droits, rendez-vous dans vos paramètres de compte ou contactez-nous.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur-sm border border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-purple-600" />
            <span>Contact</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700">
              Pour toute question concernant cette politique de confidentialité ou vos données :
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">Délégué à la Protection des Données</p>
              <p className="text-gray-600">Email : privacy@colorlab.fr</p>
              <p className="text-gray-600">Adresse : Colorlab - Protection des données</p>
            </div>
            <p className="text-gray-700 text-sm">
              Nous nous engageons à répondre à vos demandes dans un délai de 30 jours maximum.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-500 border-t border-purple-100 pt-8">
        <p>
          Cette politique de confidentialité peut être mise à jour périodiquement. 
          Les modifications importantes vous seront notifiées par email.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
