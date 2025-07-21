import { Footer } from "@/components/Footer"
import Header from "@/components/Header"

import { About5 } from "@/components/offer-5/About5"
import FAQ5 from "@/components/offer-5/FAQSection5"
import { HealthPrograms5 } from "@/components/offer-5/HealthPrograms5"
import Hero5 from "@/components/offer-5/Hero5"
import { NewsletterSection5 } from "@/components/offer-5/NewsletterSection5"
import { ObjectivesSection5 } from "@/components/offer-5/ObjectivesSection5"
import { ProgramsSection5 } from "@/components/offer-5/ProgramsSection5"
import { ServicesTable5 } from "@/components/offer-5/ServicesTable5"
import WhatsAppChatbot5 from "@/components/offer-5/WhatsAppChatbot5"
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
            <ServicesTable5/>
            <ObjectivesSection5/>
            <TestimonialsCarousel/>
            <RewardsSection/>
            <FAQ5/>
            <NewsletterSection5/>
            <Footer/>
            <WhatsAppChatbot5/>


        </>
    )
}