import React, { useState, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { useDrag, useDrop } from 'react-dnd';

import { Text } from 'app/src/styles';
import colors from 'app/src/styles/colors';

import EditCompetitor from 'app/src/components/Competitors/Edit';

import { REMOVE_COMPETITOR } from './queries';

const Container = styled(View)`
  flex-direction: row;
`;

const Seed = styled(Text)`
  width: 32px;
  color: ${colors.disabled};
  font-weight: 800;
`;

const EditButton = styled(Pressable)`
  margin-left: 6px;
`;

const EditIcon = styled(Text)`
  color: orange;
  font-weight: 900;
  font-size: 14px;
`;

const RemoveIcon = styled(Text)`
  color: red;
  font-weight: 900;
  font-size: 14px;
`;

const COMPETITOR = 'competitor';

const Competitor = props => {
  const {
    competitor,
    refetch,
    tournamentStatus,
    moveCompetitor,
    index,
    saveSeeds,
    enableDragDrop,
  } = props;

  const [showEdit, setShowEdit] = useState(false);
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: COMPETITOR,

    // Used as guide:
    // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/04-sortable/simple
    hover: (item, monitor) => {
      if (!ref.current) { return; }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) { return; }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return; }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return; }

      moveCompetitor(item.index, index);
      item.index = index;
    },

    drop: () => {
      saveSeeds();
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: COMPETITOR,
    item: () => ({ index }),
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const opacity = isDragging ? 0 : 1;

  if (enableDragDrop) { drag(drop(ref)); }

  const [removeCompetitor] = useMutation(REMOVE_COMPETITOR, {
    onCompleted: refetch
  });

  const handleRemove = competitor => {
    removeCompetitor({
      variables: { input: { id: competitor.id } }
    });
  };

  return (
    <Container ref={ref} style={{opacity}}>
      <Seed>{competitor.seed}</Seed>
      <Text>{competitor.entity.name}</Text>
      {!['Closed', 'Active'].includes(tournamentStatus) && (
        <>
          <EditButton onPress={() => setShowEdit(true)}>
            <EditIcon>✎</EditIcon>
          </EditButton>
          <EditButton onPress={() => handleRemove(competitor)}>
            <RemoveIcon>🅇</RemoveIcon>
          </EditButton>
        </>
      )}
      {showEdit && (
        <EditCompetitor
          competitor={competitor}
          handleHide={() => setShowEdit(false)}
        />
      )}
    </Container>
  );
};

export default Competitor;
