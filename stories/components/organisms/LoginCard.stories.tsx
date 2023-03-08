import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useRef } from 'react';

import LoginCard from '@/components/organisms/LoginCard';

export default {
  title: 'components/organisms/LoginCard',
  component: LoginCard,
  parameters: {
    componentSubtitle: '소셜 로그인 카드',
  },
} as ComponentMeta<typeof LoginCard>;

const Template: ComponentStory<typeof LoginCard> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const mockClick = () => {
    console.log('mock');
  };
  useEffect(() => {
    ref.current?.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        mockClick();
      },
      { capture: true },
    );
  }, []);
  return (
    <div ref={ref}>
      <LoginCard />
    </div>
  );
};

export const Default = Template.bind({});
