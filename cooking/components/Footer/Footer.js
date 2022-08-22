import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ fontWeight: "bold" }}>
      &copy; {new Date().getFullYear()} A product of{" "}
      <Link href={"https://www.khoiuna.info"} passHref>
        <a target={"_blank"} style={{ color: "#000" }}>
          Khoi Nguyen
        </a>
      </Link>
    </footer>
  );
}
