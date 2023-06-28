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
  color: var(--color-gray);
`;

export const TextOverline = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.overline};
  line-height: 0.75rem;
`;

export const NonVisibleRadioBox = styled.fieldset`
  position: relative;
  input[type='radio'] {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }
  input[type='radio']:disabled {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }
`;

export const HiddenText = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
