import getInnerComponents from '@/utils/getInnerComponent.s';

import { CardBody, CardBodyComponentType } from './inner/CardBody';
import { CardThumbnail, CardThumbnailComponentType } from './inner/CardThumbnail';
import { CardTitle, CardTitleComponentType } from './inner/CardTitle';
import { CardBodyWrapper, CardWrapper } from './styled';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  const cardTitle = getInnerComponents(children, CardTitleComponentType);
  const cardThumbnail = getInnerComponents(children, CardThumbnailComponentType);
  const cardBody = getInnerComponents(children, CardBodyComponentType);

  return (
    <CardWrapper>
      {cardThumbnail}
      <CardBodyWrapper>
        {cardTitle}
        {cardBody}
      </CardBodyWrapper>
    </CardWrapper>
  );
};

Card.Title = CardTitle;
Card.Thumbnail = CardThumbnail;
Card.Body = CardBody;

export default Card;
