import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router";
import {
  MagnifyingGlassIcon,
  ArchiveIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/themes";

const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4vmin;

  height: 100vh;
  padding: 2vmin;
  box-sizing: border-box;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  background-color: ${({ theme }) => theme.colors.green9};
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  box-sizing: border-box;
  border: 1vmin solid transparent;

  svg {
    width: 4.5vmin;
    height: 4.5vmin;
    color: white;
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.green9};
    }

    border: 1vmin solid white;
    background-color: white;
  }

  &:active {
    svg {
      color: ${({ theme }) => theme.colors.green9};
    }

    border: 1vmin solid white;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      svg {
        color: ${theme.colors.green9};
      }

      border: 1vmin solid white;
      background-color: white;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    `}
`;

const StyledSeparator = styled(Separator)`
  height: 0.4vmin;
  width: 5vmin;
  background-color: white;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBoardOptions = pathname !== "/";

  return (
    <NavbarContainer>
      <IconContainer onClick={() => navigate("/")} isActive={pathname === "/"}>
        <MagnifyingGlassIcon />
      </IconContainer>
      {showBoardOptions && (
        <>
          <StyledSeparator orientation="horizontal" size={10} color="white" />
          <IconContainer
            title="Notes"
            onClick={() => navigate("/notes")}
            isActive={pathname === "/notes"}
          >
            <ArchiveIcon />
          </IconContainer>
          <IconContainer
            title="Quiz"
            onClick={() => navigate("/quiz")}
            isActive={pathname === "/quiz"}
          >
            <RocketIcon />
          </IconContainer>
        </>
      )}
    </NavbarContainer>
  );
};

export { Navbar };
