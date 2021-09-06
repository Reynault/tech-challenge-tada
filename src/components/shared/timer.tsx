import React, { useCallback, useEffect, useState } from 'react';
import { TimeDisplay } from './time-display';

export interface TimerProviderProps {
  start: boolean;
  startingTime: number;
  delay?: number;
}

export const Timer: React.FunctionComponent<TimerProviderProps> = ({
  start,
  startingTime,
  delay = 10
}) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const startCallback = useCallback(() => {
    setTimer(
      setInterval(() => {
        setTime(Date.now() - startingTime);
      }, delay)
    );
  }, [startingTime, setTime, setTimer, delay]);

  const stopCallback = useCallback(() => {
    setTimer(null);
  }, [setTimer]);

  /**
   * Remove old timer when new value or when the timer is changed
   */
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  useEffect(() => {
    if (start) {
      startCallback();
    } else {
      stopCallback();
    }
  }, [start, startCallback, stopCallback]);

  return <TimeDisplay {...{ time }} />;
};
