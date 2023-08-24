import { ComponentMeta } from '@storybook/react';

import Card from '@/components/@common/molecules/Card';
import CardSkeleton from '@/components/@common/molecules/Card/CardSkeleton';
import { THUMBNAIL_BLUR_URL } from '@/utils/constants';

export default {
  title: 'components/@common/molecules/Card',
  component: Card,
  parameters: {
    componentSubtitle: '카드 컴포넌트',
  },
} as ComponentMeta<typeof Card>;

export const Default = () => (
  <div style={{ maxWidth: '360px' }}>
    <Card>
      <Card.Title link="/">Card Title</Card.Title>
      <Card.Thumbnail src="/images/noimage.png" altText="alt" href="/" />
      <Card.Body>
        <p>Card Body!!</p>
      </Card.Body>
    </Card>
  </div>
);

export const NoThumbnail = () => (
  <div style={{ maxWidth: '360px' }}>
    <Card>
      <Card.Title link="/">Card Title</Card.Title>
      <Card.Body>
        <p>No Thumbnail</p>
      </Card.Body>
    </Card>
  </div>
);

export const WithThumbnailHasSize = () => (
  <div style={{ maxWidth: '360px' }}>
    <Card>
      <Card.Title link="/">WithThumbnailHasSize</Card.Title>
      <Card.Thumbnail
        href="/"
        src="https://github.com/Almondia/meca_front/assets/76927397/dee3c0de-022f-4c3c-a788-394bf0c358fa"
        altText="alt"
        preloadedInfo={{ width: 722, height: 963, blurDataURL: THUMBNAIL_BLUR_URL }}
      />
      <Card.Body>
        <p>real-width: 722, real-height: 963</p>
      </Card.Body>
    </Card>
  </div>
);

export const WithThumbnailHasLongSize = () => (
  <div style={{ maxWidth: '360px' }}>
    <Card>
      <Card.Title link="/">WithThumbnailHasLongSize</Card.Title>
      <Card.Thumbnail
        href="/"
        src="https://github-production-user-asset-6210df.s3.amazonaws.com/76927397/257419512-8d202bdd-36da-4b02-970d-36e52ce2b4cb.png"
        altText="alt"
        preloadedInfo={{ width: 192, height: 960, blurDataURL: THUMBNAIL_BLUR_URL }}
      />
      <Card.Body>
        <p>real-width: 190, real-height: 960</p>
      </Card.Body>
    </Card>
  </div>
);

export const Skeleton = () => (
  <div style={{ maxWidth: '360px' }}>
    <CardSkeleton thumbnailRatio={2} />
  </div>
);
