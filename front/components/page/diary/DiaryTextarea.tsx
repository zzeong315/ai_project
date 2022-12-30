import { Box, Container } from "@styles/layout";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { diarywriteState, clickedDiaryDateState } from "../../../recoil/diary";
import { postDiary } from "../../../services/api/diary";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { colors } from "@styles/common_style";

const DiaryTextarea = () => {
  const setIsTextareaOpen = useSetRecoilState(diarywriteState);
  const queryClient = useQueryClient();
  const handleBackClick = () => setIsTextareaOpen(false);
  const pickDay = useRecoilValue(clickedDiaryDateState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ content: string }>();

  const updateMutation = useMutation((data: { content: string }) => postDiary(data), {
    onSuccess: () => {
      const [year, month, day] = pickDay.split("-");
      queryClient.invalidateQueries(["diaries", year, month]);
    },
  });

  const handlePostSubmit: SubmitHandler<{ content: string }> = data => {
    updateMutation.mutate(data);
    setIsTextareaOpen(false);
  };

  return (
    <TextContainer>
      <FormBox onSubmit={handleSubmit(handlePostSubmit)}>
        <Textarea
          {...register("content", {
            required: true,
            minLength: {
              value: 10,
              message: "원활한 감정 분석을 위해 10자 이상 입력해 주세요.",
            },
            maxLength: {
              value: 5000,
              message: "일기는 5000자까지만 입력 가능합니다.",
            },
          })}
          autoFocus
          placeholder="오늘의 일기를 작성해주세요.
          수정, 삭제가 불가하니 신중하게 적어주세요 *^^*"
        />
        <ErrorMessage>{errors?.content?.message}</ErrorMessage>
        <ButtonBox>
          <BackButton onClick={handleBackClick}>뒤로 가기</BackButton>
          <SaveButton type="submit">나의 일기 저장하기</SaveButton>
        </ButtonBox>
      </FormBox>
    </TextContainer>
  );
};

const TextContainer = styled(Container)`
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 1em;
`;
const FormBox = styled.form`
  width: 100%;
  height: 90%;
  flex-direction: column;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  padding: 3em;
  line-height: 20px;
  letter-spacing: 0.5px;
  border-radius: 10px;
  outline: none;
  background-color: ${props => props.theme.color.purpleBox};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  resize: none;
  overflow-y: auto;
  white-space: pre-line;
`;
const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;
const ButtonBox = styled(Box)`
  width: 100%;
  justify-content: space-between;
`;
const SaveButton = styled.button`
  margin-top: 1em;
  padding: 0.7em 2em;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const BackButton = styled(SaveButton)``;

export default DiaryTextarea;
