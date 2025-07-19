
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Award, Palette, Eye, Printer, Monitor, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Palette,
      title: "Design UX/UI",
      description: "Maîtrisez les interfaces utilisateur et l'expérience utilisateur",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Crown,
      title: "Identité Visuelle",
      description: "Créez des identités de marque fortes et mémorables",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Printer,
      title: "Design Print",
      description: "Concevez pour l'impression avec style et efficacité",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Monitor,
      title: "Design Digital",
      description: "Optimisez vos créations pour le monde numérique",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const stats = [
    { icon: BookOpen, label: "Tutoriels", value: "50+" },
    { icon: Users, label: "Apprenants", value: "1000+" },
    { icon: Award, label: "Certificats", value: "500+" },
    { icon: Eye, label: "Projets créés", value: "2000+" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Apprenez le Graphisme
            </span>
            <br />
            <span className="text-gray-800">avec Excellence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Découvrez l'univers passionnant du design graphique à travers nos tutoriels interactifs. 
            De l'identité visuelle au design numérique, développez vos compétences créatives avec nos experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg">
                    Commencer gratuitement
                  </Button>
                </Link>
                <Link to="/tutorials">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-purple-300 text-purple-700 hover:bg-purple-50">
                    Explorer les tutoriels
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3 text-lg">
                    Mon Dashboard
                  </Button>
                </Link>
                <Link to="/tutorials">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-purple-300 text-purple-700 hover:bg-purple-50">
                    Voir les tutoriels
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Nos Domaines d'Expertise
          </h2>
          <p className="text-gray-600 text-lg">
            Explorez toutes les facettes du design graphique moderne
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Colorlab en Chiffres
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à développer votre créativité ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez notre communauté de créatifs passionnés et transformez vos idées en réalisations extraordinaires.
          </p>
          {!user ? (
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-white text-purple-700 hover:bg-gray-100">
                Rejoindre Colorlab
              </Button>
            </Link>
          ) : (
            <Link to="/tutorials">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-white text-purple-700 hover:bg-gray-100">
                Découvrir les tutoriels
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* RGPD Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50" id="rgpd-banner">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm mb-4 md:mb-0">
            Nous utilisons des cookies pour améliorer votre expérience d'apprentissage et analyser notre trafic.
          </p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-purple-300 hover:underline text-sm">
              Politique de confidentialité
            </Link>
            <Button
              size="sm"
              onClick={() => {
                document.getElementById('rgpd-banner')?.remove();
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Accepter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
