import Icon from '@/components/common/Icon';
import { IconType } from '@/components/common/Icons';

import { IconTagIconBox, IconTagText, IconTagWrapper } from './styled';

export interface IconTagProps {
  /** [필수] 정해진 아이콘 */
  icon: IconType;
  /** [선택] 배경 색상 - `default: black` */
  tagColor?: string;
  /** [선택] 텍스트 색상 - `default: white` */
  textColor?: string;
  /** [필수] 태그 텍스트 */
  text: string;
  /** [선택] transform: scale - `default: 1` `max: 2` */
  scale?: number;
}

/**
 * 문제 태그를 나타내는 컴포넌트로 여러 종류의 `타입(tagName)`이 정해져있다.
 * - 종류: ox퀴즈, 설명퀴즈, 키워드, 객관식 (문제 종류는 언젠가 추가될 수도 있다.)
 */
const IconTag = ({ icon, text, tagColor, textColor, scale = 1 }: IconTagProps) => (
  <IconTagWrapper scale={Math.min(scale, 2)} bgColor={tagColor}>
    <IconTagIconBox>
      <Icon icon={icon} size="12px" color={tagColor} />
    </IconTagIconBox>
    <IconTagText textColor={textColor}>{text}</IconTagText>
  </IconTagWrapper>
);

export default IconTag;
