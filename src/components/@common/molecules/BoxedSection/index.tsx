import SectionBody from '@/components/@common/atoms/SectionBody';
import SectionTitle from '@/components/@common/atoms/SectionTitle';
import { BoxedSectionWrapper } from '@/components/@common/molecules/BoxedSection/styled';

interface BoxedSectionProps {
  header: React.ReactNode;
  body: React.ReactNode;
  isColumn?: boolean;
}

const BoxedSection = ({ body, header, isColumn }: BoxedSectionProps) => (
  <BoxedSectionWrapper isColumn={isColumn ?? false}>
    <SectionTitle>{header}</SectionTitle>
    <SectionBody boxed={false} indented={false}>
      {body}
    </SectionBody>
  </BoxedSectionWrapper>
);

export default BoxedSection;
