const EventDetailsSection = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-foreground text-xl font-bold">About Event</h2>

      <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
        <p>
          <strong className="text-foreground">
            Dev3pack, EigenLayer and Base
          </strong>{" "}
          are excited to welcome the best 40 student builders coming from
          blockchain clubs for an exclusive F1 race in Cannes. This isn't just a
          race – it's a celebration of the next generation of Web3 innovators.
        </p>

        <p>
          Join us for an unforgettable experience where cutting-edge technology
          meets high-speed competition. Whether you're racing or watching,
          you'll be part of a community that's shaping the future of
          decentralized applications and blockchain technology.
        </p>
      </div>

      <div className="bg-muted/20 space-y-3 rounded-lg p-4">
        <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold">
          🏁 Agenda For Drivers
        </h3>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>Time trials 10 minutes</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>12 laps race</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>Podium + University Cup</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>ETHGlobal Happy Hour after race (6PM)</span>
          </li>
        </ul>
      </div>

      <div className="bg-muted/20 space-y-3 rounded-lg p-4">
        <h3 className="text-foreground flex items-center gap-2 text-lg font-semibold">
          🏆 For participants
        </h3>
        <ul className="text-muted-foreground space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>Exclusive merch from EigenLayer 👕</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>For top 3: Ledger Stax, Ledger Flex, Ledger Nano X</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
            <span>
              Opportunity to host Only Dust station in your university
            </span>
          </li>
        </ul>
        <p className="text-muted-foreground mt-2 text-xs">
          No driving license or previous experience required.
        </p>
      </div>
    </section>
  );
};

export default EventDetailsSection;
