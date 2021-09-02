import React from 'react';
import { SimpleModal, SimpleModalProps } from './simple-modal';

export const ChallengeDeletionModal: React.FunctionComponent<SimpleModalProps> = (
  props: SimpleModalProps
) => {
  return (
    <SimpleModal {...props}>
      <p>Deletion</p>
    </SimpleModal>
  );
};
