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
        level: "Iniciante"
      },
      {
        id: 2,
        title: "IA Generativa Essencial",
        description: "Fundamentos da inteligência artificial generativa",
        duration: "6h 15min",
        students: 980,
        rating: 4.9,
        level: "Intermediário"
      },
      {
        id: 3,
        title: "Prompt Engineering",
        description: "Técnicas avançadas para criar prompts eficazes",
        duration: "3h 45min",
        students: 750,
        rating: 4.7,
        level: "Avançado"
      },
      {
        id: 4,
        title: "IA para Marketing",
        description: "Revolucione suas estratégias de marketing com IA",
        duration: "5h 20min",
        students: 1100,
        rating: 4.6,
        level: "Intermediário"
      },
      {
        id: 11,
        title: "Claude e Gemini Avançado",
        description: "Domine os assistentes de IA mais poderosos do mercado",
        duration: "3h 20min",
        students: 850,
        rating: 4.8,
        level: "Intermediário"
      },
      {
        id: 12,
        title: "IA para Análise de Dados",
        description: "Use inteligência artificial para extrair insights valiosos dos seus dados",
        duration: "7h 10min",
        students: 620,
        rating: 4.7,
        level: "Avançado"
      },
      {
        id: 13,
        title: "Midjourney e DALL-E",
        description: "Criação de imagens profissionais com IA generativa",
        duration: "4h 40min",
        students: 1350,
        rating: 4.9,
        level: "Iniciante"
      },
      {
        id: 14,
        title: "IA Conversacional",
        description: "Desenvolva assistentes virtuais inteligentes e eficazes",
        duration: "5h 55min",
        students: 540,
        rating: 4.6,
        level: "Intermediário"
      },
      {
        id: 15,
        title: "Automatização com IA",
        description: "Transforme processos manuais em fluxos automatizados inteligentes",
        duration: "6h 30min",
        students: 780,
        rating: 4.8,
        level: "Avançado"
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
        level: "Intermediário"
      },
      {
        id: 6,
        title: "RPA com IA",
        description: "Robotic Process Automation potencializado por IA",
        duration: "7h 30min",
        students: 450,
        rating: 4.8,
        level: "Avançado"
      },
      {
        id: 7,
        title: "Make + OpenAI",
        description: "Integre Make com APIs de IA para automações poderosas",
        duration: "5h 45min",
        students: 380,
        rating: 4.7,
        level: "Intermediário"
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
        level: "Avançado"
      },
      {
        id: 9,
        title: "Multi-Agent Systems",
        description: "Sistemas complexos com múltiplos agentes de IA",
        duration: "10h 30min",
        students: 180,
        rating: 4.8,
        level: "Especialista"
      },
      {
        id: 10,
        title: "Agentes Conversacionais",
        description: "Construa chatbots e assistentes virtuais avançados",
        duration: "6h 40min",
        students: 410,
        rating: 4.6,
        level: "Intermediário"
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
    <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-hover border-border/50 bg-card h-72 lg:h-80 flex flex-col relative">
      <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5 h-32 lg:h-48 flex items-center justify-center">
        <div className="text-primary/60 text-3xl lg:text-6xl font-bold">
          IA
        </div>
        <Badge className={`absolute top-3 left-3 ${getLevelColor(course.level)}`}>
          {course.level}
        </Badge>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h4 className="font-semibold text-base lg:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 h-10 lg:h-14 flex items-start">
            {course.title}
          </h4>
          
          <p className="text-xs lg:text-sm text-muted-foreground line-clamp-3 h-12 lg:h-16 flex items-start">
            {course.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
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
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-300 pointer-events-none"></div>
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
              <CarouselContent className="-ml-2 lg:-ml-4 py-4 px-2 lg:px-4">
                {category.courses.map((course) => (
                  <CarouselItem key={course.id} className="pl-2 lg:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <CourseCard course={course} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <CarouselPrevious className="left-0 lg:left-2 bg-background/80 hover:bg-background border-border hover:border-primary opacity-50 hover:opacity-100 transition-opacity" />
              <CarouselNext className="right-0 lg:right-2 bg-background/80 hover:bg-background border-border hover:border-primary opacity-50 hover:opacity-100 transition-opacity" />
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
};