import styled from "styled-components";
import { Card, Heading, Text } from "@radix-ui/themes";

const NoteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NoteContent = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: auto;
  width: 150px;
  position: relative;
`;

const Pin = styled.div`
  position: absolute;
  top: -20px;
  transform: translateY(50%);
  height: 20px;
  width: 20px;
  background-color: ${({ theme }) => theme.colors.green11};
  z-index: 1000;
  border-radius: 50%;
`;

const Note = ({ title, content }) => {
  return (
    <NoteContainer>
      <Pin />
      <NoteContent>
        <Heading size="3">{title}</Heading>
        <Text as="p" size="2">
          {content}
        </Text>
      </NoteContent>
    </NoteContainer>
  );
};

export { Note };
