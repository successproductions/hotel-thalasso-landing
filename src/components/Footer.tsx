import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0c1b11] text-white pt-40 relative">
      {/* CTA Banner */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-cover bg-center bg-black/40 rounded-xl overflow-hidden shadow-lg">
        <div className="p-10 text-center space-y-4 backdrop-blur-sm bg-black/30">
          <p className="text-sm uppercase tracking-widest text-gray-300">Appointment</p>
          <h2 className="text-3xl md:text-4xl font-trajan">Élevez votre expérience bien-être</h2>
          <p className="max-w-xl mx-auto text-gray-300">
            3 jours de soins holistiques, de rituels ancestraux et de reconnexion à vous-même dans un sanctuaire entre
            désert et océan.
          </p>
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition">
            Réservez maintenant →
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-3xl font-trajan italic">DakhlaClub</h3>
            <p className="text-sm text-gray-400">© 2025 Dakhla Club</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              DC Thermes – Dakhla Club
              <br />
              Tél: +212 6 12 34 56 78
              <br />
              E: contact@femelle-spa.ma
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#about" className="hover:text-white">À propos</Link></li>
              <li><Link href="#services" className="hover:text-white">Séjours</Link></li>
              <li><Link href="#pricing" className="hover:text-white">Programme</Link></li>
              <li><Link href="#contact" className="hover:text-white">Réserver</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#faq" className="hover:text-white">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white">Mentions Légales</Link></li>
              <li><Link href="#" className="hover:text-white">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Youtube</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
