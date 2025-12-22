import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse our fence installation gallery. See examples of wood, vinyl, chain link, and aluminum fences we've installed throughout Valdosta, GA.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

