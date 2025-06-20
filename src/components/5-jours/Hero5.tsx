
"use client";

import Image from "next/image";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function Hero5() {
  const t = useTranslations("offer5.hero");
  const images = [
    "/images/DJI_0070.png",
    "/images/hydro_massage.png",
    "/images/centrethalassoDakhla.jpg",
  ];

  return (
    <section className="relative h-[70vh] w-full overflow-hidden mt-20 rounded-2xl">
      {/* Carousel */}
      <Carousel className="h-full w-full">
        {images.map((src, i) => (
          <CarouselItem key={i} className="h-full w-full">
            <Image
              src={src}
              alt={`${t("alt.hero")} ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-sm uppercase text-white/80 tracking-widest mb-2">
          {t("overline")}
        </p>
        <h1 className="font-trajan text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-lg leading-tight max-w-3xl">
          {t("title")}
        </h1>
        <div className="mt-8">
          <Button asChild>
            <a href="#reservation">
              {t("ctaPrimary")} &rarr;
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom-left caption */}
      <p className="absolute bottom-4 left-4 max-w-xs text-white/80 italic text-sm">
        {t("tagline")}
      </p>

      {/* Bottom-right socials */}
      <div className="absolute bottom-4 right-4 flex space-x-4 text-white/80 text-sm">
        <a href={t("social.fb")} target="_blank" rel="noopener">FB</a>
        <a href={t("social.ig")} target="_blank" rel="noopener">IG</a>
        <a href={t("social.yt")} target="_blank" rel="noopener">YT</a>
        <a href={t("social.ln")} target="_blank" rel="noopener">LN</a>
      </div>
    </section>
  );
}
