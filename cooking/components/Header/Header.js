import Link from "next/link";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1>
          <FontAwesomeIcon icon={faUtensils} id="header-icon" />
          GLC COOKING RESERVATION
        </h1>
      </Link>
    </header>
  );
}
