import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import styled from 'styled-components/native';

import DataState from 'app/src/components/DataState';
import { Text } from 'app/src/styles';
import { ModalContent } from 'app/src/styles/modal';
import Input from 'app/src/elements/inputs';
import { Button } from 'app/src/elements/buttons';
import ExternalLink from 'app/src/elements/ExternalLink';
import truncate from 'app/src/utils/truncate';

import { UPDATE_COMPETITOR } from './queries';

const SpacedLink = styled(Text)`
  display: block;
  padding-top: 6px;
`;

const EditCompetitor = ({ competitor, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [updateCompetitor] = useMutation(UPDATE_COMPETITOR, {
    onCompleted: handleHide
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      id: competitor.id,
      name: competitor.entity.name || '',
      annotation: competitor.annotation || '',
      url: '',
    }
  });

  const onSubmit = useCallback(input => {
    setSubmitting(true);
    updateCompetitor({ variables: { input } });
  });

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <DataState loading={submitting}>
          <Input.Text
            label="Competitor Name"
            name="name"
            control={control}
            errors={errors}
            rules={{required: true}}
          />
          <Input.Text
            label="Annotation"
            hint="(additional detail, such as year)"
            name="annotation"
            control={control}
          />
          <Input.Text
            label="Add Link"
            name="url"
            control={control}
          />
          {competitor.entity.externalLinks.length > 0 && (
            <>
              <Text>Existing Links:</Text>
              {competitor.entity.externalLinks.map(link => (
                <ExternalLink key={link.id} url={link.url}>
                  <SpacedLink>{truncate(link.url, 60)}</SpacedLink>
                </ExternalLink>
              ))}
            </>
          )}
          <Button label="Save" onPress={handleSubmit(onSubmit)} wide />
          <Button
            type="Cancel"
            onPress={handleHide}
            wide
          />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default EditCompetitor;
