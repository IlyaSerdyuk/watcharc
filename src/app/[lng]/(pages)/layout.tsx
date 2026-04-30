import Header from '@components/Header';

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <>
      <Header lng={lng as Languages} />
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-8 pb-12">
        {children}
      </main>
    </>
  );
}
