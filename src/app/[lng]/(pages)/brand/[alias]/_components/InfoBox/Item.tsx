export default function Item({
  title,
  Icon,
  children,
}: {
  title?: string; // eslint-disable-line react/require-default-props
  Icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 flex w-full flex-none gap-x-3">
      <dt className="flex-none">
        {title && <span className="sr-only">{title}</span>}
        <Icon className="h-6 w-5 text-gray-400" aria-hidden="true" />
      </dt>
      <dd className="text-sm font-medium leading-6 text-gray-900">
        {children}
      </dd>
    </div>
  );
}
