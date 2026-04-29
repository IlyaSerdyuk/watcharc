/* eslint-disable react/require-default-props */
import type { IGenerateImageUrl } from '@imgproxy/imgproxy-node';
import { generateImageUrl } from '@imgproxy/imgproxy-node';

type Options = NonNullable<IGenerateImageUrl['options']>;
type Format = Options['format'];

export type ImageProps = {
  className?: string;
  src: string;
  alt: string;
  fill?: boolean;
  imgproxyWidth?: number;
  imgproxyHeight?: number;
} & Omit<Options, 'resize' | 'size' | 'resize_type' | 'dpr' | 'format'>;

const imageS3Backet = process.env.S3_BUCKET;
// The address of your imgproxy server
const imgproxyEndpoint =
  process.env.NEXT_PUBLIC_IMAGES_HOST || 'http://localhost:8080';
// The address of your Next.js server.
// This is used to resolve relative image URLs.
const imgproxyBaseUrl =
  process.env.NEXT_PUBLIC_IMGPROXY_BASE_URL ||
  'http://host.docker.internal:8100';

// eslint-disable-next-line react/function-component-definition
export const Image = ({
  className,
  src,
  alt,
  width,
  height,
  imgproxyWidth,
  imgproxyHeight,
  fill = false,
  ...imgproxyOptions
}: ImageProps) => {
  const resolvedSrc = `s3://${imageS3Backet}/${src}`;
  const fullSrc = new URL(resolvedSrc, imgproxyBaseUrl).toString();
  const escapedSrc = fullSrc
    .replace('%', '%25')
    .replace('?', '%3F')
    .replace('@', '%40');

  const imgproxyUrl = (format: Format, dpr: number) =>
    generateImageUrl({
      endpoint: imgproxyEndpoint,
      url: {
        value: escapedSrc,
        displayAs: 'plain',
      },
      options: {
        resize: {
          width: imgproxyWidth || width,
          height: imgproxyHeight || height,
          resizing_type: fill ? 'fill-down' : 'fit',
        },
        format,
        dpr,
        ...imgproxyOptions,
      },
    });

  const srcSet = (format?: Format) =>
    [`${imgproxyUrl(format, 1)} 1x`, `${imgproxyUrl(format, 2)} 2x`].join(', ');

  const classNames = [className, fill ? 'object-cover' : 'object-contain']
    .filter(Boolean)
    .join(' ');

  if (src.endsWith('.svg')) {
    return (
      <picture>
        <img
          src={imgproxyUrl('svg', 2)}
          alt={alt}
          className={classNames}
          width={width || undefined}
          height={height || undefined}
        />
      </picture>
    );
  }

  return (
    <picture>
      <source srcSet={srcSet('avif')} type="image/avif" />
      <source srcSet={srcSet('webp')} type="image/webp" />
      <img
        src={imgproxyUrl('webp', 2)}
        alt={alt}
        className={classNames}
        width={width || undefined}
        height={height || undefined}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};
