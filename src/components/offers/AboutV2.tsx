'use client';
import Image from 'next/image';
import { useMessages } from 'next-intl';

export function AboutV2() {
  const msg = useMessages();
  const descriptionList = msg.about.description1 as string[];

  return (
    <section className="bg-white mb-6 md:mb-0">
      <div className="mx-auto grid grid-cols-1 items-center gap-8 md:gap-0 md:grid-cols-2">
        {/* Text Column */}
        <div className="order-2 space-y-4 px-4 md:order-1 xl:px-28">
          <h2 className="text-[27px] font-normal text-gray-800 md:text-4xl">
            {msg.about.title.toUpperCase()}
          </h2>

          <ul className="list-disc text-[18px] font-extralight leading-relaxed text-gray-700 space-y-2 pl-6 md:text-lg">
            <p className="text-[18px] font-extralight">{msg.about.stitle}</p>
            {descriptionList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Image Column */}
        <div className="order-1 relative h-64 w-full md:order-2 md:h-auto md:min-h-[60vh]">
          <Image
            src="/images/offer-3/dji1.jpg"
            alt="Illustration scientifique"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
