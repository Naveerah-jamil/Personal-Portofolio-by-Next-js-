import React from "react";
import NavLink from "./NavLink";

interface NavLinkType {
  title: string;
  path: string;
}

interface MenuOverlayProps {
  links: NavLinkType[];
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
