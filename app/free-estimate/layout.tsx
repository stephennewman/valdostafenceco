import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Estimate",
  description:
    "Get a free, no-obligation fence estimate from Valdosta Fence Co. Fill out our simple form and we'll contact you within 24 hours.",
  alternates: {
    canonical: "/free-estimate",
  },
};

export default function FreeEstimateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

