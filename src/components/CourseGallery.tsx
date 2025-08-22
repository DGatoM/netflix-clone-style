import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";

const courseCategories = [
  {
    title: "Trilha recomendada para você",
    courses: [
      {
        id: 1,
        title: "ChatGPT para Negócios",
        description: "Aprenda a usar ChatGPT para aumentar sua produtividade",
        duration: "4h 30min",
        students: 1250,
        rating: 4.8,
        level: "Iniciante",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "IA Generativa Essencial",
        description: "Fundamentos da inteligência artificial generativa",
        duration: "6h 15min",
        students: 980,
        rating: 4.9,
        level: "Intermediário",
        image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "Prompt Engineering",
        description: "Técnicas avançadas para criar prompts eficazes",
        duration: "3h 45min",
        students: 750,
        rating: 4.7,
        level: "Avançado",
        image: "https://images.unsplash.com/photo-1675557009339-d3566de5c0e8?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "IA para Marketing",
        description: "Revolucione suas estratégias de marketing com IA",
        duration: "5h 20min",
        students: 1100,
        rating: 4.6,
        level: "Intermediário",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    title: "Automações",
    courses: [
      {
        id: 5,
        title: "Zapier + IA",
        description: "Automatize processos com Zapier e inteligência artificial",
        duration: "4h 10min",
        students: 620,
        rating: 4.5,
        level: "Intermediário",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        title: "RPA com IA",
        description: "Robotic Process Automation potencializado por IA",
        duration: "7h 30min",
        students: 450,
        rating: 4.8,
        level: "Avançado",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
      },
      {
        id: 7,
        title: "Make + OpenAI",
        description: "Integre Make com APIs de IA para automações poderosas",
        duration: "5h 45min",
        students: 380,
        rating: 4.7,
        level: "Intermediário",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    title: "Agentes de IA",
    courses: [
      {
        id: 8,
        title: "Criando Agentes Inteligentes",
        description: "Desenvolva agentes de IA autônomos e eficientes",
        duration: "8h 15min",
        students: 320,
        rating: 4.9,
        level: "Avançado",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      },
      {
        id: 9,
        title: "Multi-Agent Systems",
        description: "Sistemas complexos com múltiplos agentes de IA",
        duration: "10h 30min",
        students: 180,
        rating: 4.8,
        level: "Especialista",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
      },
      {
        id: 10,
        title: "Agentes Conversacionais",
        description: "Construa chatbots e assistentes virtuais avançados",
        duration: "6h 40min",
        students: 410,
        rating: 4.6,
        level: "Intermediário",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop"
      }
    ]
  }
];

const CourseCard = ({ course }: { course: any }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Iniciante": return "bg-green-500/20 text-green-400";
      case "Intermediário": return "bg-yellow-500/20 text-yellow-400";
      case "Avançado": return "bg-orange-500/20 text-orange-400";
      case "Especialista": return "bg-red-500/20 text-red-400";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-hover border-border/50 bg-card">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Badge className={`absolute top-3 left-3 ${getLevelColor(course.level)}`}>
          {course.level}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <h4 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h4>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const CourseGallery = () => {
  return (
    <div className="space-y-12">
      {courseCategories.map((category, index) => (
        <div key={index} className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            {category.title}
          </h2>
          
          <div className="relative">
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                slidesToScroll: 1,
              }}
            >
              <CarouselContent className="-ml-4">
                {category.courses.map((course) => (
                  <CarouselItem key={course.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <CourseCard course={course} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className="left-0 bg-background/80 hover:bg-background border-border hover:border-primary" />
              <CarouselNext className="right-0 bg-background/80 hover:bg-background border-border hover:border-primary" />
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
};