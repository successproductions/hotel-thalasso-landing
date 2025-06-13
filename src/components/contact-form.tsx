
"use client";

import type React from "react";
import { useState }     from "react";
import { Button }       from "@/components/ui/button";
import { Input }        from "@/components/ui/input";
import { Textarea }     from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import Swal             from 'sweetalert2';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name:        "",
    country:     "",      
    phone:       "",
    email:       "",
    date:        "",      
    message:     "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const t = useTranslations('contactForm');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, date } = formData;

    if (!name || !phone || !email || !date) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs requis manquants',
        text:  'Veuillez remplir tous les champs obligatoires.',
        confirmButtonColor: '#166534',
      });
      return;
    }

    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé !',
        text:  'Nous vous contacterons très bientôt.',
        confirmButtonColor: '#166534',
      });
      setFormData({ name: '', country: '', phone: '', email: '', date: '', message: '' });
    }, 800);
  };

  return (
    <div id="contact" className="w-full bg-stone-50 dark:bg-[#080b12] pt-16 pb-16 px-6 text-gray-800 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-stone-600 uppercase mb-4 dark:text-gray-400">
           {t('header.small')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-5xl text-stone-900 dark:text-white mb-6 leading-tight">
            {t('header.title')}
          </h2>
          <p className="text-stone-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
           {t('header.subtitle')}
          </p>
        </div>

        {/* Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up transition-all duration-1000">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm transition-colors">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                    {t('fields.name.label')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('fields.name.placeholder')}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                    required
                  />
                </div>

                {/* Country  Phone */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
 <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                    {t('fields.phone.label')} *
                  </label>
                  <div className="relative">
                    {/* flag  code */}
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="
                        absolute inset-y-0 left-0 h-full
                        pl-2 pr-7 bg-gray-100 dark:bg-gray-800
                        border border-r-0 border-gray-300 dark:border-gray-700
                        text-gray-600 dark:text-gray-300 text-sm
                        rounded-l-md
                        focus:outline-none focus:ring-2 focus:ring-stone-500
                      "
                    >
                      <option value="MA">🇲🇦 +212</option>
                      <option value="FR">🇫🇷 +33</option>
                      <option value="US">🇺🇸 +1</option>
                    </select>

                    {/* phone number */}
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('fields.phone.placeholder')}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="
                        w-full pl-[5.5rem] pr-3
                        rounded-l-none border-stone-300
                        focus:border-stone-500 focus:ring-stone-500
                      "
                      required
                    />

                    {/* dropdown arrow */}
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
                      ▾
                    </span>
                  </div>
                </div>
                </div>

                {/* Email  Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                      {t('fields.email.label')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('fields.email.placeholder')}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                      required
                    />
                  </div>

                  {/* Reservation Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                      {t('fields.date.label')} *
                    </label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                    {t('fields.message.label')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('fields.message.placeholder')}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full h-32 border-stone-300 focus:border-stone-500 focus:ring-stone-500 resize-none"
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-green-900 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-lg font-trajan tracking-wide shadow hover:shadow-lg transform hover:-translate-y-1"
                  size="lg"
                >
                 {t('submit')}
                </Button>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-full min-h-[400px] bg-stone-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.701890833086!2d-15.771637423230148!3d23.90018747856852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc23ad5afd1c1481%3A0xc28dd166fe5df19a!2sDakhla%20Club%20Hotel%20%26%20Spa!5e0!3m2!1sfr!2sma!4v1749717076479!5m2!1sfr!2sma"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">{t('info.address.title')}</h3>
            <p className="text-stone-600 dark:text-gray-300">{t('info.address.text')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">{t('info.phone.title')}</h3>
            <p className="text-stone-600 dark:text-gray-300">{t('info.phone.text')}</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">{t('info.email.title')}</h3>
            <p className="text-stone-600 dark:text-gray-300">{t('info.email.text')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
