import Head from 'next/head';

interface HeadMetaProps {
  title?: string;
  description?: string;
  image?: string;
  ogType?: 'article' | 'website';
}

function MetaHead({ title, description, image, ogType }: HeadMetaProps) {
  return (
    <Head>
      <title>{title ? `${title} | Meca ` : 'Meca'}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content={description ?? '나(Me)를 위해 기억(Memory)해야 할 것들을 카드로 만들어 학습하고 공유해봐요'}
      />
      <meta property="og:title" content={title ? `${title} | Meca ` : 'Meca'} />
      <meta property="og:site_name" content="Meca" />
      <meta property="og:type" content={ogType ?? 'website'} />
      <meta
        property="og:description"
        content={description ?? '나(Me)를 위해 기억(Memory)해야 할 것들을 카드로 만들어 학습하고 공유해봐요'}
      />
      <meta
        property="og:image"
        content={
          image ||
          'https://user-images.githubusercontent.com/76927397/236601039-26c5e208-ee71-44b9-a50f-8c37ee62c4ef.jpg'
        }
      />
    </Head>
  );
}

export default MetaHead;
