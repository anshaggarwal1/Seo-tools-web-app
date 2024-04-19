import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";
import { imageCompressorDescription, imageCompressorTitle, robotsDescription, robotsHref, robotsTitle, schemaMarkupDescription, schemaMarkupTitle, xmlSiteMapDescription, xmlSiteMapTitle } from "@/constants/strings";
import { useNavigate } from "react-router-dom";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
  href: string;
}

const featuredTools: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: robotsTitle,
    description: robotsDescription,
    href: robotsHref
  },
  {
    icon: <MapIcon />,
    title: schemaMarkupTitle,
    description: schemaMarkupDescription,
    href: robotsHref
  },
  {
    icon: <PlaneIcon />,
    title: xmlSiteMapTitle,
    description: xmlSiteMapDescription,
    href: robotsHref
  },
  {
    icon: <GiftIcon />,
    title: imageCompressorTitle,
    description: imageCompressorDescription,
    href: robotsHref
  },
];

export const HowItWorks = () => {
  const navigate = useNavigate()
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        {/* Top{" "} */}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          SEO{" "}
        </span>
        Tools
      </h2>

      <div className="grid pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredTools.map(({ icon, title, description, href }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
            onClick={() => {
              navigate('/tools' + href);
            }}
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
