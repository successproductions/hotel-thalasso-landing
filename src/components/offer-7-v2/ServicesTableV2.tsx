'use client';
import React from 'react';
import { useMessages, useTranslations } from 'next-intl';

type Service = {
  title: string;
  subItems?: string[];
};

type Messages = {
  offer7: {
    servicesTable7: {
      header: string;
      programs: string[];
      services: Service[];
      availability: Record<string, number[]>;
    };
  };
};

export function ServicesTableV2() {
  const msg = useMessages() as Messages;
  const table = msg.offer7.servicesTable7;
  const t = useTranslations('offer7.servicesTable7');

  return (
    <div className="overflow-x-auto py-4 md:py-8">
      <div className="mx-4 lg:mx-36">
        <table className="w-full table-auto border-collapse">
          <thead>
            {/* main header */}
            <tr>
              <th
                colSpan={1 + table.programs.length}
                className="border-b border-gray-300 pb-2 text-left text-lg font-semibold uppercase"
              >
                {table.header}
              </th>
            </tr>
            {/* column headings: Services + each Day */}
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                {t('servicesLabel')}
              </th>
              {table.programs.map((day, i) => (
                <th key={i} className="px-4 py-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {table.services.map((svc, idx) => (
              <tr key={idx} className="bg-white">
                {/* Service title + sub-items */}
                <td className="px-4 py-4 align-top">
                  <div className="font-medium text-gray-800">{svc.title}</div>
                  {svc.subItems && (
                    <ul className="ml-4 mt-2 list-disc space-y-1 text-sm text-gray-600">
                      {svc.subItems.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </td>

                {/* ✓ or blank for each program column */}
                {table.programs.map((_, colIdx) => {
                  const avail = table.availability[svc.title]?.[colIdx];
                  return (
                    <td key={colIdx} className="px-4 py-4 text-center font-medium text-gray-700">
                      {avail === 1 ? '✓' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
