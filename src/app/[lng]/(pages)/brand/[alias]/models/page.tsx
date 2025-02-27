import { redirect } from 'next/navigation';

type ModelsDefaultPageProps = PageProps<{
  alias: string;
}>;

export default function ModelsDefaultPage({
  params: { lng, alias },
}: ModelsDefaultPageProps) {
  redirect(`/${lng}/brand/${alias}/models/tiles`);
}
