import { MecaTagWrapper, TagIconBox, TagText } from './styled';
import { MECATAG_VALUES, MecaTagIconType } from './type';

import Icon from '../Icon';

export interface MecaTagProps {
  /** [필수] 정해진 태그이름을 사용할 것 */
  tagName: keyof MecaTagIconType;
  /** [선택] transform: scale - `default: 1` `max: 2` */
  scale?: number;
  /** [선택] 활성화 여부 { true: 투명화 } */
  isNotOpaque?: boolean;
}

/**
 * 문제 태그를 나타내는 컴포넌트로 여러 종류의 `타입(tagName)`이 정해져있다.
 * - 종류: ox퀴즈, 설명퀴즈, 키워드, 객관식 (문제 종류는 언젠가 추가될 수도 있다.)
 */
const MecaTag = ({ tagName, scale = 1, isNotOpaque = false }: MecaTagProps) => (
  <MecaTagWrapper scale={Math.min(scale, 2)} isNotOpaque={isNotOpaque} themeColor={MECATAG_VALUES[tagName].color}>
    <TagIconBox>
      <Icon icon={MECATAG_VALUES[tagName].icon} size="10px" />
    </TagIconBox>
    <TagText>{MECATAG_VALUES[tagName].text}</TagText>
  </MecaTagWrapper>
);

export default MecaTag;
