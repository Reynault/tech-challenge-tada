import React from 'react';
import { SimpleModal, SimpleModalProps } from './simple-modal';

export const ChallengeInsertionModal: React.FunctionComponent<SimpleModalProps> = (
  props: SimpleModalProps
) => {
  return (
    <SimpleModal {...props}>
      <p>Insertion/Update</p>
    </SimpleModal>
  );
};
