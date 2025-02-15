import axios from "axios";

const BASE = "http://localhost:8000";

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
