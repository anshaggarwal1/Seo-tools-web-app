import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin, Search } from "lucide-react";
import { LightBulbIcon, MapIcon, PlaneIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  schemaMarkupDescription,
  schemaMarkupTitle,
} from "@/constants/strings";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="mt-1 bg-primary/20 p-3 rounded-2xl">
            <Search className="text-primary" />
          </div>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Seo Tools</CardTitle>
            <CardDescription>
              Tools that can be used to increase seo.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent> Tools that can be used to increase seo.</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="grid gap-4 place-items-center">
            <MapIcon />
            {schemaMarkupTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>{schemaMarkupDescription}</CardContent>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[20px] w-[320px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="grid gap-4 place-items-center">
            <PlaneIcon />
            Explore all Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          placeat.
          <Button className="w-full mt-2">Explore Now</Button>
        </CardContent>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
