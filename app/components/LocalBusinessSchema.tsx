export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://valdostafenceco.com",
    name: "Valdosta Fence Co",
    description:
      "Local, family-owned fence company serving Valdosta, GA and surrounding areas within 25 miles. Professional installation of wood, vinyl, chain link, and aluminum fencing.",
    url: "https://valdostafenceco.com",
    telephone: "+1-229-563-6488",
    email: "info@valdostafenceco.com",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    areaServed: [
      {
        "@type": "City",
        name: "Valdosta",
        containedIn: { "@type": "State", name: "Georgia" },
      },
      {
        "@type": "City",
        name: "Hahira",
        containedIn: { "@type": "State", name: "Georgia" },
      },
      {
        "@type": "City",
        name: "Lake Park",
        containedIn: { "@type": "State", name: "Georgia" },
      },
      {
        "@type": "City",
        name: "Quitman",
        containedIn: { "@type": "State", name: "Georgia" },
      },
      {
        "@type": "City",
        name: "Adel",
        containedIn: { "@type": "State", name: "Georgia" },
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 30.8327,
        longitude: -83.2785,
      },
      geoRadius: "40233.6", // 25 miles in meters
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.8327,
      longitude: -83.2785,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fence Installation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wood Fence Installation",
            description: "Professional wood fence installation in Valdosta, GA",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vinyl Fence Installation",
            description: "Maintenance-free vinyl fence installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chain Link Fence Installation",
            description: "Affordable chain link fence installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aluminum Fence Installation",
            description: "Elegant aluminum fence installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fence Repair",
            description: "Expert fence repair services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gate Installation",
            description: "Custom gate installation and automation",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://facebook.com/valdostafenceco",
      "https://instagram.com/valdostafenceco",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}


