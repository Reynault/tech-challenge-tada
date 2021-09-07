import React from 'react';

/**
 * Method used to display a time in a readable way
 * @param time to display
 */
const parseTime = (time: number): string => {
  if (!!time) {
    const timeString: string = time.toString();
    const seconds =
      timeString.length > 3
        ? timeString.substring(0, timeString.length - 3)
        : '0';
    const milliseconds = timeString.substr(timeString.length - 3, 2);
    return `${seconds}:${milliseconds}`;
  } else {
    // if not set, display a default value
    return `--:--`;
  }
};

export interface TimeDisplayProps {
  time: number;
}

/**
 * Provide a way to display a time in a readable format
 * @param time to display
 */
export const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = ({
  time
}) => {
  return <>{parseTime(time)}</>;
};
