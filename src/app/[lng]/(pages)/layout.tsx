import Header from '@components/Header';

export default function DefaultLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: Languages };
}) {
  return (
    <>
      <Header lng={lng} />
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-8 pb-12">
        {children}
      </main>
    </>
  );
}
