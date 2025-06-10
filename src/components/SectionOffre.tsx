import Image from 'next/image';
import Link from 'next/link';

interface OffreProps {
  title: string;
  duration: string;
  price: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}

const SectionOffre = ({ title, duration, price, description, benefits, imageUrl }: OffreProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{duration}</p>
          </div>
          <span className="text-xl font-semibold text-blue-800">{price}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Bénéfices inclus :</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="#reservation"
          className="block w-full bg-blue-800 text-white text-center py-3 rounded-lg hover:bg-blue-900 transition-colors"
        >
          Réserver maintenant
        </Link>
      </div>
    </div>
  );
};

export default SectionOffre; 