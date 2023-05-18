import React from "react";
import NextLink from "next/link";

interface FeatureTileContainerProps {
  title: string;
  link: string;
  details: string;
  icon: React.ReactNode;
}

const FeatureTileContainer = ({
  title,
  link,
  details,
  icon,
}: FeatureTileContainerProps) => (
  <div className="bg-white h-80 lg:h-40 row-span-2 rounded-md overflow-hidden">
    <NextLink href={link}>
      <div className="bg-black text-white flex items-center mb-3 p-1">
        {icon}
        <h4 className="ml-3">{title}</h4>
      </div>
      <p className="text-black m-3">{details}</p>
    </NextLink>
  </div>
);

export default FeatureTileContainer;
