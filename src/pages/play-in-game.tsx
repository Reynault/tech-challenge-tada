import {
  Box,
  Button,
  Container,
  makeStyles,
  Typography
} from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { Routes } from '../shared/constants/routes';
import { globalStyles } from '../shared/styles/globalStyles';

const playStyle = makeStyles(theme => ({
  correctTypedText: {
    color: '#4caf50'
  },
  incorrectTypedText: {
    color: '#f44336'
  },
  typingZone: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    padding: '1%'
  },
  blurred: {
    color: 'transparent',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.75)'
  }
}));

export const PlayInGame: React.FunctionComponent = () => {
  const { centeredElement } = globalStyles();
  const {
    typingZone,
    blurred,
    correctTypedText,
    incorrectTypedText
  } = playStyle();
  const { getOne, state } = useContext(ChallengesContext);
  const { challengeId }: any = useParams();
  // fetching wanted challenge
  const challenge = getOne(state, challengeId);

  // states of time and error
  const [launched, setLaunched] = useState(false);
  const [time, setTime] = useState(0);
  const [error, setError] = useState(0);
  // text contained in the typing text area
  const [typedText, setTypedText] = useState(<></>);
  const [textToType, setTextToType] = useState(challenge.text);
  const [alreadyTyping, setAlreadyTyping] = useState(false);

  const reset = useCallback(() => {
    setLaunched(false);
    setTime(0);
    setError(0);
    setTypedText(<></>);
    setTextToType(challenge.text);
  }, [setTime, setError, setTypedText, setTextToType, setLaunched]);

  const launchGame = useCallback(() => {
    setLaunched(true);
  }, [setLaunched]);

  // keyboard listener
  const listener = useCallback(
    (event: KeyboardEvent) => {
      console.log('listening');
      if (!alreadyTyping) {
        console.log('ty');
        setAlreadyTyping(true);
        const typedKey = event.key;
        const keyToType = textToType[0];
        if (typedKey === keyToType) {
          setTypedText(
            <>
              {typedText}
              <span className={correctTypedText}>{keyToType}</span>
            </>
          );
        } else {
          setTypedText(
            <>
              {typedText}
              <span className={incorrectTypedText}>{keyToType}</span>
            </>
          );
          setError(error + 1);
        }
        setTextToType(textToType.substring(1));
        setAlreadyTyping(false);
      }
    },
    [
      setError,
      error,
      typedText,
      setTypedText,
      textToType,
      setTextToType,
      alreadyTyping,
      setAlreadyTyping
    ]
  );

  // keyboard remover
  const removeListener = useCallback(listener => {
    document.body.removeEventListener('keypress', listener);
  }, []);

  // when listener is redefined, adding that listener
  // to key press event
  useEffect(() => {
    if (launched) {
      document.body.addEventListener('keypress', listener);
    }
    return () => {
      // remove when unmount or when new redefinition
      removeListener(listener);
    };
  }, [listener, launched]);

  return (
    <Container>
      <Box>
        <Typography variant="h3" className={centeredElement}>
          Playing {challenge.name}
        </Typography>
      </Box>
      <Box className={`${typingZone}`}>
        <Typography variant="h5">
          {typedText}
          {textToType}
        </Typography>
      </Box>
      <Box>
        <Button
          disabled={launched}
          onClick={launchGame}
          color={'primary'}
          variant={'outlined'}
        >
          Start
        </Button>
        <Button
          disabled={!launched}
          onClick={reset}
          color={'primary'}
          variant={'outlined'}
        >
          Reset
        </Button>
        <Button
          component={Link}
          to={Routes.PLAY_SELECTION}
          color={'secondary'}
          variant={'outlined'}
        >
          Cancel game
        </Button>
        <Typography>Timer: {time}</Typography>
        <Typography>Errors: {error}</Typography>
      </Box>
    </Container>
  );
};
