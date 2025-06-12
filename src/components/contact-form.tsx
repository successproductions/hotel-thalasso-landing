"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"
import Swal from 'sweetalert2'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()

  const { name, phone, email } = formData

  if (!name || !phone || !email) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs requis manquants',
        text: 'Veuillez remplir tous les champs obligatoires.',
        confirmButtonColor: '#166534',
      });
      return;
    }


    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé !',
        text: 'Nous vous contacterons très bientôt.',
        confirmButtonColor: '#166534',
      });
      setFormData({ name: '', phone: '', email: '', message: '' });
    }, 800);
}

  return (
    <div className="w-full bg-stone-50 dark:bg-[#080b12] pt-16 pb-16 px-6 text-gray-800 dark:text-gray-100 transition-colors">

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
       <div className="text-center mb-12">
  <p className="text-sm tracking-widest text-stone-600 uppercase mb-4 dark:text-gray-400">
    Prendre rendez-vous
  </p>
  <h2 className="text-4xl md:text-5xl lg:text-5xl  text-stone-900 dark:text-white mb-6 leading-tight">
    RECONNECTEZ-VOUS À VOTRE BIEN-ÊTRE
  </h2>
  <p className="text-stone-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
    Notre équipe est à votre écoute pour vous accompagner dans votre expérience thalasso à Dakhla. 
    Remplissez le formulaire et offrez-vous une parenthèse hors du temps.
  </p>
</div>


        {/* Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in-up transition-all duration-1000">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm transition-colors">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                  Nom complet *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jhon Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                    Téléphone *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (234) 567 890"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Hello there!"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full h-32 border-stone-300 focus:border-stone-500 focus:ring-stone-500 resize-none"
                  rows={4}
                />
              </div>

              <Button
  type="submit"
  className="w-full bg-green-900 hover:bg-green-700 transition-all duration-300 text-white py-4 rounded-lg font-semibold tracking-wide shadow hover:shadow-lg transform hover:-translate-y-1"
  size="lg"
>
  Envoyer
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
              ></iframe>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">Address</h3>
            <p className="text-stone-600 dark:text-gray-300">POINT DE DRAGON PK 28. 73000 dakhla.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">numéro de téléphone</h3>
            <p className="text-stone-600 dark:text-gray-300">+212 652-881921</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">Notre email</h3>
            <p className="text-stone-600 dark:text-gray-300">reservation@dakhlaclub.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

