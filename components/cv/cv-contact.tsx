"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { cvData } from "@/lib/cv-data"

export function CVContact() {
  const { contact } = cvData

  return (
    <section id="contact" className="cv-section py-12 md:py-16">
      <h2 className="cv-section-title">Contact</h2>
      <div className="cv-section-content">
        <div className="space-y-4 max-w-md">
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <Phone className="h-6 w-6 text-blue-600" />
            <span className="text-slate-700 group-hover:text-blue-600">
              {contact.phone}
            </span>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <Mail className="h-6 w-6 text-blue-600" />
            <span className="text-slate-700 group-hover:text-blue-600">
              {contact.email}
            </span>
          </a>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
            <MapPin className="h-6 w-6 text-slate-600" />
            <span className="text-slate-700">
              {contact.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
