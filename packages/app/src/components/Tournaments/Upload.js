import React, { useCallback, useState } from 'react';
import Modal from 'react-native-modal';
import { useMutation } from '@apollo/client';
import Papa from 'papaparse';

import DataState from 'app/src/components/DataState';
import { Subtitle, Text } from 'app/src/styles';
import { ModalContent } from 'app/src/styles/modal';
import { Button } from 'app/src/elements/buttons';

import { CREATE_COMPETITORS } from './queries';

const Upload = ({ tournament, refetch, handleHide }) => {
  const [submitting, setSubmitting] = useState();

  const [createCompetitors] = useMutation(CREATE_COMPETITORS, {
    onCompleted: () => {
      handleHide();
      refetch();
    }
  });

  const handleUpload = useCallback(e => {
    setSubmitting(true);

    Papa.parse(event.target.files[0], {
      header: true,
      transformHeader: header => header.toLowerCase().trim(),
      dynamicParsing: true,
      skipEmptyLines: true,
      complete: results => {
        const competitorsAttributes = results.data.map(parsed => {
          const { name, annotation, seed, link } = parsed;
          return { name, annotation, seed, urls: [link] };
        });

        createCompetitors({
          variables: {
            input: {
              tournamentId: tournament.id,
              competitorsAttributes
            }
          }
        });
      },
    });
  });

  return (
    <Modal isVisible avoidKeyboard onBackdropPress={handleHide}>
      <ModalContent>
        <Subtitle>
          Upload a CSV
        </Subtitle>
        <DataState loading={submitting}>
          <Text>
            CSV file can have the following headers: Name, Annotation, Link,
            Seed. Only Name is required.
          </Text>
          <input type="file" onChange={handleUpload} accept=".csv" />
          <Button type="Cancel" onPress={handleHide} wide />
        </DataState>
      </ModalContent>
    </Modal>
  );
};

export default Upload;
