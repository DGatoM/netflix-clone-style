import { Button } from "@/components/ui/button";
import heroImage from "@/assets/ia-negocios-hero.jpg";

export const HeroCard = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 group">
      {/* Background Image */}
      <div className="relative h-80 sm:h-96">
        <img
          src={heroImage}
          alt="IA para Negócios - Profissional trabalhando com inteligência artificial"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center p-8">
          <div className="max-w-md">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
              IA PARA
              <br />
              <span className="text-primary">NEGÓCIOS</span>
            </h2>
            
            {/* Optional description */}
            <p className="text-muted-foreground text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Transforme seu negócio com inteligência artificial
            </p>
          </div>
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
    </div>
  );
};