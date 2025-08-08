'use client';
import Image from 'next/image';
import { useMessages } from 'next-intl';

export function About5() {
  const msg = useMessages();
  const descriptionList = msg.offer5.about.description1 as string[];

  return (
    <section id="about" className="bg-white">
      <div className="mx-auto grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Text Column */}
        <div className="space-y-4 px-4 xl:px-28">
          <h2 className="text-3xl font-medium text-gray-800 md:text-4xl">
            {msg.about.title.toUpperCase()}
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            {descriptionList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Image Column */}
        <div className="relative h-64 w-full md:h-auto md:min-h-[60vh]">
          <Image
            src="/images/about5.png"
            alt="Illustration scientifique"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
