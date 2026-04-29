import Header from '@components/Header';

export default async function DefaultLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: Languages }>;
}) {
  const { lng } = await params;
  return (
    <>
      <Header lng={lng} />
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-8 pb-12">
        {children}
      </main>
    </>
  );
}
