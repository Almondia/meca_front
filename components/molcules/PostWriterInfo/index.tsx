import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import { ModificationBox, PostWriterInfoWrapper, WriterInfoBox } from './styled';

export interface PostWriterInfoProps {
  name: string;
  profile?: string;
  isMine?: boolean;
}

const PostWriterInfo = ({ name, profile, isMine }: PostWriterInfoProps) => (
  <PostWriterInfoWrapper>
    <WriterInfoBox>
      <Image src={profile ?? '/images/noprofile.png'} alt={profile ?? 'profile-image'} width={36} height={36} />
      <p>{name}</p>
    </WriterInfoBox>
    {isMine && (
      <ModificationBox>
        <Link href="/">수정하기</Link>
        <Link href="/">삭제하기</Link>
      </ModificationBox>
    )}
  </PostWriterInfoWrapper>
);

export default PostWriterInfo;
