"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type Sponsor = {
  name: string;
  tier: "founding" | "impact" | "partner";
  logoSrc?: string;
  website?: string;
};

const sponsors: Sponsor[] = [
  { name: "BRIGHT", tier: "founding", logoSrc: "/sponsors/bright.png"},
  { name: "RASBJ", tier: "founding", logoSrc: "/sponsors/rasbj.jpg", website: "https://rasbj.org" },
  { name: "United Family Healthcare", tier: "founding", logoSrc: "/sponsors/ufh.png", website: "https://www.ufh.com.cn/en" },
  { name: "Modernista", tier: "partner", logoSrc: "/sponsors/modernista.png"},
  { name: "the Beijinger", tier: "partner", logoSrc: "/sponsors/thebeijinger.png", website: "https://www.thebeijinger.com" },
  { name: "Meta Media", tier: "partner", logoSrc: "/sponsors/meta-media.png" },
  { name: "ARRI", tier: "partner", logoSrc: "/sponsors/arri.png", website: "https://www.arri.com" },
  { name: "Black Peak", tier: "partner", logoSrc: "/sponsors/black-peak.png" },
  { name: "Casa Flamenco", tier: "partner", logoSrc: "/sponsors/casa.png" },
  { name: "meitihuiclub", tier: "partner", logoSrc: "/sponsors/club.png" },
  { name: "Gravity Art Museum", tier: "partner", logoSrc: "/sponsors/gravity-art.png" },
];

function TierHeading({ title, subtitle, headingClassName }: { title: string; subtitle?: string; headingClassName?: string }) {
  return (
    <header className="mb-6">
      <h2 className={"text-2xl font-bold tracking-tight " + (headingClassName ?? "")}>{title}</h2>
      {subtitle ? (
        <p className="mt-1 text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const isFounding = sponsor.tier === "founding";
  const CardInner = (
    <article
      className={"group rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-card/80"}
      aria-label={sponsor.name}
    >
      <div className={"relative mx-auto aspect-[4/3] w-full max-w-[240px]"}>
        {sponsor.logoSrc ? (
          <Image
            src={sponsor.logoSrc}
            alt={`${sponsor.name} logo`}
            fill
            sizes="(max-width: 640px) 60vw, (max-width: 1024px) 25vw, 240px"
            className="object-contain"
            priority={false}
            onError={(e) => {
              const el = e.currentTarget as HTMLImageElement;
              // Hide broken images gracefully
              el.style.visibility = "hidden";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Logo forthcoming
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold leading-none">{sponsor.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            {isFounding ? (
              <Badge variant="default" aria-label="Founding Partner">Founding Partner</Badge>
            ) : (
              <span className="text-xs capitalize text-muted-foreground">Partner</span>
            )}
          </div>
        </div>
        {sponsor.website ? (
          <Button
            asChild
            variant="outline"
            type="button"
            className="hidden md:inline-flex"
          >
            <Link href={sponsor.website} rel="noopener" target="_blank" aria-label={`Visit ${sponsor.name} website`}>
              Visit
            </Link>
          </Button>
        ) : null}
      </div>
    </article>
  );

  // Mobile: make the whole card clickable when a website exists
  if (sponsor.website) {
    return (
      <Link
        href={sponsor.website}
        rel="noopener"
        target="_blank"
        aria-label={`Open ${sponsor.name} website`}
        className="block"
      >
        {CardInner}
      </Link>
    );
  }

  return CardInner;
}

export default function SponsorsPage(): JSX.Element {
  const [bannerOk, setBannerOk] = useState(true);
  const foundingSponsors = sponsors.filter((s) => s.tier === "founding");
  const otherSponsors = sponsors.filter((s) => s.tier !== "founding");

  return (
    <main className="container mx-auto max-w-6xl px-4 pt-24 pb-12" aria-labelledby="sponsors-title">
      <header className="mb-10 text-center">
        <h1 id="sponsors-title" className="text-4xl font-extrabold tracking-tight">Sponsors</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We gratefully acknowledge the generous support of our sponsors who help bring TEDx Beixinqiao — Ideas That Move — to life.
        </p>
      </header>

      {/* Featured sponsor collage/banner */}
      <section aria-labelledby="sponsor-banner" className="mb-12">
        <h2 id="sponsor-banner" className="sr-only">Sponsor Collage</h2>
        <div className="relative w-full overflow-hidden rounded-lg border bg-card">
          <div className="relative aspect-[16/9] w-full">
            {bannerOk ? (
              <Image
                src="/sponsors/collage.png"
                alt="Collage of TEDx Beixinqiao sponsors"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
                className="object-contain"
                priority
                onError={() => setBannerOk(false)}
              />
            ) : null}
            
          </div>
        </div>
      </section>

      {foundingSponsors.length > 0 ? (
        <section
          className="mb-12 rounded-xl border border-red-200 dark:border-red-800 p-4 shadow-sm backdrop-blur-md bg-white/60 dark:bg-black/50"
          aria-labelledby="founding-heading"
        >
          <TierHeading
            title="Founding Partners"
            subtitle="Our primary supporters who make TEDx Beixinqiao possible"
            headingClassName="inline-block pb-1 border-b-2 border-red-600 dark:border-red-500"
          />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {foundingSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
          </div>
        </section>
      ) : null}

      {otherSponsors.length > 0 ? (
        <section
          className="mb-12 rounded-xl border p-4 shadow-sm backdrop-blur-md bg-white/40 dark:bg-black/30"
          aria-labelledby="partners-heading"
        >
          <TierHeading title="Partners & Supporters" subtitle="Organizations and brands supporting our event" />
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {otherSponsors.map((s) => (
              <SponsorCard key={s.name} sponsor={s} />
            ))}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="get-involved-heading" className="mt-6 rounded-lg border bg-card p-6">
        <h2 id="get-involved-heading" className="text-xl font-semibold tracking-tight">Become a Sponsor</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Interested in supporting TEDx Beixinqiao? We offer tailored partnership opportunities across tiers. Get in touch to learn how we can collaborate.
        </p>
        <div className="mt-4">
          <Button asChild type="button">
            <Link href="/contact" aria-label="Contact us about sponsorship">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
