export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  service: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Valdosta, GA",
    rating: 5,
    text: "Absolutely thrilled with our new privacy fence! The team was professional, showed up on time, and finished ahead of schedule. Our backyard finally feels like a private retreat. Highly recommend Valdosta Fence Co to anyone looking for quality work.",
    service: "Privacy Fence Installation",
    date: "2024-11",
  },
  {
    id: 2,
    name: "James T.",
    location: "Hahira, GA",
    rating: 5,
    text: "Had them install a vinyl fence around our pool. They knew all the code requirements and handled everything including the permit. The fence looks beautiful and I know my grandkids are safe. Great experience from start to finish.",
    service: "Pool Fence Installation",
    date: "2024-10",
  },
  {
    id: 3,
    name: "Robert & Linda K.",
    location: "Lake Park, GA",
    rating: 5,
    text: "After a storm took out part of our fence, Valdosta Fence Co came out the next day to assess the damage. They repaired everything within a week and matched our existing fence perfectly. Fair price and honest service.",
    service: "Fence Repair",
    date: "2024-09",
  },
  {
    id: 4,
    name: "Mike D.",
    location: "Valdosta, GA",
    rating: 5,
    text: "Best fence company in Valdosta, hands down. I got quotes from three companies and they were the most detailed and transparent. The cedar fence they installed is absolutely gorgeous. My neighbors keep asking who did the work!",
    service: "Wood Fence Installation",
    date: "2024-08",
  },
  {
    id: 5,
    name: "Patricia H.",
    location: "Quitman, GA",
    rating: 5,
    text: "Even though we're out in Quitman, they treated us like we were right next door. Professional crew, quality materials, and they cleaned up everything when done. Our aluminum fence looks like it belongs in a magazine.",
    service: "Aluminum Fence Installation",
    date: "2024-07",
  },
  {
    id: 6,
    name: "David S.",
    location: "Adel, GA",
    rating: 5,
    text: "Had 20 acres that needed fencing for cattle. They gave me a fair quote, used quality materials, and finished the job in great time. The fence is solid and my cattle aren't going anywhere. Will use them again for sure.",
    service: "Farm & Ranch Fencing",
    date: "2024-06",
  },
  {
    id: 7,
    name: "Jennifer W.",
    location: "Valdosta, GA",
    rating: 5,
    text: "We needed a fence ASAP before bringing our new puppy home. They squeezed us in and installed a beautiful chain link fence in just two days. Our pup loves his new yard and we love the peace of mind. Thank you!",
    service: "Chain Link Fence",
    date: "2024-05",
  },
  {
    id: 8,
    name: "Commercial Property Owner",
    location: "Valdosta, GA",
    rating: 5,
    text: "Hired them to fence our warehouse property with security fencing and an automated gate. Very professional, handled all permits, and completed on schedule. The gate system works flawlessly. Excellent commercial work.",
    service: "Commercial Fencing",
    date: "2024-04",
  },
];

export function getFeaturedTestimonials(count: number = 4): Testimonial[] {
  return testimonials.slice(0, count);
}

export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonials.filter((t) =>
    t.service.toLowerCase().includes(service.toLowerCase())
  );
}


