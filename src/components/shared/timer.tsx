import React, { useCallback, useEffect, useState } from 'react';
import { TimeDisplay } from './time-display';

export interface TimerProviderProps {
  start: boolean;
  startingTime: number;
  delay?: number;
}

/**
 * Timer used to display an ongoing time
 * @param start boolean that indicates when to start
 * @param startingTime time when to start to count
 * @param delay refresh delay
 */
export const Timer: React.FunctionComponent<TimerProviderProps> = ({
  start,
  startingTime,
  delay = 10
}) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  /**
   * Start the timer
   */
  const startCallback = useCallback(() => {
    setTimer(
      setInterval(() => {
        setTime(Date.now() - startingTime);
      }, delay)
    );
  }, [startingTime, setTime, setTimer, delay]);
  /**
   * Stop it
   */
  const stopCallback = useCallback(() => {
    // by changing the timer
    setTimer(null);
  }, [setTimer]);
  /**
   * When the timer is changed, remove the old one.
   * This also clear the current timer if the component is unmounted
   */
  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);
  /**
   * when start is changed, stop or start the timer
   */
  useEffect(() => {
    if (start) {
      startCallback();
    } else {
      stopCallback();
    }
  }, [start, startCallback, stopCallback]);

  return <TimeDisplay {...{ time }} />;
};
