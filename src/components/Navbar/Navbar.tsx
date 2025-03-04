import React, { ReactElement } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { GiSolarTime, GiFireBowl } from "react-icons/gi";
import { GrGraphQl } from "react-icons/gr";

import styles from "./Navbar.module.scss";
import Link from "next/link";

interface ItemProps {
  to: string;
  label: string;
  icon: ReactElement;
}

const Item = ({ to, label, icon }: ItemProps) => {
  return (
    <li>
      <Link href={to}>
        <div className={`${styles.item} xl:py-4`}>
          {icon}
          <span className="hidden xl:block">{label}</span>
        </div>
      </Link>
    </li>
  );
};

export default function Navbar() {
  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/seasons/", label: "Seasons", icon: <GiSolarTime /> },
    { to: "/players/", label: "Players", icon: <IoIosPeople /> },
    { to: "/versus/", label: "Versus", icon: <GiFireBowl /> },
    { to: "/graph/", label: "Connections", icon: <GrGraphQl /> },
  ];

  return (
    <nav className="bg-gray-800 fixed bottom-0 w-full xl:fixed xl:top-0 z-50 xl:h-14">
      <ul className={`${styles.itemList} xl:justify-start xl:px-4`}>
        {links.map((link) => (
          <Item {...link} key={link.label} />
        ))}
      </ul>
    </nav>
  );
}
