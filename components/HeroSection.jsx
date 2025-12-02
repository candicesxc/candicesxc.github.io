import LogoBubbles from "./LogoBubbles";

export default function HeroSection() {
  return (
    <header className="hero">
      <div className="hero-text">
        <h1>I am not the Yale MBA you think of.</h1>
        <p>
          I love the web, marketing, AI, and everything in between. Welcome to my digital playground where I build vibe coded experiments that feel like tiny products, not just demos.
        </p>
      </div>

      <div className="hero-bubbles">
        <LogoBubbles />
      </div>
    </header>
  );
}

