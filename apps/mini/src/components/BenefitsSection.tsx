import { Infinity, Trophy, Zap } from "lucide-react";

const BenefitsSection = () => {
  return (
    <section className="bg-background container mx-auto px-8 py-16">
      {/* Section Header */}
      <div className="mx-auto mb-16 max-w-4xl space-y-6 text-center">
        <h2 className="text-foreground text-4xl leading-tight font-bold lg:text-5xl">
          Design an Experience,{" "}
          <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
            Not Just an Event
          </span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          Go beyond logistics. Mint Up! gives you the tools to create memorable
          moments that build a loyal and excited community.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {/* Benefit 1 */}
        <div className="bg-card border-border/50 hover:border-primary/30 group rounded-3xl border p-8 transition-all duration-300">
          <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
            <Trophy className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-foreground mb-4 text-xl font-bold">
            Turn Tickets into Trophies
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Make your attendees feel special from day one. NFT tickets act as
            digital collectibles, building hype and creating a verifiable link
            between you and your earliest supporters.
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="bg-card border-border/50 hover:border-primary/30 group rounded-3xl border p-8 transition-all duration-300">
          <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
            <Zap className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-foreground mb-4 text-xl font-bold">
            Ignite the Room with Live Energy
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Transform passive listeners into active participants. Launch instant
            raffles and trivia directly in the app to boost engagement, create
            unforgettable moments, and make your event the one they can't stop
            talking about.
          </p>
        </div>

        {/* Benefit 3 */}
        <div className="bg-card border-border/50 hover:border-primary/30 group rounded-3xl border p-8 transition-all duration-300">
          <div className="bg-primary/10 group-hover:bg-primary/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300">
            <Infinity className="text-primary h-8 w-8" />
          </div>
          <h3 className="text-foreground mb-4 text-xl font-bold">
            Build a Community That Lasts
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The conversation doesn't end when the event does. Automatically
            deliver POAPs (Proof of Attendance) to create a permanent, on-chain
            record of your community, rewarding loyalty and keeping them engaged
            for what's next.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
