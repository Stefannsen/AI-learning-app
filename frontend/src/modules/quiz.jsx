import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Heading, Text, Button } from "@radix-ui/themes";
import {
  ReloadIcon,
  // CheckCircledIcon,
  // CrossCircledIcon,
} from "@radix-ui/react-icons";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { api } from "../api";
import { Reload } from "../layout/reload";
import { InfoHome } from "../layout/back-home";
import { InfoIconContainer } from "../styled";
import { Spinner } from "../layout/spinner";

const answerStatus = {
  BLURRED: "BLURRED",
  CORRECT: "CORRECT",
  WRONG: "WRONG",
};

const getOptionStatisColor = ({ status, theme }) => {
  switch (status) {
    case answerStatus.BLURRED:
      return "#a0a6ab";
    case answerStatus.CORRECT:
      return theme.colors.green7;
    case answerStatus.WRONG:
      return theme.colors.red7;
    default:
      return "#a0a6ab";
  }
};

const QuizContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
`;

const QuizdCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(204, 187, 187, 0.1);
  height: 280px;
  width: 100vh;
  position: relative;
`;

const QuestionContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 50px;
`;

const OptionsContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  width: 100%;
  height: 200px;
`;

const OptionButton = styled(Button)`
  height: 100%;
  color: white;

  background-color: ${getOptionStatisColor};

  &:hover {
    background-color: ${({ status }) => !status && "#868a8e"};
  }
`;

const ButtonText = styled(Text)`
  text-voerflow: ellipsis;
`;

const Score = styled(Heading)`
  color: white;
  font-size: 50px;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const getBlurredList = () =>
  Array.from({ length: 4 }, () => answerStatus.BLURRED);

const getCorrectAnswerIndex = (question) => {
  if (question.option_1.is_correct) {
    return 0;
  }

  if (question.option_2.is_correct) {
    return 1;
  }

  if (question.option_3.is_correct) {
    return 2;
  }

  if (question.option_4.is_correct) {
    return 3;
  }
};

const timeout = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

const Quiz = ({ input }) => {
  const { width, height } = useWindowSize();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optionStatus, setOptionStatus] = useState([]);
  // const [isOptionSelected, setIsOptionSelected] = useState(false);

  const isQuizFinished = currentIndex === questions.length;
  const isQuizAvaiable = Boolean(questions.length);
  const hasMaxScore = score === questions.length;

  const currentQuestion = isQuizAvaiable ? questions[currentIndex] : undefined;

  const getQuastions = useCallback(async () => {
    if (input?.length !== 0) {
      setIsLoading(true);
      try {
        const data = await api.getQuiz(input);
        setQuestions(data);
      } catch (e) {
        setHasError(true);
      }
      setIsLoading(false);
    }
  }, [input, setIsLoading]);

  useEffect(() => {
    getQuastions();
  }, [getQuastions]);

  const selectAnswer = useCallback(
    async (answer, index) => {
      const { is_correct } = answer;
      if (is_correct) {
        setScore((prevScore) => prevScore + 1);
        const newRowStatus = getBlurredList();
        newRowStatus[index] = answerStatus.CORRECT;
        setOptionStatus(newRowStatus);
      } else {
        const newRowStatus = getBlurredList();
        const currentQuestion = questions[currentIndex];
        const correctOptionIndex = getCorrectAnswerIndex(currentQuestion);
        newRowStatus[index] = answerStatus.WRONG;
        newRowStatus[correctOptionIndex] = answerStatus.CORRECT;
        setOptionStatus(newRowStatus);
      }

      await timeout(5);
      setOptionStatus([]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    },
    [questions, currentIndex, setScore, setCurrentIndex, setOptionStatus]
  );

  const reload = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setHasError(false);
    getQuastions();
  }, [setQuestions, setCurrentIndex, setScore, getQuastions]);

  if (input?.length === 0) {
    return <InfoHome />;
  }

  if (isLoading) {
    return <Spinner isLoading={true} />;
  }

  if (hasError) {
    return <Reload reload={reload} />;
  }

  if (isQuizFinished) {
    return (
      <>
        <QuizContainer>
          {hasMaxScore && (
            <Score size="10" color="white">
              Felicitari!
            </Score>
          )}
          <Score size="10" color="white">
            Scor: {score}/{questions.length}
          </Score>
          <InfoIconContainer onClick={() => reload()}>
            <ReloadIcon />
          </InfoIconContainer>
        </QuizContainer>
        {hasMaxScore && <Confetti width={width - 16} height={height - 16} />}
      </>
    );
  }

  return (
    <QuizContainer>
      <QuizdCard>
        <QuestionContainer>
          <Heading size="3">{`${currentIndex + 1}. ${
            currentQuestion.question
          }`}</Heading>
        </QuestionContainer>
        <OptionsContainer>
          <OptionButton
            status={optionStatus[0]}
            onClick={() => selectAnswer(currentQuestion.option_1, 0)}
          >
            <ButtonText size="2">{currentQuestion.option_1.text}</ButtonText>
          </OptionButton>
          <OptionButton
            status={optionStatus[1]}
            onClick={() => selectAnswer(currentQuestion.option_2, 1)}
          >
            <ButtonText size="2">{currentQuestion.option_2.text}</ButtonText>
          </OptionButton>
          <OptionButton
            status={optionStatus[2]}
            onClick={() => selectAnswer(currentQuestion.option_3, 2)}
          >
            <ButtonText size="2">{currentQuestion.option_3.text}</ButtonText>
          </OptionButton>
          <OptionButton
            status={optionStatus[3]}
            onClick={() => selectAnswer(currentQuestion.option_4, 3)}
          >
            <ButtonText size="2">{currentQuestion.option_4.text}</ButtonText>
          </OptionButton>
        </OptionsContainer>
      </QuizdCard>
    </QuizContainer>
  );
};

export { Quiz };
