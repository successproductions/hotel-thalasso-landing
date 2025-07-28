
"use client"
import { ChevronRight, Home } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl"

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale()
  const baseUrl = 'https://offer.dakhlaclub.com'

  // JSON-LD structured data for breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList", 
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": `${baseUrl}/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        ...(item.href && { "item": `${baseUrl}${item.href}` })
      }))
    ]
  }

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
      />
      
      {/* Visual Breadcrumb */}
      <nav className="bg-gray-50 py-3">
        <div className="max-w-6xl mx-auto px-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="flex items-center text-gray-500 hover:text-teal-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-1" />
                Accueil
              </Link>
            </li>
            
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                {item.href ? (
                  <a 
                    href={item.href}
                    className="text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  )
}