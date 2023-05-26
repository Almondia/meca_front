import React from 'react';

import Avatar from '@/components/atoms/Avatar';

import { ModificationBoxWrapper, PostWriterInfoWrapper, WriterInfoBox } from './styled';

export interface PostWriterInfoProps {
  name: string;
  profile?: string;
  children?: React.ReactNode;
}

const ModificationBox = ({ children }: { children: React.ReactNode }) => (
  <ModificationBoxWrapper>{children}</ModificationBoxWrapper>
);

const PostWriterInfo = ({ name, profile, children }: PostWriterInfoProps) => (
  <PostWriterInfoWrapper>
    <WriterInfoBox>
      <Avatar imgSrc={profile} imgName={name} imgSize={36} />
      <p>{name}</p>
    </WriterInfoBox>
    {children}
  </PostWriterInfoWrapper>
);

PostWriterInfo.Modification = ModificationBox;

export default PostWriterInfo;
