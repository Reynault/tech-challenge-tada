import React from 'react';

export interface Urls {
  landing: string;
  inGame: string;
  viewChallenges: string;
  author: string;
}

export const UrlContext = React.createContext<Urls>({
  landing: '/',
  inGame: '/play/:challengeId',
  viewChallenges: '/challenges',
  author: '/author'
});
