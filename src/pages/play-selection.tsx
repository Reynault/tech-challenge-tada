import { Container } from '@material-ui/core';
import React, { useContext } from 'react';
import { ChallengeCard } from '../components/challenge/challenge-card';
import { ChallengeList } from '../components/challenge/challenge-list';
import { ManageChallengesButtons } from '../components/challenge/manage-challenges-buttons';
import { PopulateChallengesButton } from '../components/challenge/populate-challenges-button';
import { PageTitle } from '../components/shared/page-title';
import { ChallengesContext } from '../contexts/challenges/challenges-context';
import { DialogProvider } from '../contexts/dialog-context';
import { globalStyles } from '../shared/styles/globalStyles';

/**
 * Challenge selection page
 */
export const PlaySelection: React.FunctionComponent = () => {
  const { state, isChallengesEmpty } = useContext(ChallengesContext);
  const { pageBody } = globalStyles();
  return (
    <Container className={pageBody}>
      <PageTitle {...{ label: 'Select a challenge !' }} />
      {!isChallengesEmpty() ? (
        <ChallengeList
          {...{
            challenges: state,
            howToDisplay: ChallengeCard
          }}
        />
      ) : (
        // If challenges is empty, display a way
        // to populate quickly the list
        <PopulateChallengesButton />
      )}
      {/* Context that provides a dialog to show or hide */}
      <DialogProvider>
        <ManageChallengesButtons />
      </DialogProvider>
    </Container>
  );
};
