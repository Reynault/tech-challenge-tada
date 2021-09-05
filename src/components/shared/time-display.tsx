import React from 'react';

const parseTime = (time: number): string => {
  const timeString: string = time.toString();
  const seconds =
    timeString.length > 3
      ? timeString.substring(0, timeString.length - 3)
      : '0';
  const milliseconds = timeString.substring(timeString.length - 3);
  return `${seconds}s ${milliseconds}`;
};

export interface TimeDisplayProps {
  time: number;
}

export const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = ({
  time
}) => {
  return <>{parseTime(time)}</>;
};
