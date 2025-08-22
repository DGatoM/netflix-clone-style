import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import heroBannerImage from "@/assets/hero-banner.jpg";

const heroSlides = [
  {
    id: 1,
    title: "Bem-vindo(a) de volta à",
    brand: "CPDF",
    subtitle: "Retome suas aulas ou descubra novos cursos de IA para sua equipe.",
    primaryButton: "Explorar cursos",
    secondaryButton: "Continuar assistindo"
  },
  {
    id: 2,
    title: "Domine a",
    brand: "IA Generativa",
    subtitle: "Aprenda as tecnologias mais avançadas em inteligência artificial.",
    primaryButton: "Ver trilhas",
    secondaryButton: "Começar agora"
  },
  {
    id: 3,
    title: "Transforme seu",
    brand: "Negócio",
    subtitle: "Use IA para automatizar processos e aumentar a produtividade.",
    primaryButton: "Automações",
    secondaryButton: "Saiba mais"
  }
];

export const HeroBanner = () => {
  return (
    <div className="relative">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative overflow-hidden rounded-xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 group">
                {/* Background Image */}
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <img
                    src={heroBannerImage}
                    alt="Profissional trabalhando com IA - Banner hero"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/20"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center px-8 sm:px-12 lg:px-20 py-6 lg:py-8">
                    <div className="max-w-xl lg:max-w-2xl">
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-4">
                        {slide.title}{" "}
                        <span className="text-primary">{slide.brand}</span>
                      </h1>
                      
                      <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
                        {slide.subtitle}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                        <Button variant="explore" size="default" className="group text-sm lg:text-base">
                          <span>{slide.primaryButton}</span>
                        </Button>
                        
                        <Button variant="continue" size="default" className="group text-sm lg:text-base">
                          <span>{slide.secondaryButton}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-2 lg:left-4 bg-background/80 hover:bg-background border-border hover:border-primary opacity-50 hover:opacity-100 transition-opacity" />
        <CarouselNext className="right-2 lg:right-4 bg-background/80 hover:bg-background border-border hover:border-primary opacity-50 hover:opacity-100 transition-opacity" />
      </Carousel>
    </div>
  );
};