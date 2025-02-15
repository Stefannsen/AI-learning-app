import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { api } from "../api";
import { Note } from "./note";
import { Reload } from "../layout/reload";
import { InfoHome } from "../layout/back-home";
import { Spinner } from "../layout/spinner";

const NotesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  min-height: 100%;
  width: 100%;
  padding: 50px 100px;
`;

const Notes = ({ input }) => {
  const [notes, setNotes] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getNotes = useCallback(async () => {
    if (input?.length !== 0) {
      setIsLoading(true);
      try {
        const data = await api.getNotes(input);

        setNotes(data);
      } catch (e) {
        setHasError(true);
      }
      setIsLoading(false);
    }
  }, [input, setIsLoading]);

  const reload = useCallback(() => {
    getNotes();
    setHasError(false);
  }, [getNotes, setHasError]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  if (input?.length === 0) {
    return <InfoHome />;
  }

  if (isLoading) {
    return <Spinner isLoading={true} />;
  }

  if (hasError) {
    return <Reload reload={reload} />;
  }

  return (
    <NotesContainer>
      {notes.map((note) => (
        <Note title={note.title} content={note.description} />
      ))}
    </NotesContainer>
  );
};

export { Notes };
