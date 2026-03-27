"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { MapPin, Trophy, Clock, Flame } from "lucide-react";
import Image from "next/image";

/* ─── Logo with graceful fallback ─── */
function LogoWithFallback({ className = "" }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <p
        className={`text-3xl sm:text-4xl font-bold tracking-tight ${className}`}
        style={{ fontFamily: "var(--font-display)", color: "var(--primary)" }}
      >
        Nanis Burger
      </p>
    );
  }

  return (
    <Image
      src="/logo-nanis.png"
      alt="Nanis Burger"
      width={200}
      height={100}
      className={`h-auto w-[160px] sm:w-[200px] drop-shadow-[0_0_30px_oklch(0.72_0.1_70/0.3)] ${className}`}
      priority
      onError={() => setImgError(true)}
    />
  );
}

/* ─── Ingredient Data ─── */
const ingredients = [
  {
    name: "Pan de Fermento de Piña",
    description:
      "Masa fermentada con piña de El Hierro, untada con mantequilla de piña y coronada con piña deshidratada crujiente.",
    image: "/images/pan-artesanal.jpg",
    accent: "var(--pina)",
  },
  {
    name: "Cochino Negro a Baja Temperatura",
    description:
      "Panza de cochino negro herreño, asada lentamente durante horas hasta deshacerse. Enfriada, rebanada y calentada al momento.",
    image: "/images/cochino-negro.jpg",
    accent: "var(--accent)",
  },
  {
    name: "Queso Herreño Curado",
    description:
      "Galleta crujiente de queso herreño curado — medalla de plata en el Mundial de Quesos. Sabor intenso, textura única.",
    image: "/images/queso-herreno.jpg",
    accent: "var(--primary)",
  },
  {
    name: "Barbacoa de Higos Pasados",
    description:
      "Salsa barbacoa artesanal elaborada con higos pasados de El Hierro. Dulzura natural con profundidad ahumada.",
    image: "/images/higos-pasados.jpg",
    accent: "var(--ember)",
  },
  {
    name: "Mayonesa de Mojo Canario",
    description:
      "Nuestra mayonesa casera fusionada con mojo canario — el toque picante que une todos los sabores de la isla.",
    image: "/images/mojo-canario.jpg",
    accent: "oklch(0.55 0.15 25)",
  },
  {
    name: "Piña Deshidratada",
    description:
      "Chips de piña herreña deshidratada como topping final. Crujiente, dulce y tropical sobre cada bocado.",
    image: "/images/pina-deshidratada.jpg",
    accent: "var(--pina-dim)",
  },
];

/* ─── Video Background Component ─── */
function VideoBackground({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "200px" });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView && ref.current) {
      ref.current.src = src;
      ref.current.load();
    }
  }, [inView, src]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onCanPlay={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ playbackRate: 0.8 } as React.CSSProperties}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/70" />
    </div>
  );
}

/* ─── Section: Hero ─── */
function Hero() {
  const videoExists = true; // Will gracefully fallback if video doesn't load

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video or gradient background */}
      {videoExists ? (
        <VideoBackground
          src="/videos/hero-bread.mp4"
          poster="/images/pan-artesanal.jpg"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-1" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 50%, oklch(0.72 0.1 70 / 0.4), transparent 60%), radial-gradient(ellipse at 70% 30%, oklch(0.55 0.18 35 / 0.3), transparent 50%)",
            }}
          />
        </>
      )}

      {/* Floating ember particles */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 4,
              height: 3 + Math.random() * 4,
              background: `oklch(0.72 0.1 70 / ${0.3 + Math.random() * 0.4})`,
              left: `${15 + Math.random() * 70}%`,
              bottom: `${10 + Math.random() * 30}%`,
            }}
            animate={{
              y: [0, -120 - Math.random() * 200],
              opacity: [0, 0.8, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Logo — shows image if exists, text fallback otherwise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <LogoWithFallback className="mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
            <Trophy className="h-3.5 w-3.5" />
            <span>1er Premio Ruta de Tapas 2019</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="block text-foreground">Hamburguesa</span>
          <span
            className="block glow-ember-text"
            style={{ color: "var(--primary)" }}
          >
            Herreña
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Seis ingredientes herreños en una creación única.
          <br />
          Pan de piña, cochino negro, queso curado premiado y barbacoa de higos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#ingredientes"
            className="glow-ember inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/20"
          >
            <Flame className="h-4 w-4" />
            Descubre los Ingredientes
          </a>
          <a
            href="#concurso"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-base font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary backdrop-blur-sm"
          >
            <MapPin className="h-4 w-4" />
            El Concurso
          </a>
        </motion.div>

        {/* Nanis Burger credit */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 text-xs uppercase tracking-[0.25em] text-muted-foreground/60"
        >
          Una creación de Nanis Burger — El Hierro, Canarias
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-1 to-transparent z-[3]" />
    </section>
  );
}

/* ─── Section: La Historia ─── */
function Historia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="historia" className="relative bg-surface-1 px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background landscape image */}
      <div className="absolute inset-0">
        <Image
          src="/images/el-hierro-paisaje.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          sizes="100vw"
        />
      </div>

      <div ref={ref} className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            La Historia
          </span>
          <h2
            className="mt-4 text-3xl leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nacida del volcán,
            <br />
            <span style={{ color: "var(--primary)" }}>forjada con tradición</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          <p>
            El Hierro es la isla más pequeña y salvaje de Canarias. Volcánica,
            aislada, auténtica. Sus productos no se parecen a nada: piñas
            tropicales que crecen entre lava, cochinos negros criados en
            libertad, quesos curados premiados en el mundo entero, higueras
            centenarias que dan frutos extraordinarios.
          </p>
          <p>
            La <strong className="text-foreground">Hamburguesa Herreña</strong>{" "}
            nació de una pregunta simple: ¿y si cada ingrediente contara la
            historia de esta isla? El pan no es pan — es fermento de piña
            herreña. La carne no es carne — es cochino negro asado durante
            horas. La salsa no es kétchup — es barbacoa de higos pasados
            centenarios.
          </p>
          <p>
            Cada bocado es un viaje por El Hierro. Cada ingrediente, un homenaje
            a los productores que mantienen viva esta tierra volcánica.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="divider-ember mx-auto mt-16 max-w-md"
        />
      </div>
    </section>
  );
}

/* ─── Section: Ingredientes ─── */
function Ingredientes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="ingredientes" className="relative px-6 py-24 sm:py-32 overflow-hidden">
      {/* Video background for BBQ atmosphere */}
      <VideoBackground
        src="/videos/bbq-smoke.mp4"
        poster="/images/cochino-negro.jpg"
        className="opacity-30"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            6 Ingredientes Herreños
          </span>
          <h2
            className="mt-4 text-3xl leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Cada capa,{" "}
            <span style={{ color: "var(--primary)" }}>una historia</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative overflow-hidden rounded-lg border border-border/50 bg-surface-1/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-surface-2/80"
            >
              {/* Ingredient image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/20 to-transparent" />
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                  style={{ background: `radial-gradient(circle at center, ${item.accent}, transparent 70%)` }}
                />
              </div>

              <div className="p-5">
                {/* Accent line */}
                <div
                  className="mb-3 h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{ background: item.accent }}
                />
                <h3
                  className="text-lg font-semibold text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Section: El Concurso ─── */
function Concurso() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="concurso" className="relative bg-surface-1 px-6 py-24 sm:py-32">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.1 70 / 0.5), transparent 70%)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            El Concurso
          </span>
          <h2
            className="mt-4 text-3xl leading-tight tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Concurso de Hamburguesas
            <br />
            <span style={{ color: "var(--primary)" }}>Frontera 2026</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Las mejores hamburguesas de El Hierro compiten en Frontera.
          Ingredientes locales, creatividad sin límites, y el público como juez.
        </motion.p>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-lg border border-border/50 bg-background p-6 text-center">
            <MapPin
              className="mx-auto mb-3 h-6 w-6"
              style={{ color: "var(--primary)" }}
            />
            <p className="text-sm font-medium text-foreground">
              Plaza Benito Padrón
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Frontera, El Hierro
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background p-6 text-center">
            <Clock
              className="mx-auto mb-3 h-6 w-6"
              style={{ color: "var(--primary)" }}
            />
            <p className="text-sm font-medium text-foreground">
              27 de Marzo, 2026
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Evento presencial
            </p>
          </div>
          <div className="rounded-lg border border-border/50 bg-background p-6 text-center">
            <Trophy
              className="mx-auto mb-3 h-6 w-6"
              style={{ color: "var(--primary)" }}
            />
            <p className="text-sm font-medium text-foreground">
              Productos Herreños
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              100% ingredientes de la isla
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section: Footer/CTA ─── */
function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="relative bg-background px-6 py-20">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Logo in footer */}
          <div className="mb-4 opacity-80">
            <LogoWithFallback className="mx-auto w-[120px] sm:w-[160px]" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Hamburguesas gourmet artesanales — El Hierro, Islas Canarias
          </p>

          <div className="divider-ember mx-auto mt-8 max-w-xs" />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://www.instagram.com/nanisburger"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              Instagram
            </a>
            <span className="text-border">|</span>
            <a
              href="https://nanisburger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              nanisburger.com
            </a>
          </div>

          <p className="mt-10 text-xs text-muted-foreground/40">
            &copy; {new Date().getFullYear()} Nanis Burger. Todos los derechos
            reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <main>
      <Hero />
      <Historia />
      <Ingredientes />
      <Concurso />
      <Footer />
    </main>
  );
}
