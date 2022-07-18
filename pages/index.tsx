import type { NextPage } from 'next';
import Head from 'next/head';
import App from '../components/App';

const Home: NextPage = () => {
  return (
    <div className="text-sm md:text-base m-auto max-w-xl md:max-w-3xl flex-col py-4 px-4">
      <Head>
        <title>EZ Split</title>
        <meta
          name="description"
          content="Easily split up your bill with friends"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-6 md:mb-12">
        <App />
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
