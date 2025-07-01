import { Linkedin, MessageSquare, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-border/10 border-t">
      {/* Main Footer Area */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              Mint Up!
            </h3>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              The platform where communities come to life, one event at a time.
            </p>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Explore Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Create an Event
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Brand Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">
              Join the Community
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg p-2 transition-colors"
                aria-label="Twitter"
              >
                <X size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg p-2 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg p-2 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-border/10 border-t">
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-muted-foreground text-xs">
              © 2024 Mint Up! All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-xs transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-xs transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
