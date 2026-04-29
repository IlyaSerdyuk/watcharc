import { redirect } from 'next/navigation';

type ModelsDefaultPageProps = PageProps<{
  alias: string;
}>;

export default async function ModelsDefaultPage({
  params,
}: ModelsDefaultPageProps) {
  const { lng, alias } = await params;
  redirect(`/${lng}/brand/${alias}/models/tiles`);
}
