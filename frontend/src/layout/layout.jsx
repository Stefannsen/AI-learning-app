import React from "react";
import styled from "styled-components";

import { Spinner } from "../layout/spinner";
import { Navbar } from "./navbar";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vmin;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.green7};
`;

const Layout = ({ isLoading, children }) => {
  return (
    <AppContainer>
      <Navbar />
      <Spinner isLoading={isLoading} />
      {children}
    </AppContainer>
  );
};

export { Layout };
