"use client"

import { useTranslations } from "next-intl"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

export default function Jumbotron5() {
  const t = useTranslations("offer5")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const stats = [
    { label: t("stats.yearsExperience"), end: 25, suffix: "+" },
    { label: t("stats.yearlyCustomer"), end: 3.4, suffix: "K+" },
    { label: t("stats.experiencedStaffs"), end: 100, suffix: "+" },
    { label: t("stats.positiveReviews"), end: 99.5, suffix: "%" },
  ]

  return (
    <section ref={ref} className=" bg-stone-50 h-[35vh] dark:bg-[#080b12] relative px-12 md:px-20 lg:px-64 ">
      {/* Main Headline - Left Side */}
      <div className="max-w-6xl pt-16 md:pt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
          <span className="text-stone-900 dark:text-gray-50 font-trajan">{t('jumbotron.headline')}</span>{" "}
          <span className="text-stone-500 dark:text-stone-400 font-trajan ">
            {t('jumbotron.subtext')}
          </span>
        </h1>
      </div>

      {/* Statistics - Bottom Right */}
      <div className="absolute bottom-2 right-8 md:right-16 lg:right-20">
        <div className="grid grid-cols-4 gap-8 md:gap-12">
          {stats.map(({ label, end, suffix }, i) => (
            <div key={i} className="text-center">
              <div className="text-xs md:text-sm dark:text-gray-50 text-stone-500 mb-2 font-trajan italic">{label}</div>
              <div className="text-3xl md:text-4xl lg:text-5xl font-trajan dark:text-stone-400 text-stone-800">
                {inView ? (
                  <CountUp end={end} suffix={suffix} duration={2.5} decimals={Number.isInteger(end) ? 0 : 1} />
                ) : (
                  `0${suffix}`
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
