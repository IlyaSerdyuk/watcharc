import { db } from '@/services/Db';

export default async function Home() {
  const brands = await db.brands.limit(10);
  return (
    <main>
      <p>WatchArc</p>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>{brand.title}</li>
        ))}
      </ul>
    </main>
  );
}
