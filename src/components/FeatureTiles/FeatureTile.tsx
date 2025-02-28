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
  <div className="bg-gradient-to-br from-white to-gray-100 h-full min-h-[280px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-orange-300 hover:-translate-y-1">
    <NextLink href={link}>
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center p-4 border-b-2 border-orange-400">
        <div className="text-orange-400 text-2xl">{icon}</div>
        <h4 className="ml-3 font-bold text-lg">{title}</h4>
      </div>
      <div className="p-5 h-full flex flex-col">
        <p className="text-gray-700 leading-relaxed flex-grow font-sans">
          {details}
        </p>
        <div className="mt-4 flex justify-end">
          <span className="text-orange-500 font-medium text-sm flex items-center group">
            Explore
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </NextLink>
  </div>
);

export default FeatureTileContainer;
