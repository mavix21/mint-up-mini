const TrustedBySection = () => {
  const communities = [
    {
      name: "Bitcoin Club",
      color: "from-orange-400 to-yellow-400",
      initials: "BC",
    },
    {
      name: "CryptoCurious",
      color: "from-green-400 to-emerald-400",
      initials: "CC",
    },
    {
      name: "Andino DAO",
      color: "from-purple-400 to-pink-400",
      initials: "AD",
    },
    { name: "Web3 Lima", color: "from-blue-400 to-cyan-400", initials: "WL" },
  ];

  return (
    <section className="container mx-auto px-8 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-foreground mb-4 text-3xl font-bold">
          Communities already building with us
        </h2>
      </div>

      <div className="flex items-center justify-center space-x-8 md:space-x-12">
        {communities.map((community, index) => (
          <div key={index} className="group cursor-pointer text-center">
            <div
              className={`h-16 w-16 bg-gradient-to-br md:h-20 md:w-20 ${community.color} mb-3 flex transform items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110`}
            >
              <span className="text-lg font-bold text-white md:text-xl">
                {community.initials}
              </span>
            </div>
            <p className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors md:text-base">
              {community.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedBySection;
