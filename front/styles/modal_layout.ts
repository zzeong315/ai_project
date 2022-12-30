import styled from "styled-components";
import { colors } from "./common_style";
import { motion } from "framer-motion";

export const Overlay = styled(motion.div)`
  z-index: 100;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

export const ModalContainer = styled(motion.div)<{ width?: string; height?: string }>`
  position: relative;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border-radius: ${props => props.theme.borderSize.borderSm};
  width: ${props => (props.width ? props.width : "400px")};
  height: ${props => (props.height ? props.height : "250px")};
  background-color: ${props => props.theme.color.purpleBox};
  border: 1px solid ${props => props.theme.color.border};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 720px) {
    width: 350px;
  }
`;

export const Cancel = styled.div`
  align-self: flex-end;
  margin: 0.8em;
  cursor: pointer;
`;

export const AgreeButton = styled.button`
  padding: 0.5em 1em;
  width: 7em;
  border-radius: 5px;
  margin: 0.5em;
`;
export const DenyButton = styled(AgreeButton)`
  background-color: ${props => colors.red};
  &:hover {
    background-color: ${props => colors.red};
    opacity: 0.8;
  }
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSize.textLg};
  margin: 1em;
  font-weight: 700;
  color: ${props => props.theme.color.fontPoint};
`;
