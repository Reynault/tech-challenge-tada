import { Button } from '@material-ui/core';
import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DialogContext } from '../../contexts/dialog-context';
import { Routes } from '../../shared/constants/routes';
import { ChallengeDto } from '../../shared/dto/challenge-dto';
import { globalStyles } from '../../shared/styles/globalStyles';
import { DeleteChallengeForm } from './delete-challenge-form';
import { UpdateChallengeForm } from './update-challenge-form';

export const ManageOneChallengeButtons: React.FunctionComponent<ChallengeDto> = (
  challenge: ChallengeDto
) => {
  const { showModal } = useContext(DialogContext);
  const { thirdColor } = globalStyles();
  const openUpdateModal = useCallback(() => {
    showModal(<UpdateChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);
  const openDeleteModal = useCallback(() => {
    showModal(<DeleteChallengeForm {...{ challenge }} />);
  }, [showModal, challenge]);

  return (
    <>
      <Button
        variant="contained"
        className={thirdColor}
        component={Link}
        to={`${Routes.PLAY_SELECTION}/${challenge.name}`}
      >
        Play
      </Button>
      <Button onClick={openUpdateModal} color="primary" variant="contained">
        Update
      </Button>
      <Button onClick={openDeleteModal} color="secondary" variant="contained">
        Delete
      </Button>
    </>
  );
};
