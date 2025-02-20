import Head from 'next/head';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>CORS Tester</title>
        <meta name="description" content="Test CORS and Same-Origin Policy behavior" />
      </Head>

      <div className="min-h-screen font-['Roboto']">
        <header className="bg-primary text-white shadow-mui">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-medium">
              CORS Tester
            </h1>
            <p className="mt-2 text-primary-light text-sm">
              Test how browsers handle cross-origin requests
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </main>

        <footer className="bg-white mt-auto border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-gray-500 text-sm">
            Built with Next.js and Tailwind CSS
          </div>
        </footer>
      </div>
    </>
  );
} 