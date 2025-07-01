import { Award, Gift, Trophy } from "lucide-react";

const DigitalCollectionSection = () => {
  const valueItems = [
    {
      icon: Trophy,
      title: "Own Your Ticket as a Collectible",
      description:
        "Your NFT ticket is a unique digital object that grants you access and lives in your wallet forever as a memento.",
    },
    {
      icon: Award,
      title: "Claim Your Proof of Attendance",
      description:
        "After check-in, you'll automatically receive a unique POAP, creating a permanent on-chain record of your participation.",
    },
    {
      icon: Gift,
      title: "Unlock Live Rewards",
      description:
        "Your ticket is your key to participate in exclusive live raffles and trivia during the event.",
    },
  ];

  return (
    <section className="bg-muted/10 space-y-6 rounded-lg p-6">
      <div className="space-y-2 text-center">
        <h2 className="text-foreground text-xl font-bold">
          Your Digital Experience
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
          Beyond just attending, you'll own unique digital assets that
          commemorate your participation in this exclusive event.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {valueItems.map((item, index) => (
          <div key={index} className="group space-y-3 text-center">
            <div className="bg-primary/10 group-hover:bg-primary/20 mx-auto flex h-12 w-12 items-center justify-center rounded-full transition-colors">
              <item.icon className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-foreground text-sm font-semibold">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalCollectionSection;
