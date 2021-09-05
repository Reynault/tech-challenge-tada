import React, { useCallback, useEffect, useState } from 'react';

export interface TimerContextProps {
  time: number;
  setTime: (newValue: number) => void;

  start: () => void;
  stop: () => void;
  reset: () => void;
  setDelay: (newDelay: number) => void;
}

export const TimerContext: React.Context<TimerContextProps> = React.createContext(
  {
    time: null,
    setTime: null,

    start: null,
    stop: null,
    reset: null,
    setDelay: null
  }
);

export interface TimerProviderProps {
  children: JSX.Element;
}

export const TimerProvider: React.FunctionComponent<TimerProviderProps> = ({
  children
}) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [delay, setDelay] = useState(1);

  const start = useCallback(() => {
    const startTime = Date.now();
    setTimer(
      setInterval(() => {
        const delta = Date.now() - startTime;
        setTime(delta);
      }, delay)
    );
  }, [timer, delay]);

  const stop = useCallback(() => {
    setTimer(null);
  }, [timer]);

  const reset = useCallback(() => {
    setTime(0);
    stop();
  }, [stop]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <TimerContext.Provider
      value={{ time, setTime, start, stop, reset, setDelay }}
    >
      {children}
    </TimerContext.Provider>
  );
};
