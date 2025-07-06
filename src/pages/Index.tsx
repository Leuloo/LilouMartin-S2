
import HeroSection from "@/components/HeroSection";
import BlogPosts from "@/components/BlogPosts";
import SocialLinks from "@/components/SocialLinks";
import CalendarEmbed from "@/components/CalendarEmbed";
import WorkHighlights from "@/components/WorkHighlights";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <BlogPosts />
      <WorkHighlights />
      <CalendarEmbed />
      <SocialLinks />
    </main>
  );
};

export default Index;
