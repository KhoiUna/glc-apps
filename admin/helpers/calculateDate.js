export default function calculateDate({ dateIndex }) {
  const timeStamp = new Date().getTime();
  return new Date(timeStamp + 24 * 60 * 60 * 1000 * dateIndex);
}
