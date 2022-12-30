import { MonthEmotionProps } from "@type/stamp";

export interface ResultProps {
  [key: string]: number;
};

export const sumMonthEmotion = (data : MonthEmotionProps) => {
  const EmotionArray = Object.values(data);
  const result:ResultProps= {};

  EmotionArray.forEach((x:string) => { 
    result[x] = (result[x] || 0)+1; 
  });

  const sortResult = Object.fromEntries(
    Object.entries(result).sort(([a],[b]) => a < b? -1: 1 )
  );

  return sortResult;
};