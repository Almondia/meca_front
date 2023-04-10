import { MecaTagResponseType } from '@/types/domain';

import DefaultPostBody from './body/DefaultPostBody';
import OxPostBody from './body/OxPostBody';
import SelectPostBody from './body/SelectPostBody';
import { PostBodyComponentType } from './type';

export interface MecaPostContentProps {
  question: string;
  answer: string;
  bodyType: MecaTagResponseType;
}

const ContentBody: Record<MecaTagResponseType, PostBodyComponentType> = {
  MULTI_CHOICE: SelectPostBody,
  DESCRIPTION: DefaultPostBody,
  KEYWORD: DefaultPostBody,
  OX_QUIZ: OxPostBody,
};

const MecaPostContent = ({ question, answer, bodyType }: MecaPostContentProps) => {
  const BodyContent = ContentBody[bodyType];
  return <BodyContent question={question} answer={answer} />;
};

export default MecaPostContent;
