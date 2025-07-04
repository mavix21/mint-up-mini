import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mint-up/ui/components/accordion";

const FAQSection = () => {
  return (
    <section className="bg-background container mx-auto px-8 py-16">
      {/* Section Header */}
      <div className="mx-auto mb-16 max-w-4xl space-y-6 text-center">
        <h2 className="text-foreground text-4xl font-bold leading-tight lg:text-5xl">
          Your Questions,{" "}
          <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
            Answered
          </span>
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
          We know you might have questions. Here's everything you need to know
          to get started with confidence.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mx-auto max-w-4xl">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="bg-card border-border/50 rounded-2xl border px-6 py-4"
          >
            <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg font-semibold transition-colors hover:no-underline">
              Is this too technical for me or my attendees?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Not at all. We designed Mint Up! to feel as simple as any web2
              platform. For organizers, the interface is intuitive and familiar.
              For attendees, it's even easier. Thanks to Account Abstraction,
              they can mint a ticket just by logging in with their email or
              social account—no complex wallet setup required. It's web3 power
              with web2 simplicity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="bg-card border-border/50 rounded-2xl border px-6 py-4"
          >
            <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg font-semibold transition-colors hover:no-underline">
              Why do I need NFT tickets? Isn't a regular QR code enough?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              A QR code gets someone in the door. An NFT ticket makes them part
              of the club. Unlike a disposable code, an NFT is a digital
              collectible—a souvenir that builds a permanent, verifiable link
              between you and your community. It's the difference between a
              paper ticket and a backstage pass that your attendees will want to
              show off forever.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="bg-card border-border/50 rounded-2xl border px-6 py-4"
          >
            <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg font-semibold transition-colors hover:no-underline">
              This sounds great, but what's the catch? How much will it cost?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Mint Up! is free for free events. We believe in helping
              communities grow. We build on next-generation blockchains like
              Base and Optimism, which means transaction ("gas") fees for
              minting free tickets are incredibly low—often less than a cent.
              For paid events, we have a simple, transparent fee that is
              competitive with traditional platforms. No hidden costs, ever.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="bg-card border-border/50 rounded-2xl border px-6 py-4"
          >
            <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg font-semibold transition-colors hover:no-underline">
              Do I own my event data and community list?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              Yes, 100%. This is a core principle of web3 and for us. Unlike
              other platforms that lock you in, your attendee list is
              transparent on-chain. You can always see which wallets hold your
              tickets and POAPs. It's your event, your community, and your data.
              We just provide the tools to make it amazing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
