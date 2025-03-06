import windowsIcon from "./windows.svg";
import macIcon from "./mac.svg";
import linuxIcon from "./linux.svg";
import logoIcon from "./logo.png";
import plusIcon from "./plus.svg";
import menuIcon from "./menu.svg";

const icons = {
  WINDOWS: windowsIcon,
  MAC: macIcon,
  LINUX: linuxIcon,
  LOGO: logoIcon,
  PLUS: plusIcon,
  MENU: menuIcon,
} as const;

export type OSType = keyof typeof icons;

export function getIcon(type: string): string {
  const normalizedType = type.toUpperCase() as OSType;
  return icons[normalizedType] || "";
}

export { windowsIcon, macIcon, linuxIcon };
