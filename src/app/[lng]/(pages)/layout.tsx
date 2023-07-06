import Header from '@components/Header';

export default function DefaultLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <>
      <Header lng={lng} />
      <main className="max-w-screen-2xl mx-auto px-6 lg:px-8">{children}</main>
    </>
  );
}
