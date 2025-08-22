import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { WelcomeSection } from "@/components/WelcomeSection";
import { HeroCard } from "@/components/HeroCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <TopNav />
        
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <WelcomeSection />
          
          {/* Hero Card */}
          <HeroCard />
        </div>
      </div>
    </div>
  );
};

export default Index;
