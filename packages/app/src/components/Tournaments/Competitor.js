import React, { useRef } from 'react';
import { View, Pressable } from 'react-native';
import { useMutation } from '@apollo/client';
import styled from 'styled-components/native';
import { useDrag, useDrop } from 'react-dnd';

import { Text } from 'app/src/styles';

import { REMOVE_COMPETITOR } from './queries';

const Container = styled(View)`
  flex-direction: row;
`;

const RemoveButton = styled(Pressable)`
  margin-left: 6px;
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
      <Text>{competitor.entity.name}</Text>
      {!['Closed', 'Active'].includes(tournamentStatus) && (
        <RemoveButton onPress={() => handleRemove(competitor)}>
          <RemoveIcon>🅇</RemoveIcon>
        </RemoveButton>
      )}
    </Container>
  );
};

export default Competitor;
