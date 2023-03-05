import styled from 'styled-components';

const Text = styled.div`
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

export const TextBodyTitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.main};
  line-height: 1.19rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const TextBodySubtitle = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.sub};
  line-height: 1.06rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

export const TextBody = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.main};
  line-height: 150%;
`;

export const TextSubBody = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.sub};
  line-height: 150%;
`;

export const TextCaption = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.caption};
  line-height: 0.875rem;
  color: ${({ theme }) => theme.gray};
`;

export const TextOverline = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.overline};
  line-height: 0.75rem;
`;
