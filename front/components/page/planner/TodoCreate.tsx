import { CirclePlusIcon } from "@components/icons/CircleIcon";
import { dayAtom } from "@recoil/planner";
import { colors } from "@styles/common_style";
import { Box, Container } from "@styles/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Planner } from "@type/planner";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { createPlan } from "../../../services/api/planner";
import { formatDate } from "../../../services/utils/formatDate";

const TodoCreate = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ description: string }>();
  const queryClient = useQueryClient();

  const handleToggle = () => setOpen(!open);

  const recoilDay = useRecoilValue<Date>(dayAtom);
  const pickDay: string = formatDate(recoilDay);

  const updateMutation = useMutation((data: Planner) => createPlan(data), {
    onSuccess: () => {
      const [year, month, day] = pickDay.split("-");
      queryClient.invalidateQueries(["plan", year, month]);
    },
  });
  const onCreateSubmit = async (data: Planner) => {
    updateMutation.mutate({ date: pickDay, ...data, priority: 1 });
    setOpen(false);
    reset();
  };

  return (
    <>
      {open ? (
        <CreateContainer>
          <InsertForm onSubmit={handleSubmit(onCreateSubmit)}>
            <BtnBox onClick={handleToggle}>
              <CircleCloseBox onClick={() => reset()}>
                <CirclePlusIcon />
              </CircleCloseBox>
            </BtnBox>
            <Input
              autoFocus
              placeholder="할일을 입력 하세요."
              {...register("description", {
                required: true,
                minLength: { value: 2, message: "2자 이상 입력해주세요." },
                maxLength: { value: 20, message: "20자 이하 입력해주세요." },
              })}
            />
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
            <Button type="submit">입력</Button>
          </InsertForm>
        </CreateContainer>
      ) : (
        <BtnBox onClick={handleToggle}>
          <CirclePlusBox>
            <CirclePlusIcon />
          </CirclePlusBox>
        </BtnBox>
      )}
    </>
  );
};

const CreateContainer = styled(Container)`
  flex-direction: column;
  width: 100%;
  bottom: 0;
  position: absolute;
  background: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.borderPoint};
  border-radius: ${props => props.theme.borderSize.borderSm};
`;
const InsertForm = styled.form`
  width: 80%;
  z-index: 4;
  padding-top: 3em;
  padding-bottom: 3em;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CirclePlusBox = styled(Box)`
  padding: 0;
  margin-top: 2em;
  margin-bottom: 3em;
`;
const CircleCloseBox = styled(CirclePlusBox)`
  top: -20px;
  position: absolute;
  transform: rotate(45deg);
  margin: 0;
`;
const BtnBox = styled(Box)`
  z-index: 5;
  cursor: pointer;
`;
const Input = styled.input`
  height: 40px;
  margin: 1em;
  width: 100%;
  border: none;
  border-radius: ${props => props.theme.borderSize.borderSm};
  box-shadow: 0 2px 3px ${props => props.theme.color.shadow};
  padding-left: 20px;
`;
const ErrorMessage = styled.p`
  color: ${colors.red};
  align-self: flex-end;
  font-size: ${props => props.theme.fontSize.textXs};
`;
const Button = styled.button`
  margin-top: 10px;
  height: 36px;
  font-size: ${props => props.theme.fontSize.textSm};
`;
export default TodoCreate;
