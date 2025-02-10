"use client"
import { Button } from "./Button";
import { useState } from "react";
import Icon from "./Icons";
import { AnimatePresence, motion } from "motion/react";

/**
 *
 * @returns: En NavigationItem-komponent ...
 * @example: <NavigationItem />
 * @alias: NavigationItem
  * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
**/

interface NavigationItemProps {
  item: {
    link: {
      url?: string;
      blank?: boolean;
      label?: string;
    }
    links?: Array<{
      url?: string;
      blank?: boolean;
      label?: string;
      links?: any[];
    }>;
  };
}

export default function NavigationItem({ item }: NavigationItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  return (
    <li>
      <Button onClick={toggleSubmenu} link={item.link as any} variant="none" className="hover:bg-background-muted px-2 py-1.5">
        {item?.link?.label}
      </Button>
    </li>
  );
}