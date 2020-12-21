import Head from 'next/head';
import withAuth from 'components/withAuth';

const Home = () => (
  <>
    <Head>
      <title>Home</title>
      <meta name="Description" content="NextJS JS Boilerplate"></meta>

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <div>This is a NextJS JS Boilerplate</div>
  </>
);

Home.getLayout = (page) => {};

export default withAuth(Home);
