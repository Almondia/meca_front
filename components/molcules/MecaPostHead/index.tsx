import React from 'react';

import MecaTag from '@/components/atoms/MecaTag';
import { TextCaption } from '@/styles/common';
import { MECA_RESPONE_TO_TAG, MecaTagResponseType } from '@/types/domain';

import { MecaPostHeadContent, MecaPostHeadWrapper } from './styled';

export interface MecaPostHeadProps {
  cardType: MecaTagResponseType;
  createdAt: string;
}

const MecaPostHead = ({ cardType, createdAt }: MecaPostHeadProps) => (
  <MecaPostHeadWrapper>
    <MecaPostHeadContent>
      <TextCaption>문제유형</TextCaption>
      <MecaTag tagName={MECA_RESPONE_TO_TAG[cardType]} scale={0.8} />
    </MecaPostHeadContent>
    <MecaPostHeadContent>
      <TextCaption>작성일</TextCaption>
      <TextCaption>{createdAt}</TextCaption>
    </MecaPostHeadContent>
  </MecaPostHeadWrapper>
);

export default MecaPostHead;
