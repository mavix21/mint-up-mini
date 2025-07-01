const CommunitySection = () => {
  // Mock attendee data
  const attendees = [
    { name: "Kerem Vural", avatar: "KV" },
    { name: "BuyBitcoin", avatar: "BB" },
    { name: "Sarah Chen", avatar: "SC" },
    { name: "Alex Rivera", avatar: "AR" },
    { name: "Maya Patel", avatar: "MP" },
    { name: "Jordan Kim", avatar: "JK" },
    { name: "Emma Wilson", avatar: "EW" },
    { name: "Lucas Brown", avatar: "LB" },
    { name: "Zoe Garcia", avatar: "ZG" },
    { name: "Ryan Davis", avatar: "RD" },
    { name: "Sophia Lee", avatar: "SL" },
    { name: "Marcus Johnson", avatar: "MJ" },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-foreground text-xl font-bold">110 Going</h2>
        <p className="text-muted-foreground text-sm">
          {attendees.length}+ students and builders who have already minted
          their tickets
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        {attendees.map((attendee, index) => (
          <div key={index} className="flex flex-col items-center space-y-1">
            <div className="from-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br to-purple-600 text-xs font-bold">
              {attendee.avatar}
            </div>
            <span className="text-foreground w-full truncate text-center text-xs font-medium">
              {attendee.name}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-muted-foreground text-xs">
          + many more amazing builders joining daily
        </p>
      </div>
    </section>
  );
};

export default CommunitySection;
