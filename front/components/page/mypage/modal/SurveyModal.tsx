import { isSurveyModalAtom } from "@recoil/modal";
import { userAtom } from "@recoil/user";
import { ChangeSurveyCategory, getUserInfo } from "@services/api/user";
import { surveyCategories } from "@services/utils/surveyCategory";
import { Box } from "@styles/layout";
import { ModalVariant, OverlayVariant } from "@styles/ModalVariants";
import { ModalWrapper, Overlay } from "@styles/modal_layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SurveyForm, User } from "@type/user";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CloseIcon } from "../../../icons/CloseIcon";

const SurveyModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useRecoilState(userAtom);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useRecoilState<boolean>(isSurveyModalAtom);

  const { data: userInfo } = useQuery<User>(["user", "info"], () => getUserInfo(user?.id!));
  const [selectedCategory, setSelectedCategory] = useState<string[]>();

  useEffect(() => {
    if (router.asPath === "/stamp" && user?.isFirstLogin === 0) {
      setIsSurveyModalOpen(true);
    }
  }, [router.asPath]);

  useEffect(() => {
    userInfo && setSelectedCategory(userInfo?.survey);
  }, [userInfo]);
  const handleAddCategory = (newCategory: string) => {
    if (selectedCategory) {
      setSelectedCategory([...selectedCategory, newCategory]);
      if (selectedCategory.includes(newCategory)) {
        setSelectedCategory(selectedCategory.filter(category => category !== newCategory));
      }
    } else {
      setSelectedCategory([newCategory]);
    }
  };
  const changeMutation = useMutation(
    (data: SurveyForm) => ChangeSurveyCategory({ id: data.id, survey: selectedCategory }),
    {
      onSuccess: (status, value) => {
        queryClient.invalidateQueries(["user", "info"]);
      },
      onError: () => {},
    },
  );

  const closeModal = () => {
    setIsSurveyModalOpen(false);
    if (user?.isFirstLogin === 0) {
      setUser({ ...user, isFirstLogin: 1 });
    }
  };
  const handleClickCancel = () => {
    closeModal();
  };
  const handleClickConfirm = () => {
    changeMutation.mutate({ id: user?.id!, survey: selectedCategory });
    closeModal();
  };

  return (
    <AnimatePresence>
      {isSurveyModalOpen && (
        <ModalWrapper>
          <SurveyContainer {...ModalVariant}>
            <Cancel onClick={handleClickCancel}>
              <CloseIcon width={15} height={15} />
            </Cancel>
            <Head>
              <Title>선호하는 카테고리를 선택하세요.</Title>
              <Description>선택한 카테고리에 맞춰서 활동을 추천해드려요.</Description>
              <Description>마이페이지에서 선호하는 카테고리를 변경할 수 있습니다.</Description>
            </Head>
            <CheckList>
              {surveyCategories.map(category => (
                <CategoryButton
                  key={category.title}
                  onClick={() => handleAddCategory(category.title)}
                  className={selectedCategory && selectedCategory?.includes(category.title) ? "active" : ""}
                >
                  <Emoji>{category.emoji}</Emoji>
                  <Category>{category.title}</Category>
                </CategoryButton>
              ))}
            </CheckList>
            <Button onClick={handleClickConfirm}>선택 완료</Button>
          </SurveyContainer>
          <Overlay {...OverlayVariant} onClick={handleClickCancel} />
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};

const SurveyContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.nav};
  color: ${props => props.theme.color.fontMain};
  border-radius: 10px;

  z-index: 10000;
  width: 800px;
  height: 600px;
  flex-direction: column;
  justify-content: flex-start;
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 720px) {
    margin-top: 80px;
    height: auto;
    width: 90%;
    overflow-y: auto;
  }
`;

const Cancel = styled.div`
  align-self: flex-end;
  margin: 0.8em;
  cursor: pointer;
`;
const Head = styled(Box)`
  flex-direction: column;
  margin: 1em;
`;
const Title = styled.h1`
  color: ${props => props.theme.color.fontPoint};
  font-weight: bold;
  font-size: ${props => props.theme.fontSize.textLg};
  margin: 0.5em;
`;
const Description = styled.p`
  font-size: ${props => props.theme.fontSize.textXs};
  margin: 0.1em;
`;
const CheckList = styled(Box)`
  width: 80%;
  height: 55%;
  flex-wrap: wrap;
  @media screen and (max-width: 720px) {
    width: 95%;
  }
`;
const CategoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.color.nav};
  color: ${props => props.theme.color.fontMain};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid ${props => props.theme.color.border};
  border-radius: 30px;
  margin: 0.5em;
  line-height: 22px;
  letter-spacing: 0.1em;
  padding: 0.8em 1.3em;
  &:hover {
    color: ${props => props.theme.color.white};
  }
  &.active {
    border: 1px solid ${props => props.theme.color.fontPoint};
    color: ${props => props.theme.color.fontPoint};
    background-color: ${props => props.theme.color.purpleBox};
    font-weight: 700;
  }
  @media screen and (max-width: 720px) {
    padding: 0.5em 1em;
    font-size: ${props => props.theme.fontSize.textXs};
  }
`;
const Emoji = styled.p`
  margin-right: 0.3em;
`;
const Category = styled.p``;
const Button = styled.button`
  padding: 0.6em 1.5em;
  margin: 2em;
`;

export default SurveyModal;
