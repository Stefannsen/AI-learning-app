import styled from "styled-components";
import { Heading } from "@radix-ui/themes";

export const InfoIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  border-radius: 50%;

  svg {
    width: 70px;
    height: 70px;
    color: white;
  }

  &:hover {
    background-color: white;

    svg {
      color: ${({ theme }) => theme.colors.green7};
    }
  }
`;

export const InfoTextContainer = styled(Heading)`
  color: white;
  font-size: 50px;
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  min-height: 100%;
  width: 100%;
`;
