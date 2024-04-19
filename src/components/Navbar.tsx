import { Fragment, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { navItems } from "@/constants/data";
import { NavItem } from "@/types";
import { Link } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  // {
  //   href: "#features",
  //   label: "Features",
  // },
  // {
  //   href: "#testimonials",
  //   label: "Testimonials",
  // },
  // {
  //   href: "#pricing",
  //   label: "Pricing",
  // },
  // {
  //   href: "#faq",
  //   label: "FAQ",
  // },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Fragment>
      <div className="left-0 fixed top-0  h-40 -z-50  blur-[80px] opacity-80 safari_only dark:bg-opacity-10   w-full to-blue-500 via-transparent  bg-gradient-to-br from-pink-400" />
      <header className="sticky border-b-[1px] top-0 z-50 w-full bg-opacity-80 bg-transparent dark:border-b-slate-700 backdrop-filter backdrop-blur-[4px] ">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
            <NavigationMenuItem className="font-bold flex">
              <Link to="/" className="ml-2 font-bold text-xl flex">
                <LogoIcon />
                Web-Glaze Services
              </Link>
            </NavigationMenuItem>

            {/* mobile */}
            <span className="flex md:hidden">
              <ModeToggle />

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="px-2">
                  <Menu
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="sr-only">Menu Icon</span>
                  </Menu>
                </SheetTrigger>

                <SheetContent side={"left"}>
                  <SheetHeader>
                    <SheetTitle className="font-bold text-xl">
                      Web-Glaze Services
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                    {navItems.map(({ href, label }: NavItem) => (
                      <Link
                        key={label}
                        to={href}
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        {label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </span>

            {/* desktop */}
            <nav className="hidden md:flex gap-2">
              {routeList.map((route: RouteProps, i) => (
                <a
                  href={route.href}
                  key={i}
                  className={`text-[17px] ${buttonVariants({
                    variant: "ghost",
                  })}`}
                >
                  {route.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex gap-2">
              <ModeToggle />
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </Fragment>
  );
};
