import { IconProps } from "@type/icon";
import React from "react";

export const LeftarrowIcon = ({ color }: IconProps) => {
  return (
    <svg width="9" height="15" viewBox="0 0 9 15" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.91235 13.1489L3.40379 7.44983L8.91235 1.75071L7.21649 0L2.69816e-05 7.44983L7.21649 14.8997L8.91235 13.1489Z" />
    </svg>
  );
};

export const RightarrowIcon = ({ color }: IconProps) => {
  return (
    <svg width="9" height="15" viewBox="0 0 9 15" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 13.1489L5.50856 7.44983L0 1.75071L1.69587 0L8.91233 7.44983L1.69587 14.8997L0 13.1489Z" />
    </svg>
  );
};
