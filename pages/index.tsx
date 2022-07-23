import type { NextPage } from 'next';
import Head from 'next/head';
import App from '../components/App';

const Home: NextPage = () => {
  return (
    <div className="text-sm md:text-base m-auto max-w-xl md:max-w-5xl flex-col py-4 px-4">
      <Head>
        <title>EZ Split</title>
        <meta
          name="description"
          content="Easily split bills with friends."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mb-6 md:mb-12">
        <h1 className="text-center text-4xl font-bold my-4">
          EZ Split ✔️
        </h1>
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
