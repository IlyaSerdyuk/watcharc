export default function Title({ title }: { title: React.ReactNode }) {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
    </div>
  );
}
