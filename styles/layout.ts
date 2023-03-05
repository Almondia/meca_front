import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled(Flex)`
  flex-direction: column;
`;

export const FlexSpaceBetween = styled(Flex)`
  display: flex;
  justify-content: space-between;
`;

export const FlexColumnCenter = styled(FlexColumn)`
  justify-content: center;
  align-items: center;
`;

export const FlexColumnSpaceBetween = styled(FlexColumn)`
  justify-content: space-between;
`;

export const FlexColumnAlignCenter = styled(FlexColumn)`
  align-items: center;
`;
