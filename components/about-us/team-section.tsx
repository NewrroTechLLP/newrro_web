"use client";
import { motion, Variants } from "framer-motion";

// Replace with next/image, only if you prefer static import for real images
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-fuchsia-600 via-indigo-700 to-violet-900 shadow-lg border-4 border-fuchsia-400/30 text-4xl font-bold text-white select-none">
    {name
      .split(" ")
      .map((n) => n[0])
      .join("")}
  </div>
);

const founders = [
  { name: "Nikhil U", role: "Creative and Design lead" },
  { name: "Basavaraja HM", role: "Specialist in autonomous mobile Robots" },
  { name: "Bindusagar MG", role: "Expert in lab infrastructure and project management" }
];
const partners = [
  { name: "Samarth S", role: "Programming Lead, expert in ROS and AMR" },
  { name: "Pruthvi D", role: "Operations manager" }
];
const advisors = [
  { name: "Dr. Prashanth", role: "IEEE RAS vice-chair, Bangalore & Robotics HOD, NMIT" },
  { name: "Dr. Kiran MC", role: "Founder & Advisor" },
  { name: "Dr. Venkateshvar", role: "Ex-DRDO scientist, expert" },
  { name: "Dr. Tengli", role: "Ex-DRDO scientist, expert" }
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } }
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#070013] via-black to-[#160020] py-32">
      {/* Animated Gradient Blob & Starfield */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute left-1/2 top-24 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#d500f9_0%,#6200ea_60%,#ff57dd_100%)] blur-[180px]"
        />
        <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-30" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text drop-shadow-md">
            Meet&nbsp;Our&nbsp;<span className="text-fuchsia-500 bg-clip-text">Experts</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-slate-300/90 rounded-lg bg-slate-800/30 p-4 backdrop-blur">
            A powerhouse team bridging cutting-edge research <br/>and real-world deployment — united by an obsession for redefining what robots can do.
          </p>
        </motion.div>

        {/* Founders */}
        <SectionGrid title="Founding Partners" items={founders} columns="lg:grid-cols-3" highlight />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-12">
          <SectionGrid title="Partners" items={partners} columns="sm:grid-cols-2" />
          <AdvisorsGrid items={advisors} />
        </div>
      </div>
    </section>
  );
}

function SectionGrid({
  title,
  items,
  columns,
  highlight = false
}: {
  title: string;
  items: typeof founders;
  columns: string;
  highlight?: boolean;
}) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-20">
      <motion.h3
        variants={fadeUp}
        className={
          "mb-10 text-center text-3xl font-extrabold tracking-wider" +
          (highlight
            ? " bg-gradient-to-r from-fuchsia-500 via-violet-400 to-indigo-400 text-transparent bg-clip-text"
            : " text-fuchsia-300")
        }
      >
        {title}
      </motion.h3>
      <div className={`grid grid-cols-1 gap-12 ${columns}`}>
        {items.map((person) => (
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.03 }}
            className="group relative h-full rounded-3xl border border-slate-700/60 bg-slate-900/60 p-8 shadow-[0_2px_24px_0_rgba(254,43,255,0.07)] hover:shadow-[0_4px_36px_0_rgba(210,85,255,0.18)] backdrop-blur-[2px] transition-all duration-300"
            key={person.name}
          >
            {/* Placeholder Avatar (initials with neon background) */}
            <div className="flex items-center justify-center mb-8">
              <Placeholder name={person.name} />
            </div>
            <h4 className="text-2xl md:text-2xl font-semibold text-white text-center">{person.name}</h4>
            <p className="mt-2 text-center text-slate-400">{person.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AdvisorsGrid({ items }: { items: typeof advisors }) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <motion.h3
        variants={fadeUp}
        className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-blue-400 text-transparent bg-clip-text"
      >
        Advisors
      </motion.h3>
      <div className="grid grid-cols-2 gap-10">
        {items.map((person) => (
          <motion.div
            key={person.name}
            variants={fadeUp}
            className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-[0_2px_12px_0_rgba(180,170,255,0.08)] backdrop-blur-[2px]"
          >
            <Placeholder name={person.name} />
            <div>
              <h4 className="font-semibold text-white text-lg">{person.name}</h4>
              <p className="text-sm text-fuchsia-300">{person.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
