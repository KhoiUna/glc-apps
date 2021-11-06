import sponsorStyles from "../styles/sponsor.module.css";

export default function SponsorImg({ imgSrc, instaUsername, instaLink }) {
  return (
    <div className={sponsorStyles.sponsor_card}>
      <div style={{ margin: "auto", width: "6rem" }}>
        <img
          src={imgSrc}
          className={sponsorStyles.sponsor_img}
          alt={`${instaUsername}'s avatar'`}
        />
      </div>

      <a
        href={instaLink}
        target="_blank"
        rel="noopener noreferrer"
        className={sponsorStyles.insta_link}
      >
        <p className={sponsorStyles.insta_username}>{instaUsername}</p>
      </a>
    </div>
  );
}
