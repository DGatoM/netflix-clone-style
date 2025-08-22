import { Button } from "@/components/ui/button";

export const WelcomeSection = () => {
  return (
    <div className="bg-gradient-hero border border-border rounded-xl p-8 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Bem-vindo(a) de volta à{" "}
          <span className="text-primary">CPDF</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Retome suas aulas ou descubra novos cursos de IA para sua equipe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="explore" size="lg" className="group">
            <span>Explorar cursos</span>
          </Button>
          
          <Button variant="continue" size="lg" className="group">
            <span>Continuar assistindo</span>
          </Button>
        </div>
      </div>
    </div>
  );
};