export default function imageLoader({ src, width }) {
  return `${process.env.NEXT_PUBLIC_IMGKIT_IMGKIT_URL_ENDPOINT}/tr:w-${width}${src}`;
}
