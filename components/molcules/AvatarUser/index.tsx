import React from 'react';

import Avatar from '@/components/atoms/Avatar';

import { AvatarUsername, AvatarUserWrapper } from './styled';

export interface AvatarUserProps {
  name: string;
  profile?: string;
}

const AvatarUser = ({ name, profile }: AvatarUserProps) => (
  <AvatarUserWrapper>
    <Avatar imgSrc={profile} imgName={name} imgSize={36} />
    <AvatarUsername>{name}</AvatarUsername>
  </AvatarUserWrapper>
);

export default AvatarUser;
