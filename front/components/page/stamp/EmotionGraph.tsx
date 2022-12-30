import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { sumMonthEmotion } from "@services/utils/sumMonthEmotion";
import { GraphIcon } from "@components/icons/GraphIcon";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isEmoAnalysisAtom, MonthEmotionAtom } from "@recoil/stamp";
import { colorList } from "@services/utils/emojiList";

interface Data {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: any;
      borderColor: any;
      borderWidth: number;
    },
  ];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const EmotionGraph = () => {
  const setIsEmoAnalysisOpen = useSetRecoilState(isEmoAnalysisAtom);
  const MonthEmotionData = useRecoilValue(MonthEmotionAtom);
  const EmotionObj = sumMonthEmotion(MonthEmotionData);

  const data: Data = {
    labels: Object.keys(EmotionObj),
    datasets: [
      {
        label: "감정",
        data: Object.values(EmotionObj),
        backgroundColor: Object.keys(EmotionObj).map(emo => colorList(emo, 0.3)),
        borderColor: Object.keys(EmotionObj).map(emo => colorList(emo, 1)),
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "left" as const,
      },
    },
  };

  return (
    <EmotionGraphBox>
      <PieBox>
        <TextBox>
          <GraphIcon />
          <Title>감정분석 그래프</Title>
        </TextBox>
        <DoughnutBox onClick={() => setIsEmoAnalysisOpen(false)}>
          <Pie data={data} options={options} />
        </DoughnutBox>
      </PieBox>
    </EmotionGraphBox>
  );
};

const EmotionGraphBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 850px) {
    width: 100%;
    height: auto;
  }
`;
const PieBox = styled.div`
  width: 70%;
  height: 90%;
  flex-direction: column;
`;
const DoughnutBox = styled.div`
  height: 22vh;
`;
const TextBox = styled.div`
  padding: 1em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled.p`
  text-align: center;
  font-weight: 600;
  margin-left: 0.5em;
`;

export default React.memo(EmotionGraph);
