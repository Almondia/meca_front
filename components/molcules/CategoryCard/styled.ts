import styled from 'styled-components';

export const CategoryCardWrapper = styled.div`
  max-width: 350px;
  position: relative;
  border: ${({ theme }) => theme.border.card};
  box-shadow: var(--shadow-normal);
  :hover {
    box-shadow: var(--shadow-bold);
    transition: box-shadow 0.7s ease-in-out;
  }
`;

export const CategoryCardThumbnailSection = styled.div<{ hasValidImage: boolean }>`
  position: relative;
  height: 160px;
  cursor: pointer;
  & > img {
    border-top-right-radius: ${({ theme }) => theme.border.card};
    border-top-left-radius: ${({ theme }) => theme.border.card};
  }
  @media ${({ theme }) => theme.media.mobile} {
    display: ${(props) => !props.hasValidImage && 'none'};
  }
`;

export const CategoryCardInfoSection = styled.div`
  position: relative;
  padding: 24px 24px 16px 24px;
`;

export const ProgressesInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 16px;
  margin-top: 10px;
  & > div {
    min-width: 132px;
  }
  & > p {
    width: 48px;
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;
