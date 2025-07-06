
-- Table des profils utilisateurs avec rôles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Table des catégories de tutoriels
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des tutoriels
CREATE TABLE public.tutorials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  video_url TEXT,
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  is_published BOOLEAN DEFAULT false,
  difficulty_level TEXT DEFAULT 'Débutant' CHECK (difficulty_level IN ('Débutant', 'Intermédiaire', 'Avancé')),
  duration_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table de progression des utilisateurs
CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  tutorial_id UUID REFERENCES public.tutorials(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, tutorial_id)
);

-- Insertion des catégories par défaut
INSERT INTO public.categories (name, description, color) VALUES 
('Design UX/UI', 'Conception d''interfaces utilisateur et expérience utilisateur', '#8B5CF6'),
('Identité Visuelle', 'Création de logos, chartes graphiques et identités de marque', '#EF4444'),
('Print', 'Design pour l''impression : flyers, brochures, affiches', '#10B981'),
('Digital', 'Design numérique : bannières web, réseaux sociaux, newsletters', '#F59E0B');

-- Insertion de tutoriels d'exemple
INSERT INTO public.tutorials (title, description, content, category_id, is_published, difficulty_level, duration_minutes, video_url, image_url) 
SELECT 
  'Les bases du design UX/UI',
  'Apprenez les fondamentaux du design d''interface utilisateur',
  'Dans ce tutoriel, nous explorerons les principes fondamentaux du design UX/UI. Nous commencerons par comprendre la différence entre UX (expérience utilisateur) et UI (interface utilisateur).

## Introduction au Design UX/UI

Le design UX/UI est au cœur de toute création numérique réussie. Il s''agit de créer des interfaces qui sont à la fois belles et fonctionnelles.

### Qu''est-ce que l''UX Design ?

L''UX Design (User Experience) se concentre sur l''expérience globale de l''utilisateur. Il s''agit de comprendre :
- Les besoins des utilisateurs
- Leurs comportements
- Leurs frustrations
- Leurs objectifs

### Qu''est-ce que l''UI Design ?

L''UI Design (User Interface) se concentre sur l''apparence visuelle :
- Les couleurs
- La typographie
- Les boutons
- Les icônes
- La mise en page

## Les étapes clés

1. **Recherche utilisateur** : Comprendre votre audience cible
2. **Wireframing** : Créer des maquettes fonctionnelles
3. **Prototypage** : Tester les interactions
4. **Design visuel** : Appliquer l''identité graphique
5. **Tests utilisateurs** : Valider vos choix

Ce tutoriel vous donnera les bases pour commencer votre parcours en design UX/UI.',
  c.id,
  true,
  'Débutant',
  45,
  'https://www.youtube.com/watch?v=example1',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800'
FROM public.categories c WHERE c.name = 'Design UX/UI'

UNION ALL

SELECT 
  'Créer une identité visuelle complète',
  'Guide complet pour développer une identité de marque forte',
  'L''identité visuelle est l''âme de votre marque. Dans ce tutoriel approfondi, nous verrons comment créer une identité cohérente et mémorable.

## Les composants d''une identité visuelle

### 1. Le logo
Le logo est la pierre angulaire de votre identité. Il doit être :
- Simple et mémorable
- Adaptable à tous les supports
- Intemporel
- Représentatif de vos valeurs

### 2. La palette de couleurs
Les couleurs véhiculent des émotions :
- **Rouge** : passion, énergie, urgence
- **Bleu** : confiance, professionnalisme, sérénité
- **Vert** : nature, croissance, harmonie
- **Violet** : créativité, luxe, mystère

### 3. La typographie
Le choix des polices influence la perception :
- Polices serif : tradition, élégance
- Polices sans-serif : modernité, simplicité
- Polices script : créativité, personnalité

## Processus de création

1. **Brief créatif** : Définir les objectifs et contraintes
2. **Recherche** : Analyser la concurrence et les tendances
3. **Concepts** : Proposer plusieurs directions créatives
4. **Développement** : Affiner le concept choisi
5. **Déclinaisons** : Créer tous les supports nécessaires

### Outils recommandés
- Adobe Illustrator pour les logos vectoriels
- Adobe Photoshop pour les retouches
- Figma pour les maquettes digitales

Une identité réussie raconte une histoire et crée un lien émotionnel avec votre audience.',
  c.id,
  true,
  'Intermédiaire',
  60,
  'https://www.youtube.com/watch?v=example2',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800'
FROM public.categories c WHERE c.name = 'Identité Visuelle'

UNION ALL

SELECT 
  'Design print : Créer une affiche percutante',
  'Techniques et astuces pour concevoir des supports print efficaces',
  'Le design print a ses propres règles et contraintes. Dans ce tutoriel, nous apprendrons à créer une affiche qui marque les esprits.

## Spécificités du design print

### Résolution et formats
- **300 DPI minimum** pour l''impression
- **Fonds perdus** de 3mm minimum
- **Format CMJN** pour les couleurs
- **Papier et finitions** à considérer dès le début

### Hiérarchie visuelle
Une affiche efficace guide l''œil :
1. **Titre principal** : accroche immédiate
2. **Visuel fort** : image ou illustration marquante
3. **Informations essentielles** : date, lieu, contact
4. **Détails** : informations complémentaires

## Techniques de composition

### La règle des tiers
Diviser votre affiche en 9 zones égales pour placer les éléments importants aux intersections.

### Contraste et lisibilité
- Assurer un contraste suffisant texte/fond
- Tester la lisibilité à distance
- Éviter les polices trop petites

### Couleurs et psychologie
- **Rouge** : urgence, promotion
- **Bleu** : confiance, événement corporate
- **Jaune** : attention, optimisme
- **Noir** : élégance, sophistication

## Étapes de création

1. **Définir l''objectif** : que doit communiquer l''affiche ?
2. **Rassembler les éléments** : textes, images, logos
3. **Esquisser** : plusieurs propositions sur papier
4. **Maquetter** : version numérique détaillée
5. **Valider** : tests d''impression et corrections

### Points de vigilance
- Vérifier l''orthographe et les informations
- Tester sur différents supports
- Prévoir les déclinaisons (formats, langues)

Le design print demande rigueur et anticipation, mais offre une satisfaction unique quand votre création prend vie sur papier.',
  c.id,
  true,
  'Intermédiaire',
  75,
  NULL,
  'https://images.unsplash.com/photo-1634292781867-f971673f3493?w=800'
FROM public.categories c WHERE c.name = 'Print'

UNION ALL

SELECT 
  'Optimiser ses visuels pour les réseaux sociaux',
  'Créer des contenus visuels adaptés à chaque plateforme sociale',
  'Chaque réseau social a ses codes et ses formats. Apprenez à créer des visuels optimisés pour maximiser votre impact.

## Formats par plateforme

### Instagram
- **Post carré** : 1080x1080px
- **Stories** : 1080x1920px (9:16)
- **Reels** : 1080x1920px
- **IGTV** : 1080x1920px (portrait) ou 1920x1080px (paysage)

### Facebook
- **Post** : 1200x630px
- **Couverture** : 820x312px
- **Stories** : 1080x1920px
- **Événement** : 1920x1080px

### LinkedIn
- **Post** : 1200x1200px (carré) ou 1200x627px (paysage)
- **Bannière** : 1584x396px
- **Article** : 1200x627px

### Twitter/X
- **Post** : 1200x675px (16:9)
- **Bannière** : 1500x500px

## Principes de design pour les réseaux

### Lisibilité mobile
80% de la consommation se fait sur mobile :
- **Textes suffisamment gros** (minimum 24px)
- **Contrastes élevés**
- **Éléments bien espacés**

### Cohérence visuelle
- **Palette de couleurs** constante
- **Typographies** harmonieuses
- **Style graphique** reconnaissable
- **Logo** toujours visible

### Optimisation pour l''engagement
- **Visuels accrocheurs** dans les premières secondes
- **Call-to-action** clairs
- **Émotions** positives ou surprenantes
- **Tendances** du moment intégrées avec parcimonie

## Outils et ressources

### Outils de création
- **Canva** : templates et facilité d''usage
- **Adobe Creative Suite** : pour les pros
- **Figma** : collaboration en équipe
- **Unsplash/Pexels** : banques d''images gratuites

### Conseils pratiques
1. **Planifier** : calendrier éditorial visuel
2. **Tester** : A/B testing sur les formats
3. **Analyser** : métriques de performance
4. **Adapter** : selon les retours et évolutions

Le digital évolue vite, restez curieux et adaptez-vous aux nouvelles tendances tout en gardant votre identité visuelle forte.',
  c.id,
  true,
  'Débutant',
  40,
  'https://www.youtube.com/watch?v=example4',
  'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800'
FROM public.categories c WHERE c.name = 'Digital';

-- Activation des politiques RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil automatiquement
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fonction pour obtenir le rôle de l'utilisateur actuel
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Policies pour les profils
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.get_user_role() = 'admin');

-- Policies pour les tutoriels
CREATE POLICY "Anyone can view published tutorials" ON public.tutorials FOR SELECT USING (is_published = true);
CREATE POLICY "Authenticated users can view all tutorials" ON public.tutorials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can manage tutorials" ON public.tutorials FOR ALL USING (public.get_user_role() = 'admin');

-- Policies pour la progression utilisateur
CREATE POLICY "Users can view own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON public.user_progress FOR INSERT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all progress" ON public.user_progress FOR SELECT USING (public.get_user_role() = 'admin');

-- Policies pour les catégories
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.get_user_role() = 'admin');
