import getInnerComponents from '@/utils/getInnerComponent.s';

import {
  ControlLeftBox,
  ControlLeftBoxComponentType,
  ControlRightBox,
  ControlRightBoxComponentType,
} from './inner/ControlInnerBox';
import { BetweenSectionWrapper } from './styled';

const BetweenSection = ({ children }: { children: React.ReactNode }) => {
  const leftBox = getInnerComponents(children, ControlLeftBoxComponentType);
  const rightBox = getInnerComponents(children, ControlRightBoxComponentType);
  return (
    <BetweenSectionWrapper>
      {!leftBox ? <div>&nbsp;</div> : leftBox}
      {rightBox}
    </BetweenSectionWrapper>
  );
};

BetweenSection.Left = ControlLeftBox;
BetweenSection.Right = ControlRightBox;

export default BetweenSection;
