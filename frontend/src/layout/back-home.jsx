import { useNavigate } from "react-router";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { InfoIconContainer, InfoTextContainer, MainContainer } from "../styled";

const InfoHome = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <InfoTextContainer size="5" color="white">
        Trebuie sa introduci numele lectiei
      </InfoTextContainer>
      <InfoIconContainer onClick={() => navigate("/")}>
        <MagnifyingGlassIcon />
      </InfoIconContainer>
    </MainContainer>
  );
};

export { InfoHome };
