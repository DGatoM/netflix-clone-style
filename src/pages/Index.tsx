import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { HeroBanner } from "@/components/HeroBanner";
import { CourseGallery } from "@/components/CourseGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <TopNav />
        
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Banner Carousel */}
          <HeroBanner />
          
          {/* Course Gallery Netflix-style */}
          <CourseGallery />
        </div>
      </div>
    </div>
  );
};

export default Index;
