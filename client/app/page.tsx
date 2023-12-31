import Head from 'next/head';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Meltdown Tracker</title>
        <meta property="og:site_name" content="Meltdown Tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />
        <main className="flex flex-col items-center">
          <Link href='/login' passHref>
            <button>Login</button>
          </Link>
          <Link href='/signup' passHref>
            <button>Signup</button>
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
}
