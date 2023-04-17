import Image from 'next/image';

import React from 'react';

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
      <Image src={profile || '/images/noprofile.png'} alt={`${name}-profile-image`} width={36} height={36} />
      <p>{name}</p>
    </WriterInfoBox>
    {children}
  </PostWriterInfoWrapper>
);

PostWriterInfo.Modification = ModificationBox;

export default PostWriterInfo;
