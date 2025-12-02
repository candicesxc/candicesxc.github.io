const logos = [
  { src: "/logos/yalesom.svg", alt: "Yale SOM", className: "bubble bubble-1" },
  { src: "/logos/microsoft.png", alt: "Microsoft", className: "bubble bubble-2" },
  { src: "/logos/attentive.png", alt: "Attentive", className: "bubble bubble-3" },
  { src: "/logos/starburst.png", alt: "Starburst", className: "bubble bubble-4" },
  { src: "/logos/materialize.jpeg", alt: "Materialize", className: "bubble bubble-5" },
  { src: "/logos/nyu.png", alt: "NYU", className: "bubble bubble-6" },
];

export default function LogoBubbles() {
  return (
    <div className="logo-bubbles-wrapper">
      {logos.map((logo) => (
        <div key={logo.alt} className={logo.className}>
          <img src={logo.src} alt={logo.alt} />
        </div>
      ))}
    </div>
  );
}

