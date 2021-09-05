import React from 'react';

const parseTime = (time: number): string => {
  if (!!time) {
    const timeString: string = time.toString();
    const seconds =
      timeString.length > 3
        ? timeString.substring(0, timeString.length - 3)
        : '0';
    const milliseconds = timeString.substr(timeString.length - 3, 2);
    return `${seconds}s ${milliseconds}`;
  } else {
    return `0s 0`;
  }
};

export interface TimeDisplayProps {
  time: number;
}

export const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = ({
  time
}) => {
  return <>{parseTime(time)}</>;
};
