import { ReloadIcon } from "@radix-ui/react-icons";
import { InfoIconContainer, InfoTextContainer, MainContainer } from "../styled";

const Reload = ({ reload }) => {
  return (
    <MainContainer>
      <InfoTextContainer size="10" color="white">
        Incearca din nou
      </InfoTextContainer>
      <InfoIconContainer onClick={() => reload()}>
        <ReloadIcon />
      </InfoIconContainer>
    </MainContainer>
  );
};

export { Reload };
