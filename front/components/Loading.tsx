import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingDiv>
      <span></span>
      <span></span>
      <span></span>
    </LoadingDiv>
  );
};

const LoadingDiv = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;

  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: gray;

    animation: loading 1s 0s linear infinite;
  }

  span:nth-child(1) {
    animation-delay: 0s;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export default Loading;
