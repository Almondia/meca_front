import React from 'react';

import MecaPostContent from '@/components/molcules/MecaPostContent';
import MecaPostDescription from '@/components/molcules/MecaPostContent/description/MecaPostDescription';
import MecaPostHead from '@/components/molcules/MecaPostHead';
import { MecaType } from '@/types/domain';
import { getRelativeTimeByDateTime } from '@/utils/common';

import { MecaPostWrapper } from './styled';

export type MecaPostProps = Omit<MecaType, 'categoryId' | 'title' | 'cardId'>;

const MecaPost = ({ cardType, question, answer, description, createdAt }: MecaPostProps) => (
  <MecaPostWrapper>
    <MecaPostHead cardType={cardType} createdAt={getRelativeTimeByDateTime(createdAt)} />
    <MecaPostContent question={question} answer={answer} bodyType={cardType} />
    <MecaPostDescription description={description} />
  </MecaPostWrapper>
);

export default React.memo(MecaPost);
