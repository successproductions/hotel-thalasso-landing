"use client"

import { useTranslations } from "next-intl"


export default function Jumbotron5() {
  const t = useTranslations("offer5")


  return (
    <section  className=" bg-stone-50 lg:h-[30vh] xl:h[35vh] dark:bg-[#080b12] relative px-12 md:px-20 lg:px-64 ">
      {/* Main Headline - Left Side */}
      <div className=" md:max-w-6xl pt-16 md:pt-8">
        <h1 className="text-3xl md:text-3xl lg:text-5xl xl:text-5xl leading-tight">
          <span className="text-stone-900 dark:text-gray-50 font-trajan">{t('jumbotron.headline')}</span>{" "}
          <span className="text-stone-500 dark:text-stone-400 font-trajan ">
            {t('jumbotron.subtext')}
          </span>
        </h1>
      </div>
    </section>
  )
}
