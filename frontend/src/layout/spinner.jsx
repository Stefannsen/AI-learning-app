import styled from "styled-components";
import { Spinner as RadixSpinner } from "@radix-ui/themes";

const StyledSpinner = styled(RadixSpinner)`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Spinner = ({ isLoading = false }) => {
  return <StyledSpinner size={2} loading={isLoading} />;
};

export { Spinner };
