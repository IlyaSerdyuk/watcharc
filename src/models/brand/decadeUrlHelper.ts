export default function decadeUrlHelper(
  century: string,
  decade: string,
  lng?: Languages,
) {
  const prefix = '/brands/founded/';
  const path =
    decade === 'unknown' ? `${century}xx` : `${decade.substring(0, 3)}x`;
  return `${lng ? `/${lng}` : ''}${prefix}${path}`;
}
