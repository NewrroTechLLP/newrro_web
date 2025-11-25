"use client";

// Example client logos. Replace with actual paths to your logo images.
const clients = [
  { name: "JSSATEB", logo: "/assets/logos/ihfc.webp" },
  { name: "JSSATEB", logo: "/assets/logos/jssate.png" },
  { name: "NMIT", logo: "/assets/logos/nitte.png" },
  { name: "BMSCE", logo: "/assets/logos/bmsce.png" },
  { name: "BIT", logo: "/assets/logos/BIT.webp" },
  { name: "Reva University", logo: "/assets/logos/reva.png" },
  { name: "VSU", logo: "/assets/logos/vsu.png" },
  { name: "Sir MVIT", logo: "/assets/logos/smvit.png" },
  { name: "IEEE RAS", logo: "/assets/logos/ieee.jpg" },
  { name: "Amrita", logo: "/assets/logos/avvp.svg" },
];

export function ClientTrustSection() {
  const allClients = [...clients, ...clients]; // Duplicate for smooth looping

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold text-muted-foreground">
          Trusted by Leading Academic Institutions
        </h2>
        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
            {allClients.map((client, index) => (
              <img key={index} src={client.logo} alt={client.name} className="mx-8 h-12 w-auto flex-shrink-0 object-contain" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// In your globals.css, add the animation keyframes for the marquee:
// @keyframes scroll { to { transform: translate(calc(-50% - 2rem)); } }
// .animate-scroll { animation: scroll 40s linear infinite; }