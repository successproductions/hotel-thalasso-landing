import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero';


export const metadata = {
  title: 'Hôtel Thalasso - Séjours Bien-être & Relaxation',
  description: 'Découvrez nos séjours thalasso de 3, 5 et 7 jours pour une expérience de bien-être unique. Profitez de nos soins spa, massages et activités de relaxation.',
};

export default function Home() {


  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      <Footer />
    </main>
  );
} 