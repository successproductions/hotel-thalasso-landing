'use client';
import React from 'react';
import { useMessages, useTranslations } from 'next-intl';

type Service = {
  title: string;
  subItems?: string[];
};

type Messages = {
  servicesTable: {
    header: string;
    programs: string[];
    services: Service[];
    availability: Record<string, number[]>;
  };
};

export function ServicesTable() {
  // grab the raw JSON object under "servicesTable"
  const msg = useMessages() as { servicesTable: Messages['servicesTable'] };
  const table = msg.servicesTable;

  // translations hook—for any one-off strings if you prefer live locale switching
  const t = useTranslations('servicesTable');

  return (
    <div className="overflow-x-auto py-4 md:py-8">
      <div className="mx-4 lg:mx-36">
        <table className="w-full table-auto border-collapse">
          <thead>
            {/* main header */}
            <tr>
              <th
                colSpan={1 + table.programs.length}
                className="text-left text-lg font-semibold uppercase pb-2 border-b border-gray-300"
              >
                {table.header}
              </th>
            </tr>
            {/* column headings: Services + each Day */}
            <tr>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-2">
                {t('servicesLabel') /* you can add this key if you want to translate "Services" */}
              </th>
              {table.programs.map((day, i) => (
                <th
                  key={i}
                  className="text-center text-sm font-medium text-gray-600 px-4 py-2"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {table.services.map((svc, idx) => (
              <tr key={idx} className="bg-white">
                {/* Service title + sub-items */}
                <td className="align-top px-4 py-4">
                  <div className="font-medium text-gray-800">{svc.title}</div>
                  {svc.subItems && (
                    <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 space-y-1">
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
                    <td
                      key={colIdx}
                      className="px-4 py-4 text-center font-medium text-gray-700"
                    >
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
