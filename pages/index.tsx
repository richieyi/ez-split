import type { NextPage } from 'next';
import Head from 'next/head';
import EZSplit from '../components/EZSplit';

const Home: NextPage = () => {
  return (
    <div className="font-mono text-sm md:text-base m-auto max-w-xl flex-col py-8 px-4">
      <Head>
        <title>EZ Split</title>
        <meta
          name="description"
          content="Easily split up your bill with friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <EZSplit />
      </main>

      <footer>
        <span>
          Created by{' '}
          <a
            className="text-blue-500"
            href="https://github.com/richieyi"
            target="_blank"
            rel="noopener noreferrer"
          >
            Richie Yi
          </a>
          .
        </span>
      </footer>
    </div>
  );
};

export default Home;
