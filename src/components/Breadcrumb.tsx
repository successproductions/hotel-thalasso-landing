'use client';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale();
  const baseUrl = 'https://offer.dakhlaclub.com';

  // JSON-LD structured data for breadcrumb
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: `${baseUrl}/${locale}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        ...(item.href && { item: `${baseUrl}${item.href}` }),
      })),
    ],
  };

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Visual Breadcrumb */}
      <nav className="bg-gray-50 py-3">
        <div className="mx-auto max-w-6xl px-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="flex items-center text-gray-500 transition-colors hover:text-teal-600"
              >
                <Home className="mr-1 h-4 w-4" />
                Accueil
              </Link>
            </li>

            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-gray-500 transition-colors hover:text-teal-600"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="font-medium text-gray-900">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
