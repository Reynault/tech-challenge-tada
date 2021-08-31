import React from 'react';

export interface CardProps {
  firstname: string;
  lastname: string;
}

export const Card: React.FunctionComponent<CardProps> = (props: CardProps) => {
  return (
    <p>
      Hello there: {props.firstname} {props.lastname}
    </p>
  );
};
