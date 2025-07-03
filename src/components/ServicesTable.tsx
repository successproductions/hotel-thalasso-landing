
import React from "react";

type Service = {
  title: string;
  subItems?: string[];
};

export function ServicesTable() {
  const programs = ["3 jours", "5 jours", "7 jours"];
  const services: Service[] = [
    { title: "Health check" },
    {
      title: "Advanced Preventive Diagnosis",
      subItems: [
        "Body Composition Analysis",
        "3D Body Scanner",
        "Measurement of Vital Signs",
        "Cognitive Domain Test",
        "Analysis of cardiovascular status and nervous system activity",
        "Measurement of advanced glycation product accumulation",
        "Facial Scanner",
      ],
    },
    { title: "Initial clinical analysis" },
    { title: "Cortisol biorhythm test" },
    {
      title:
        "Oxytest, oxidative stress test to determine the level of oxidation in the body",
    },
    { title: "General medical consultation at the start of the program" },
    { title: "General medical consultation at the end of the program" },
    { title: "Regenerative medicine consultation" },
    { title: "Revitalising medicine consultation" },
    { title: "Consultation with a longevity expert" },
  ];

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
                MEDICAL SERVICES
              </th>
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
                    1
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
