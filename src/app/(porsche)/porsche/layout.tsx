import type { Metadata } from "next";
import "./porsche.css";

const TITLE = "1969 Porsche 911 T — For Sale | $72,000";
const DESCRIPTION =
  "Award-winning 1969 Porsche 911 T — Best in Show Miami 2019. Indian Red, 30,260 miles, fully documented. $72,000 USD. Private sale, Miami Florida.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/porsche/img/arb-01.webp", width: 620, height: 284, alt: "1969 Porsche 911 T — Indian Red" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/porsche/img/arb-01.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Car",
  name: "1969 Porsche 911 T",
  description: DESCRIPTION,
  brand: { "@type": "Brand", name: "Porsche" },
  model: "911 T",
  vehicleModelDate: "1969",
  bodyType: "Coupe",
  driveWheelConfiguration: "RearWheelDriveConfiguration",
  vehicleTransmission: "4-Speed Manual",
  fuelType: "Gasoline",
  color: "Indian Red",
  mileageFromOdometer: { "@type": "QuantitativeValue", value: 30260, unitCode: "SMI" },
  vehicleIdentificationNumber: "119121289",
  offers: {
    "@type": "Offer",
    price: 72000,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Person", address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" } },
  },
  image: "/porsche/img/arb-01.webp",
};

export default function PorscheLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="porsche-root">{children}</div>
    </>
  );
}
