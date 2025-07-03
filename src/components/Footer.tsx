
import React from "react";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">DakhlaClub</h3>
          <ul className="space-y-2">
            {["About", "Contact Us", "Careers"].map((item) => (
              <li key={item} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Noteworthy</h3>
          <ul className="space-y-2">
            {["Awards & Press", "Newsletters", "FAQ"].map((item) => (
              <li key={item} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Legal</h3>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <li key={item} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-sm font-semibold uppercase mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-900">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-900">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Column 5: Badges */}
        <div className="flex flex-col md:flex-row items-center md:justify-end space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-12 relative">
            <Image
              src="/images/Virtuoso.png"
              alt="Virtuoso Preferred"
              fill
              className="object-contain"
            />
          </div>
          <div className="w-24 h-12 relative">
            <Image
              src="/images/WITT.png"
              alt="WITT"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Divider + center logo */}
      <div className="border-t border-gray-300 relative">
        <div className="absolute inset-x-0 top-0 flex justify-center -mt-4">
          <div className="bg-gray-100 px-3">
            {/* Replace with your R logo */}
            <span className="text-2xl font-serif font-bold">DC</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 text-sm text-gray-600">
        © 2025 DakhlaClub and its Associated Subsidiaries | Luxury Fitness, Health & Wellness Vacation Retreat
      </div>
    </footer>
  );
}
