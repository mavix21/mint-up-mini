const OrganizerSection = () => {
  const organizers = [
    { name: "dev3pack", logo: "D3" },
    { name: "Solene", logo: "SO" },
    { name: "EigenCloud", logo: "EC" },
    { name: "Base", logo: "BA" },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-foreground text-lg font-bold">Hosted By</h2>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {organizers.map((organizer, index) => (
          <div key={index} className="group flex items-center space-y-2">
            <div className="from-primary/20 border-primary/30 text-primary flex h-10 w-10 items-center justify-center rounded-full border bg-gradient-to-br to-purple-600/20 text-sm font-bold transition-transform group-hover:scale-105">
              {organizer.logo}
            </div>
            <span className="text-foreground ml-3 text-sm font-medium">
              {organizer.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrganizerSection;
