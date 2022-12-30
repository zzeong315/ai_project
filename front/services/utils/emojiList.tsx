import { AnxiosIcon, EmbarassIcon, GladIcon, HurtIcon, SadIcon, UpsetIcon } from "@components/icons/EmotionIcon";

export interface EmojiListProps {
  data: {[key: number]: string};
  day: number;
}

export const emojiList = (key : string, height: number) => {
  if (key === "기쁨") {
    return <GladIcon height={height}/>
  } else if (key === "슬픔") {
    return <SadIcon height={height + 2}/>
  } else if (key === "분노") {
    return <UpsetIcon height={height}/>
  } else if (key === "상처") {
    return <HurtIcon height={height}/>
  } else if (key === "당황") {
    return <EmbarassIcon height={height}/>
  } else if (key === "불안") {
    return <AnxiosIcon height={height}/>
  } else {
    return null;
  }
};

export const colorList = (key : string, opicity: number) => {
  if (key === "기쁨") {
    return `rgba(255, 172, 204, ${opicity})`
  } else if (key === "슬픔") {
    return `rgba(108, 194, 236, ${opicity})`
  } else if (key === "분노") {
    return `rgba(249, 136, 132, ${opicity})`
  } else if (key === "상처") {
    return `rgba(172, 211, 169, ${opicity})`
  } else if (key === "당황") {
    return `rgba(243, 228, 128, ${opicity})`
  } else if (key === "불안") {
    return `rgba(141, 148, 216, ${opicity})`
  } else {
    return null;
  }
};