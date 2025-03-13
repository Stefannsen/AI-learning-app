import axios from "axios";

// const LOCALHOST_BASE = "http://localhost:8000";
// const DEPLOYMENT_BASE = process.env.PROD_BASE;
// const BASE = LOCALHOST_BASE || DEPLOYMENT_BASE;
const BASE = "https://ai-learning-app-delta.vercel.app";

const api = {
  getNotes: (text) =>
    axios
      .post(`${BASE}/notes`, { data: { text } })
      .then((response) => response.data.data),
  getQuiz: (text) =>
    axios
      .post(`${BASE}/quiz`, { data: { text } })
      .then((response) => response.data.data),
  getFlashCards: (text) =>
    axios
      .post(`${BASE}/flashcards`, { data: { text } })
      .then((response) => response.data.data),
};

export { api };
