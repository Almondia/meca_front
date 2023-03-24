import { useRouter } from 'next/router';

import React from 'react';

import Button from '@/components/atoms/Button';

import { CardControlComponentsContainer, CardControlWrapper } from './styled';

export interface CardControlProps {
  categoryId: string;
}

const CardControl = ({ categoryId }: CardControlProps) => {
  const router = useRouter();
  return (
    <CardControlWrapper>
      <CardControlComponentsContainer>
        {/* TODO: UI 넣을 것 */}
        &nbsp;
      </CardControlComponentsContainer>
      <CardControlComponentsContainer>
        <Button colorTheme="primary" onClick={() => router.push(`/me/write/${categoryId}`)}>
          추가하기 +
        </Button>
        <Button colorTheme="success" onClick={() => console.log(categoryId)}>
          <Button.RightIcon icon="Play" />
          <Button.InnerText>플레이</Button.InnerText>
        </Button>
      </CardControlComponentsContainer>
    </CardControlWrapper>
  );
};

export default React.memo(CardControl);
