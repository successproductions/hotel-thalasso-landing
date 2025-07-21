import { Footer } from "@/components/Footer"
import Header from "@/components/Header"

import { About5 } from "@/components/offer-5/About5"
import FAQSection5 from "@/components/offer-5/FAQSection5"
import { HealthPrograms5 } from "@/components/offer-5/HealthPrograms5"
import Hero5 from "@/components/offer-5/Hero5"
import { NewsletterSection5 } from "@/components/offer-5/NewsletterSection5"
import { ObjectivesSection5 } from "@/components/offer-5/ObjectivesSection5"
import { ProgramsSection5 } from "@/components/offer-5/ProgramsSection5"
import { RewardsSection } from "@/components/RewardsSection"
import TestimonialsCarousel from "@/components/TestimonialsCarousel"

export default function Page() {
    return (
        <>
            <Header />
            <Hero5/>
            <HealthPrograms5/>
            <About5/>
            <ProgramsSection5/>
            <ObjectivesSection5/>
            <TestimonialsCarousel/>
            <RewardsSection/>
            <FAQSection5/>
            <NewsletterSection5/>
            <Footer/>
            

        </>
    )
}