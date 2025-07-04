import React from "react";

type Service = {
  title: string;
  subItems?: string[];
};

export function ServicesTable() {
  const programs = ["Jour 1", "Jour 2", "Jour 3", "Jour 4"];
  const services: Service[] = [
    { title: "Accueil personnalisé" },
    { title: "Infusion détox" },
    { title: "Installation bungalow vue nature/océan" },
    { title: "Bol d'Air Jacquier" },
    { title: "Piscine thermale" },
    { title: "Sauna purifiant" },
    { title: "Bain hydromassant" },
    { title: "Enveloppement aux algues" },
    { title: "Modelage sous affusion" },
    { title: "Douche à jet" },
    { title: "Bain au magnésium" },
    { title: "Cupping thérapie" },
    { title: "Hammam Secret du Désert" },
    { title: "Massage relaxant" },
    {
      title: "Objectifs thérapeutiques",
      subItems: [
        "Ancrage, respiration, ouverture du corps et de l'esprit",
        "Lâcher-prise profond, oxygénation cellulaire, relâchement musculaire",
        "Relancer la circulation, affiner la silhouette, recharge énergétique",
        "Évacuation des toxines, apaisement mental, peau régénérée",
      ],
    },
    {
      title: "Bénéfices attendus",
      subItems: [
        "Oxygénation intérieure & peau rayonnante",
        "Corps léger, tensions relâchées",
        "Détente musculaire & sommeil retrouvé",
        "Peau lissée, dégonflée, reminéralisée",
        "Silhouette affinée et drainée naturellement",
        "Clarté mentale & énergie stable",
      ],
    },
  ];

  const serviceAvailability: Record<string, number[]> = {
    "Accueil personnalisé": [1, 0, 0, 0],
    "Infusion détox": [1, 0, 0, 0],
    "Installation bungalow vue nature/océan": [1, 0, 0, 0],
    "Bol d'Air Jacquier": [1, 1, 0, 1],
    "Piscine thermale": [1, 1, 1, 1],
    "Sauna purifiant": [0, 1, 0, 0],
    "Bain hydromassant": [0, 1, 0, 0],
    "Enveloppement aux algues": [0, 1, 0, 0],
    "Modelage sous affusion": [0, 1, 0, 0],
    "Douche à jet": [0, 0, 1, 0],
    "Bain au magnésium": [0, 0, 1, 0],
    "Cupping thérapie": [0, 0, 1, 0],
    "Hammam Secret du Désert": [0, 0, 0, 1],
    "Massage relaxant": [0, 0, 0, 1],
    "Objectifs thérapeutiques": [1, 1, 1, 1],
    "Bénéfices attendus": [1, 1, 1, 1],
  };

  return (
    <div className="overflow-x-auto py-12">
      <div className=" mx-36">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th
                colSpan={1 + programs.length}
                className="text-left text-lg font-semibold uppercase pb-2 border-b border-gray-300"
              >
                PROGRAMME ÉVASION HOLISTIQUE - DAKHLA
              </th>
            </tr>
            <tr>
              <th className="text-left text-sm font-medium text-gray-600 px-4 py-2">
                Services
              </th>
              {programs.map((day, index) => (
                <th key={index} className="text-center text-sm font-medium text-gray-600 px-4 py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((svc, idx) => (
              <tr key={idx} className="bg-white">
                <td className="align-top px-4 py-4">
                  <div className="font-medium text-gray-800">{svc.title}</div>
                  {svc.subItems && (
                    <ul className="mt-2 ml-4 list-disc text-sm text-gray-600 space-y-1">
                      {svc.subItems.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </td>
                {programs.map((_, i) => (
                  <td
                    key={i}
                    className="px-4 py-4 text-center font-medium text-gray-700"
                  >
                    {serviceAvailability[svc.title] ? (serviceAvailability[svc.title][i] ? "✓" : "") : "✓"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}