import { ComponentMeta } from '@storybook/react';

import Card from '@/components/molcules/Card';

export default {
  title: 'components/molcules/Card',
  component: Card,
  parameters: {
    componentSubtitle: '카드 컴포넌트',
  },
} as ComponentMeta<typeof Card>;

export const Default = () => (
  <div style={{ maxWidth: '360px', padding: '30px' }}>
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
  <div style={{ maxWidth: '360px', padding: '30px' }}>
    <Card>
      <Card.Title link="/">Card Title</Card.Title>
      <Card.Body>
        <p>No Thumbnail</p>
      </Card.Body>
    </Card>
  </div>
);
