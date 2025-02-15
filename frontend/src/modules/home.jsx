import { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Box, Button, Card, TextField, Heading } from "@radix-ui/themes";

import { MainContainer } from "../styled";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  boxshadow: "0 4px 6px rgba(0, 0, 0, 0.1)";
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const HomePage = ({ input, setInput }) => {
  const navigate = useNavigate();
  const [text, setText] = useState(input);

  const onChange = useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText]
  );

  const onClick = useCallback(() => {
    setInput(text);
    navigate("/board");
  }, [text, setInput, navigate]);

  const onKeyDown = useCallback(
    (event) => {
      if (event.keyCode === 13 && text) {
        onClick();
      }
    },
    [text, onClick]
  );

  return (
    <MainContainer>
      <Box minWidth="400px">
        <StyledCard size="2">
          <Heading size="3">Lectia de astazi</Heading>
          <TextField.Root
            placeholder="ex. Introducere in C++"
            value={text}
            onChange={onChange}
            onKeyDown={onKeyDown}
          >
            <TextField.Slot />
          </TextField.Root>
          <ButtonsContainer>
            <Button onClick={onClick} disabled={Boolean(!text)}>
              Cauta
            </Button>
          </ButtonsContainer>
        </StyledCard>
      </Box>
    </MainContainer>
  );
};

export { HomePage };
