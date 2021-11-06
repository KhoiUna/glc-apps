import SponsorImg from "../components/SponsorImg";
import Layout from "../containers/layout";
import sponsorStyles from "../styles/sponsor.module.css";
import Link from "next/link";
import homeStyles from "../styles/home.module.css";
import Typography from "@material-ui/core/Typography";

export default function Sponsor({}) {
  const sponsorArray = [
    {
      imgSrc: "/img/una.jpg",
      instaUsername: "@una_intl",
      instaLink: "https://www.instagram.com/una_intl/",
    },
    {
      imgSrc: "/img/ken.jpg",
      instaUsername: "@kentaro1575",
      instaLink: "https://www.instagram.com/kentaro1575/",
    },
  ];

  return (
    <Layout componentName="Sponsor">
      <section style={{ margin: "0 0.9rem", lineHeight: "2.3rem" }}>
        <h1 className={sponsorStyles.sponsor_title}>
          There is a small cost to keep this app running.
          <div style={{ margin: "0.5rem" }}>
            Thanks to our sponsorships, Rice Hall is more organized!
          </div>
          <div style={{ margin: "0.5rem 0" }}>
            Check out their Instagram page!
          </div>
        </h1>
      </section>

      {/* <nav className={homeStyles.home_nav}>
        <ul>
          <li className={homeStyles.home_nav_li}>
            <Link href="/apply">
              <p>{">>"} Apply to be a sponsor!</p>
            </Link>
          </li>
        </ul>
      </nav> */}

      <div className={sponsorStyles.sponsor_flex}>
        {sponsorArray.map((item, index) => (
          <SponsorImg
            key={index}
            imgSrc={item.imgSrc}
            instaUsername={item.instaUsername}
            instaLink={item.instaLink}
          />
        ))}
      </div>
    </Layout>
  );
}
