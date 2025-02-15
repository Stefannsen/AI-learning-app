import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "styled-components";
import { gray, blue, red, green, yellow } from "@radix-ui/colors";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./style.css";

import { Layout } from "./layout/layout";
import { HomePage } from "./modules/home";
import { Board } from "./modules/board";
import { Quiz } from "./modules/quiz";
import { Notes } from "./modules/notes";

function App() {
  const [input, setInput] = useState("");

  const theme = {
    colors: {
      ...gray,
      ...blue,
      ...red,
      ...green,
      ...yellow,
    },
  };

  return (
    <BrowserRouter>
      <Theme accentColor="green" grayColor="gray" radius="large" scaling="95%">
        <ThemeProvider theme={theme}>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={<HomePage input={input} setInput={setInput} />}
              />
              <Route path="board" element={<Board />} />
              <Route path="notes" element={<Notes input={input} />} />
              <Route path="quiz" element={<Quiz input={input} />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </Theme>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
