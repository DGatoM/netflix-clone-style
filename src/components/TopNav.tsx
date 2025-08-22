export const TopNav = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todos
        </button>
        
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-muted"></div>
          <div className="w-8 h-8 rounded-full bg-muted/60"></div>
        </div>
      </div>
    </div>
  );
};