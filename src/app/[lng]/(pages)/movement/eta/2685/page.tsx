import Image from 'next/image';

import Title from '@components/Title';

function Item({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 flex w-full flex-none gap-x-3">
      <dt className="flex-none">{title}:</dt>
      <dd className="text-sm font-medium leading-6 text-gray-900">
        {children}
      </dd>
    </div>
  );
}

export default async function MovementPage() {
  return (
    <>
      <Title title="ETA 2685" />
      <div className="">
        <div className="flex flex-col float-right">
          <Image
            src="/caliber/eta-2685-f.jpg"
            width="256"
            height="256"
            alt="ETA 2685"
            style={{ width: 256 }}
          />
          <Image
            src="/caliber/eta-2685-b.jpg"
            width="256"
            height="256"
            alt="ETA 2685"
            style={{ width: 256 }}
          />
        </div>
        <dl className="flex flex-wrap">
          <Item title="Manufacturer">ETA</Item>
          <Item title="Launch Year">1991</Item>
          <Item title="Is COSC certified">No</Item>
          <Item title="Movement Type">Automatic</Item>
          <Item title="Dimensions">20 mm</Item>
          <Item title="Height">5.35 mm</Item>
          <Item title="Power Reserve">39 hours</Item>
          <Item title="Frequency">28,800 vph</Item>
          <Item title="Jewels">25</Item>
          <Item title="Shape">Round</Item>
          <Item title="Winding Type">Automatic (Self-Winding)</Item>
          <Item title="Winding">Both, 650 per day</Item>
          <Item title="Complications">
            <ul>
              <li>Sweep Second</li>
              <li>Date</li>
              <li>Moon Phase</li>
              <li>Chronograph Stopwatch</li>
            </ul>
          </Item>
        </dl>
      </div>
    </>
  );
}
