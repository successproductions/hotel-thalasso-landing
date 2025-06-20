
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutUs5() {
  const t = useTranslations('offer5.about');
   const points = t.raw('points') as string[];
  return (
    <section className="py-16 bg-stone-900/70 text-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">{t('title')}</h2>
          <ul className="space-y-2 list-disc list-inside">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="relative h-80">
          <Image
            src="/images/serenite5/about.jpg"
            alt={t('alt.image')}
            fill
            className="object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
