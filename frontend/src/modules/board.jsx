import styled from "styled-components";
import { useNavigate } from "react-router";
import { ArchiveIcon, RocketIcon } from "@radix-ui/react-icons";
import { MainContainer, InfoIconContainer } from "../styled";

const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const Board = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <IconsContainer>
        <InfoIconContainer title="Notes" onClick={() => navigate("/notes")}>
          <ArchiveIcon />
        </InfoIconContainer>
        <InfoIconContainer title="Quiz" onClick={() => navigate("/quiz")}>
          <RocketIcon />
        </InfoIconContainer>
      </IconsContainer>
    </MainContainer>
  );
};

export { Board };
