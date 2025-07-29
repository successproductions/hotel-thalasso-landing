'use client'
import Image from "next/image";
import { useMessages } from "next-intl";

export function About7() {

  const msg = useMessages();
  const descriptionList = msg.offer7.about.description1 as string[];

  return (
    <section id="about" className=" bg-white">
      <div className="mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Column */}
        <div className="space-y-4 px-4 xl:px-28">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-800">
           {msg.about.title.toUpperCase()}
          </h2>
          
          <ul className="list-disc pl-6 space-y-2">
      {descriptionList.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
        </div>

        {/* Image Column */}
        <div className="relative w-full h-64 md:h-auto md:min-h-[60vh]">
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
