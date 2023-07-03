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
    <li key={label}>
      <Link href={to}>
        <div className={styles.item}>
          {icon} <span className="md:max-xl:block hidden">{label}</span>
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
    <nav className="bg-black absolute bottom-0 w-full md:max-xl:static">
      <ul className={styles.itemList}>
        {links.map((link) => (
          <Item {...link} />
        ))}
      </ul>
    </nav>
  );
}
