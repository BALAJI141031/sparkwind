import "./index.css";
export default function LandingHero({ hero }) {
  const { mainHero, subHero } = hero;
  return (
    <h1 className="mainhero-text">
      {mainHero}
      <small className="hero-text">{subHero}</small>
    </h1>
  );
}
