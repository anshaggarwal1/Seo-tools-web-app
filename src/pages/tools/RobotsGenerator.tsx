import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { robotsDescription, robotsTitle } from "@/constants/strings";
import { FC, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type IRobots = {
  name: Robots;
  value: string;
};

enum Robots {
  GOOGLE = "Googlebot",
  GOOGLE_IMAGE = "googlebot-image",
  GOOGLE_MOBILE = "googlebot-mobile",
  MSN_SEARCH = "MSNBot",
  YAHOO = "Slurp",
  YAHOO_MM = "yahoo-mmcrawler",
  YAHOO_BLOGS = "yahoo-blogs/v3.9",
  ASK_TEOMA = "Teoma",
  GIGA_BAST = "Gigabot",
  DMOZ_CHECKER = "Robozilla",
  NUTCH = "Nutch",
  ALEXA_WAYBACK = "ia_archiver",
}

const robotOptions = [
  { value: "Default", label: "Same as Default" },
  { value: "Allowed", label: "Allowed" },
  { value: "Refused", label: "Refused" },
];

const RobotsGenerator = () => {
  const [userContent, setUserContent] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [siteMap, setSiteMap] = useState("");
  const [robots, setRobots] = useState<IRobots[]>([]);

  const [restricted, setRestricted] = useState<{ value: string }[]>([
    { value: "" },
  ]);
  const handleAddRestrict = () => {
    setRestricted([...restricted, { value: "" }]);
  };

  const handleRemove = (idx: number) => {
    const values = [...restricted];
    values.splice(idx, 1);
    setRestricted(values);
  };

  const handleChangeSiteMap = (idx: number, e: any) => {
    const values = [...restricted];
    values[idx].value = e.target.value;
    setRestricted(values);
  };

  const handleRobotChange = (value: string, name: Robots) => {
    const updatedRobots = [...robots];
    const robotIndex = updatedRobots.findIndex((robot) => robot.name === name);
    if (robotIndex !== -1) {
      updatedRobots[robotIndex] = { name, value };
    } else {
      updatedRobots.push({ name, value });
    }
    setRobots(updatedRobots);
  };

  const generateRobotsTxt = () => {
    let robotsTxt = "";

    robots.forEach((item) => {
      if (item.value !== "Allowed" && item.value !== "Refused") return;
      robotsTxt += `User-agent: ${item.name}\n`;
      if (item.value == "Allowed") {
        robotsTxt += `Disallow: \n`;
      } else robotsTxt += `Disallow: /\n`;
    });

    robotsTxt += "User-agent: *\n";

    if (userContent === "Refused") {
      robotsTxt += "Disallow: /\n";
    } else robotsTxt += "Disallow: \n";

    if (crawlDelay === "5") {
      robotsTxt += "Crawl-delay: 5\n";
    } else if (crawlDelay === "10") {
      robotsTxt += "Crawl-delay: 10\n";
    } else if (crawlDelay === "20") {
      robotsTxt += "Crawl-delay: 20\n";
    } else if (crawlDelay === "60") {
      robotsTxt += "Crawl-delay: 60\n";
    } else if (crawlDelay === "120") {
      robotsTxt += "Crawl-delay: 120\n";
    }

    if (siteMap) {
      robotsTxt += `Sitemap: ${siteMap}\n`;
    }

    restricted.forEach((item) => {
      if (item.value) {
        robotsTxt += `Disallow: ${item.value}\n`;
      }
    });

    return robotsTxt;
  };

  const handleDownload = () => {
    const content = generateRobotsTxt();
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "robots.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="md:container ">
      <div className="text-center lg:text-start space-y-6 w-full">
        <main className="text-5xl md:text-6xl font-bold">
          <h2 className="inline">{robotsTitle}</h2>
        </main>
        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          {robotsDescription}
        </p>
      </div>

      <Card className="my-4">
        <CardContent className="py-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
            <CustomSelect
              value={userContent}
              label="Default - All Robots are"
              onChange={(value) => setUserContent(value)}
              placeHolder="Allowed"
              items={[
                { value: "a", label: "Allowed" },
                { value: "Refused", label: "Refused" },
              ]}
            />
            <CustomSelect
              label="Crawl-Delay"
              value={crawlDelay}
              onChange={(value) => setCrawlDelay(value)}
              placeHolder="Default - No Delay"
              items={[
                { value: "a", label: "Default - No Delay" },
                { value: "5", label: "5 Seconds" },
                { value: "10", label: "10 Seconds" },
                { value: "20", label: "20 Seconds" },
                { value: "60", label: "60 Seconds" },
                { value: "120", label: "120 Seconds" },
              ]}
            />
          </div>
          <div>
            <h1 className="font-semibold text-sm md:text-lg py-2">
              Sitemap: (leave blank if you don't have)
            </h1>
            <Input onChange={({ target }) => setSiteMap(target.value)} />
          </div>

          <div>
            <h1 className="font-semibold text-sm md:text-lg py-2 text-center">
              Search Robots
            </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              <CustomSelect
                label="Google"
                value={
                  robots.find((item) => item.name == Robots.GOOGLE)?.value ?? ""
                }
                onChange={(value) => handleRobotChange(value, Robots.GOOGLE)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Google Image"
                value={
                  robots.find((item) => item.name == Robots.GOOGLE_IMAGE)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.GOOGLE_IMAGE)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Google Mobile"
                value={
                  robots.find((item) => item.name == Robots.GOOGLE_MOBILE)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.GOOGLE_MOBILE)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="MSN Search"
                value={
                  robots.find((item) => item.name == Robots.MSN_SEARCH)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.MSN_SEARCH)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              <CustomSelect
                label="Yahoo"
                value={
                  robots.find((item) => item.name == Robots.YAHOO)?.value ?? ""
                }
                onChange={(value) => handleRobotChange(value, Robots.YAHOO)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Yahoo MM"
                value={
                  robots.find((item) => item.name == Robots.YAHOO_MM)?.value ??
                  ""
                }
                onChange={(value) => handleRobotChange(value, Robots.YAHOO_MM)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Yahoo Blogs"
                value={
                  robots.find((item) => item.name == Robots.YAHOO_BLOGS)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.YAHOO_BLOGS)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Ask/Teoma"
                value={
                  robots.find((item) => item.name == Robots.ASK_TEOMA)?.value ??
                  ""
                }
                onChange={(value) => handleRobotChange(value, Robots.ASK_TEOMA)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              <CustomSelect
                label="GigaBlast"
                value={
                  robots.find((item) => item.name == Robots.GIGA_BAST)?.value ??
                  ""
                }
                onChange={(value) => handleRobotChange(value, Robots.GIGA_BAST)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="DMOZ Checker"
                value={
                  robots.find((item) => item.name == Robots.DMOZ_CHECKER)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.DMOZ_CHECKER)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Nutch"
                value={
                  robots.find((item) => item.name == Robots.NUTCH)?.value ?? ""
                }
                onChange={(value) => handleRobotChange(value, Robots.NUTCH)}
                placeHolder="Same as Default"
                items={robotOptions}
              />
              <CustomSelect
                label="Alexa/Wayback"
                value={
                  robots.find((item) => item.name == Robots.ALEXA_WAYBACK)
                    ?.value ?? ""
                }
                onChange={(value) =>
                  handleRobotChange(value, Robots.ALEXA_WAYBACK)
                }
                placeHolder="Same as Default"
                items={robotOptions}
              />
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-sm md:text-lg py-2">
              Restricted Directories : (The path is relative to root and must
              contain a trailing slash "/")
            </h1>
            {restricted.map((item, index) => (
              <div className="flex gap-4 my-3">
                <Input
                  onChange={(e) => handleChangeSiteMap(index, e)}
                  value={item.value}
                />
                {index == restricted.length - 1 ? (
                  <Plus className="text-primary" onClick={handleAddRestrict} />
                ) : (
                  <Minus
                    className="text-red-500"
                    onClick={() => handleRemove(index)}
                  />
                )}
              </div>
            ))}
          </div>
          <Button className="w-full mt-2">Submit</Button>
        </CardContent>
      </Card>

      <Card className="my-8">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <Textarea
            rows={8}
            value={generateRobotsTxt()}
            placeholder="Your Robots txt Here"
          />
          <Button className="w-full mt-2" onClick={handleDownload}>
            Download File
          </Button>
        </CardContent>
      </Card>

      {/* Shadow effect */}
    </section>
  );
};

export default RobotsGenerator;

type CustomSelectProps = {
  placeHolder: string;
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
  label: string;
  value: string;
};
const CustomSelect: FC<CustomSelectProps> = ({
  placeHolder,
  items,
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <h1 className="font-semibold text-sm md:text-lg py-2 md:text-center">
        {label}
      </h1>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem value={item.value}>{item.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
