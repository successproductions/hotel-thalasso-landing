'use client';
import Image from 'next/image';
import { useMessages } from 'next-intl';

export function AboutV2Reverse() {
  const msg = useMessages();
  const descriptionList = msg.about2.description1 as string[];

  return (
    <section className="bg-white mb-4 md:mt-0">
      <div className="mx-auto grid grid-cols-1 items-center gap-8 md:gap-0 md:grid-cols-2">
        {/* Image Column - Now on the left */}
        <div className="relative h-64 w-full md:h-auto md:min-h-[60vh]">
          <Image
            src="/images/offer-3/dji9.jpg"
            alt="Illustration scientifique"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Column - Now on the right */}
        <div className="space-y-4 px-4 xl:px-28">
          <h2 className="text-[23px] font-normal text-gray-800 md:text-4xl">
            {msg.about2.title.toUpperCase()}
          </h2>
          <p className="text-[16px] text-gray-700 font-extralight">{msg.about2.description}</p>
          <p className="text-[16px] text-gray-700 font-extralight">{msg.about2.stitle}</p>

          <ul className="list-disc text-[16px] font-extralight leading-relaxed text-gray-700 space-y-2 pl-6 md:text-lg">
            {descriptionList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p className="text-[16px] text-gray-700 font-extralight">{msg.about2.descriptionBottom}</p>
        </div>
      </div>
    </section>
  );
}
