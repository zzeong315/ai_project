import { Variants } from "framer-motion";

export const cardVariants: Variants = {
  offscreen: {
    x: -30,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.8,
    },
  },
};
export const TextVariants: Variants = {
  offscreen: {
    y: 150,
    opacity: 0,
  },
  onscreen: {
    y: 50,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.8,
    },
  },
};
