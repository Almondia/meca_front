import { ContentsBoxBody, ContentsBoxHeader, ContentsBoxWrapper } from './styled';

export interface ContentsBoxBoxProps {
  /** 헤더 */
  header: string;
  /** 컨텐츠 */
  body: React.ReactNode;
  /** 헤더와 컨텐츠를 동일선상에 둘 지 여부  */
  isColumn?: boolean;
}

/**
 * Header 텍스트와 Body 컨텐츠를 가지는 카드형 UI 컴포넌트
 */
const ContentsBox = ({ body, header, isColumn }: ContentsBoxBoxProps) => (
  <ContentsBoxWrapper isColumn={isColumn ?? false}>
    <ContentsBoxHeader isColumn={isColumn ?? false}>{header}</ContentsBoxHeader>
    <ContentsBoxBody>{body}</ContentsBoxBody>
  </ContentsBoxWrapper>
);

export default ContentsBox;
