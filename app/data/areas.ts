export interface Area {
  slug: string;
  name: string;
  county: string;
  distance: string;
  description: string;
  neighborhoods?: string[];
}

export const areas: Area[] = [
  {
    slug: "valdosta",
    name: "Valdosta",
    county: "Lowndes County",
    distance: "Headquarters",
    description:
      "As Valdosta's local fence experts, we know this community inside and out. From the historic districts downtown to the newer developments near VSU, we've installed fences throughout Valdosta for over a decade. Whether you're in North Valdosta, the Baytree neighborhood, or anywhere in between, we're just around the corner.",
    neighborhoods: [
      "Downtown Valdosta",
      "North Valdosta",
      "Baytree",
      "Wild Adventures Area",
      "Five Points",
      "Brookwood",
      "Cherry Creek",
      "Country Club",
    ],
  },
  {
    slug: "hahira",
    name: "Hahira",
    county: "Lowndes County",
    distance: "10 miles north",
    description:
      "The friendly city of Hahira is one of our most active service areas. Known for its Honey Bee Festival and small-town charm, Hahira residents appreciate quality craftsmanship – and that's exactly what we deliver. From residential privacy fences to farm fencing in the surrounding countryside, we're proud to serve Hahira.",
    neighborhoods: ["Downtown Hahira", "Hahira Heights", "Rural Hahira"],
  },
  {
    slug: "lake-park",
    name: "Lake Park",
    county: "Lowndes County",
    distance: "8 miles south",
    description:
      "Lake Park's lakeside properties and growing residential areas need quality fencing solutions. We serve Lake Park homeowners with everything from decorative front yard fencing to complete backyard privacy installations. Our team knows the local requirements and works efficiently to serve this great community.",
    neighborhoods: ["Lake Park Proper", "Lakes Boulevard Area", "Reed Bingham Area"],
  },
  {
    slug: "remerton",
    name: "Remerton",
    county: "Lowndes County",
    distance: "2 miles",
    description:
      "Right next door to Valdosta, Remerton is practically in our backyard. This tight-knit community near VSU benefits from quick response times and local expertise. We've helped numerous Remerton homeowners enhance their properties with quality fence installations.",
    neighborhoods: ["Central Remerton", "VSU Adjacent"],
  },
  {
    slug: "dasher",
    name: "Dasher",
    county: "Lowndes County",
    distance: "5 miles",
    description:
      "The small community of Dasher enjoys all the benefits of being close to Valdosta while maintaining its rural character. We serve Dasher residents with both residential fencing and farm fencing for the agricultural properties in the area.",
    neighborhoods: ["Dasher Proper", "Rural Dasher"],
  },
  {
    slug: "quitman",
    name: "Quitman",
    county: "Brooks County",
    distance: "20 miles east",
    description:
      "As the county seat of Brooks County, Quitman represents an important part of our service area. We regularly travel to Quitman for both residential and commercial fence projects, bringing the same quality and professionalism that Valdosta customers expect.",
    neighborhoods: ["Downtown Quitman", "Quitman Residential"],
  },
  {
    slug: "adel",
    name: "Adel",
    county: "Cook County",
    distance: "22 miles north",
    description:
      "Adel, the county seat of Cook County, falls within our 25-mile service radius. Known for its agricultural heritage, Adel residents often need both residential fencing and farm/ranch fencing solutions – and we deliver both with excellence.",
    neighborhoods: ["Downtown Adel", "Adel Residential", "Rural Cook County"],
  },
  {
    slug: "nashville",
    name: "Nashville",
    county: "Berrien County",
    distance: "25 miles northwest",
    description:
      "At the edge of our service area, Nashville and Berrien County benefit from our willingness to travel for quality projects. We've completed numerous successful fence installations in Nashville and look forward to serving more customers in this growing community.",
    neighborhoods: ["Nashville Proper", "Rural Berrien County"],
  },
  {
    slug: "lakeland",
    name: "Lakeland",
    county: "Lanier County",
    distance: "20 miles west",
    description:
      "Lakeland, sitting on the shores of Banks Lake, offers beautiful properties that deserve beautiful fencing. We serve Lakeland residents with residential, commercial, and lakefront fence installations tailored to this unique community.",
    neighborhoods: ["Downtown Lakeland", "Banks Lake Area", "Lakeland Residential"],
  },
];

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((area) => area.slug);
}


