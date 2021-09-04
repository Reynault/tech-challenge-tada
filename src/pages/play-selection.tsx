import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { CardList } from '../components/shared/card-list';
import { ChallengeCard } from '../components/challenge/challenge-card';
import { ManageChallengesButtons } from '../components/challenge/manage-challenges-buttons';
import { PageTitle } from '../components/shared/page-title';
import { PopulateChallenges } from '../components/challenge/populate-challenges';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { globalStyles } from '../shared/styles/globalStyles';

export const PlaySelection: React.FunctionComponent = () => {
  const { state, isChallengesEmpty } = useContext(ChallengesContext);
  const { pageBody } = globalStyles();

  return (
    <Container className={pageBody}>
      <PageTitle {...{ label: 'Select a challenge !' }} />
      {!isChallengesEmpty(state) ? (
        <CardList
          {...{
            dataToDisplay: state,
            howToDisplay: ChallengeCard
          }}
        />
      ) : (
        <PopulateChallenges />
      )}
      <ManageChallengesButtons />
    </Container>
  );
};
