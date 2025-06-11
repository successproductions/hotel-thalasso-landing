"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"

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
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="w-full bg-stone-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-widest text-stone-600 uppercase mb-4">Appointment</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-stone-800 mb-6">Get In Touch With Femelle</h2>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Quisque et aliquet diam, id faucibus metus. Fusce ante est, condimentum vitae ultrices sed.
          </p>
        </div>

        {/* Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  Your Name *
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
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    Phone *
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
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
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
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
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
                className="w-full bg-green-900 hover:bg-green-800 text-white py-4 rounded-lg font-medium tracking-wide"
                size="lg"
              >
                Submit Form
              </Button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-full min-h-[400px] bg-stone-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540943654408!2d-0.12768908422918447!3d51.50735397963401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slondon%20eye!5e0!3m2!1sen!2suk!4v1234567890123"
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
            <h3 className="text-xl font-medium text-green-900 mb-2">Our Address</h3>
            <p className="text-stone-600">POINT DE DRAGON PK 28. 73000</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">Phone Number</h3>
            <p className="text-stone-600">+212 652-881921</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-green-900 mb-2">Our Email</h3>
            <p className="text-stone-600">reservation@dakhlaclub.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
