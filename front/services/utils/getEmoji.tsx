import { AnxiosIcon, EmbarassIcon, GladIcon, HurtIcon, SadIcon, UpsetIcon } from "@components/icons/EmotionIcon";

export const getEmoji = (emotion: string) => {
  if (emotion === "기쁨") {
    return <GladIcon height={23} />;
  } else if (emotion === "슬픔") {
    return <SadIcon height={23} />;
  } else if (emotion === "분노") {
    return <UpsetIcon height={23} />;
  } else if (emotion === "상처") {
    return <HurtIcon height={23} />;
  } else if (emotion === "당황") {
    return <EmbarassIcon height={23} />;
  } else if (emotion === "불안") {
    return <AnxiosIcon height={23} />;
  } else {
    return null;
  }
};
