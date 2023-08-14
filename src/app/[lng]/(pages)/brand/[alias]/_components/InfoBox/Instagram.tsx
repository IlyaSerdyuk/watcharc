import InstagramIcon from '@components/InstagramIcon';

import Item from './Item';

export default function Instagram({ value }: { value: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <Item title="Instagram" Icon={InstagramIcon}>
      <a
        href={`//instagram.com/${value}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline focus:underline"
      >
        {value}
      </a>
    </Item>
  );
}
