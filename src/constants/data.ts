import { NavItem } from "@/types";
import {
  faviconHref,
  faviconLabel,
  faviconTitle,
  imageCompressorHref,
  imageCompressorLabel,
  imageCompressorTitle,
  imgToWebpHref,
  imgToWebpLabel,
  imgToWebpTitle,
  pngToJpegHref,
  pngToJpegLabel,
  pngToJpegTitle,
  robotsHref,
  robotsLabel,
  robotsTitle,
  schemaMarkupHref,
  schemaMarkupLabel,
  schemaMarkupTitle,
  xmlSiteMapHref,
  xmlSiteMapLabel,
  xmlSiteMapTitle,
} from "./strings";

export const navItems: NavItem[] = [
  {
    title: robotsTitle,
    href: robotsHref,
    icon: "dashboard",
    label: robotsLabel,
  },
  // {
  //   title: schemaMarkupTitle,
  //   href: schemaMarkupHref,
  //   icon: "user",
  //   label: schemaMarkupLabel,
  // },
  // {
  //   title: xmlSiteMapTitle,
  //   href: xmlSiteMapHref,
  //   icon: "employee",
  //   label: xmlSiteMapLabel,
  // },
  {
    title: faviconTitle,
    href: faviconHref,
    icon: "employee",
    label: faviconLabel,
  },
  {
    title: imageCompressorTitle,
    href: imageCompressorHref,
    icon: "profile",
    label: imageCompressorLabel,
  },
  {
    title: pngToJpegTitle,
    href: pngToJpegHref,
    icon: "profile",
    label: pngToJpegLabel,
  },
  {
    title: imgToWebpTitle,
    href: imgToWebpHref,
    icon: "profile",
    label: imgToWebpLabel,
  },
];
