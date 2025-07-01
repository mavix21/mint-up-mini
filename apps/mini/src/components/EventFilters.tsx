import { Button } from "@mint-up/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@mint-up/ui/components/card";
import { Checkbox } from "@mint-up/ui/components/checkbox";
import { Label } from "@mint-up/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@mint-up/ui/components/radio-group";

const EventFilters = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Event Format</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="format-all" />
              <Label htmlFor="format-all" className="text-muted-foreground">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="in-person" id="format-in-person" />
              <Label
                htmlFor="format-in-person"
                className="text-muted-foreground"
              >
                In-Person
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="online" id="format-online" />
              <Label htmlFor="format-online" className="text-muted-foreground">
                Online
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="defi" />
              <Label htmlFor="defi" className="text-muted-foreground">
                DeFi
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="nfts" />
              <Label htmlFor="nfts" className="text-muted-foreground">
                NFTs & Art
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gaming" />
              <Label htmlFor="gaming" className="text-muted-foreground">
                Gaming
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="development" />
              <Label htmlFor="development" className="text-muted-foreground">
                Development
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="meetup" />
              <Label htmlFor="meetup" className="text-muted-foreground">
                Community Meetup
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="text-muted-foreground h-9 w-full justify-start"
            >
              Any Date
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground h-9 w-full justify-start"
            >
              This Weekend
            </Button>
            <Button
              variant="outline"
              className="text-muted-foreground h-9 w-full justify-start"
            >
              Next Week
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Price</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="price-all" />
              <Label htmlFor="price-all" className="text-muted-foreground">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="price-free" />
              <Label htmlFor="price-free" className="text-muted-foreground">
                Free
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paid" id="price-paid" />
              <Label htmlFor="price-paid" className="text-muted-foreground">
                Paid
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Blockchain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="base" />
              <Label htmlFor="base" className="text-muted-foreground">
                Base
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="optimism" />
              <Label htmlFor="optimism" className="text-muted-foreground">
                Optimism
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="polygon" />
              <Label htmlFor="polygon" className="text-muted-foreground">
                Polygon
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="solana" />
              <Label htmlFor="solana" className="text-muted-foreground">
                Solana
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventFilters;
