import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNav } from "@/components/TopNav";
import { HeroBanner } from "@/components/HeroBanner";
import { CourseGallery } from "@/components/CourseGallery";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          <TopNav />
          
          <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {/* Hero Banner Carousel */}
            <HeroBanner />
            
            {/* Course Gallery Netflix-style */}
            <CourseGallery />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
