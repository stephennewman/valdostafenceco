import {
  TreePine,
  Fence,
  Link2,
  Shield,
  Eye,
  Waves,
  Tractor,
  Building2,
  Wrench,
  DoorOpen,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  benefits: string[];
  features: string[];
  faqs: { question: string; answer: string }[];
  keywords: string[];
}

export const services: Service[] = [
  {
    slug: "wood-fence",
    name: "Wood Fence Installation",
    shortName: "Wood Fencing",
    description:
      "Classic, natural beauty with customizable styles. Perfect for privacy, security, and enhancing your property's curb appeal.",
    longDescription:
      "Wood fencing remains one of the most popular choices for homeowners in Valdosta and South Georgia. Our expert team installs beautiful, durable wood fences using premium treated lumber that withstands our humid climate. From classic picket fences to tall privacy panels, we customize every project to match your home's style and your specific needs.",
    icon: TreePine,
    benefits: [
      "Natural, timeless aesthetic",
      "Highly customizable designs",
      "Cost-effective option",
      "Easy to repair and maintain",
      "Environmentally friendly",
      "Increases property value",
    ],
    features: [
      "Pressure-treated pine",
      "Cedar options available",
      "Custom heights up to 8ft",
      "Multiple style options (privacy, picket, split rail)",
      "Staining and sealing services",
      "Post hole concrete setting",
    ],
    faqs: [
      {
        question: "How long does a wood fence last in Georgia?",
        answer:
          "With proper maintenance, a wood fence in South Georgia typically lasts 15-20 years. Pressure-treated pine holds up well to our humidity, and regular staining every 2-3 years can extend lifespan significantly.",
      },
      {
        question: "What type of wood is best for fencing in Valdosta?",
        answer:
          "We recommend pressure-treated pine for most budgets – it's durable and affordable. For premium projects, cedar offers natural rot resistance and a beautiful appearance without the need for chemical treatment.",
      },
      {
        question: "Do I need a permit for a wood fence in Valdosta?",
        answer:
          "In most cases, yes. Lowndes County requires permits for fences over 6 feet tall, and there are setback requirements from property lines. We handle the permit process for you as part of our service.",
      },
    ],
    keywords: [
      "wood fence installation Valdosta GA",
      "wooden fence contractor",
      "privacy fence Valdosta",
      "cedar fence Georgia",
    ],
  },
  {
    slug: "vinyl-fence",
    name: "Vinyl Fence Installation",
    shortName: "Vinyl Fencing",
    description:
      "Low-maintenance and long-lasting. Vinyl fencing offers the look of wood without the upkeep, perfect for busy families.",
    longDescription:
      "Vinyl fencing has become increasingly popular in Valdosta for good reason – it combines attractive aesthetics with virtually zero maintenance. Our vinyl fences resist fading, cracking, and rotting, even in Georgia's intense summer heat and humidity. Available in multiple colors and styles, vinyl is the set-it-and-forget-it fencing solution.",
    icon: Fence,
    benefits: [
      "Zero maintenance required",
      "Never needs painting or staining",
      "Won't rot, warp, or crack",
      "UV-resistant colors",
      "25+ year lifespan",
      "Easy to clean",
    ],
    features: [
      "Premium virgin vinyl material",
      "Multiple color options (white, tan, gray)",
      "Privacy, semi-privacy, and picket styles",
      "Reinforced posts for wind resistance",
      "Lifetime manufacturer warranty",
      "Professional-grade hardware",
    ],
    faqs: [
      {
        question: "Is vinyl fencing worth the cost?",
        answer:
          "While vinyl has a higher upfront cost than wood, it often costs less over time. You'll never pay for staining, painting, or repairs, and vinyl fences typically last 25-30 years without significant maintenance.",
      },
      {
        question: "Can vinyl fencing withstand Georgia storms?",
        answer:
          "Yes! We install vinyl fencing with reinforced posts and proper depth settings specifically designed for South Georgia weather conditions, including high winds and occasional severe storms.",
      },
      {
        question: "Does vinyl fencing fade in the sun?",
        answer:
          "Quality vinyl fencing includes UV inhibitors that prevent significant fading. Our premium vinyl materials are specifically rated for the intense Southern sun.",
      },
    ],
    keywords: [
      "vinyl fence Valdosta",
      "PVC fence installation Georgia",
      "maintenance-free fence",
      "white vinyl fence",
    ],
  },
  {
    slug: "chain-link-fence",
    name: "Chain Link Fence Installation",
    shortName: "Chain Link",
    description:
      "Affordable, durable, and versatile. Chain link fencing provides security and boundary definition at an economical price.",
    longDescription:
      "Chain link fencing offers unmatched value for property owners who need security without breaking the bank. Ideal for backyards, commercial properties, sports areas, and pet containment, our galvanized chain link fences resist rust and stand up to years of use. We also offer vinyl-coated options in black and green for a more refined appearance.",
    icon: Link2,
    benefits: [
      "Most affordable fencing option",
      "Extremely durable",
      "Low maintenance",
      "Excellent visibility",
      "Quick installation",
      "Long-lasting galvanized coating",
    ],
    features: [
      "Galvanized steel construction",
      "Vinyl-coated color options",
      "Various heights (4ft to 12ft)",
      "Multiple gauge options",
      "Privacy slat additions available",
      "Commercial-grade hardware",
    ],
    faqs: [
      {
        question: "How long does chain link fencing last?",
        answer:
          "Galvanized chain link fencing typically lasts 20+ years with minimal maintenance. Vinyl-coated chain link can last even longer and maintains its appearance better over time.",
      },
      {
        question: "Can you add privacy to chain link fencing?",
        answer:
          "Absolutely! We offer privacy slats that weave through the chain link mesh, providing up to 90% privacy while maintaining the durability and affordability of chain link.",
      },
      {
        question: "Is chain link good for dogs?",
        answer:
          "Chain link is excellent for pet containment. We can install it at various heights and add bottom tension wire to prevent dogs from pushing under the fence.",
      },
    ],
    keywords: [
      "chain link fence Valdosta",
      "affordable fencing Georgia",
      "galvanized fence installation",
      "security fence",
    ],
  },
  {
    slug: "aluminum-fence",
    name: "Aluminum Fence Installation",
    shortName: "Aluminum Fencing",
    description:
      "Elegant and rust-free. Aluminum fencing provides the classic look of wrought iron without the maintenance concerns.",
    longDescription:
      "Aluminum fencing delivers timeless elegance to Valdosta properties. With the appearance of traditional wrought iron but none of the rust and maintenance issues, aluminum is perfect for front yards, pools, and decorative applications. Our aluminum fences come in multiple styles and colors to complement any home architecture.",
    icon: Shield,
    benefits: [
      "Rust-proof and corrosion-resistant",
      "Elegant, classic appearance",
      "Virtually maintenance-free",
      "Lightweight yet strong",
      "Eco-friendly (recyclable)",
      "Multiple style options",
    ],
    features: [
      "Powder-coated finish",
      "Multiple color options",
      "Ornamental designs available",
      "Pool code compliant options",
      "Various heights",
      "Lifetime warranty on most styles",
    ],
    faqs: [
      {
        question: "Is aluminum fencing strong enough for security?",
        answer:
          "Yes, modern aluminum fencing is surprisingly strong. While it won't stop a determined intruder like a solid privacy fence, it provides excellent boundary definition and deters casual trespassers.",
      },
      {
        question: "Can aluminum fencing be used around pools?",
        answer:
          "Absolutely! Aluminum is one of the best pool fence materials. We install pool-code compliant aluminum fencing with self-closing, self-latching gates as required by Georgia law.",
      },
      {
        question: "Does aluminum fencing rust?",
        answer:
          "No, aluminum cannot rust. Unlike iron or steel, aluminum naturally resists corrosion, making it perfect for Georgia's humid climate.",
      },
    ],
    keywords: [
      "aluminum fence Valdosta GA",
      "ornamental fence Georgia",
      "rust-free fence",
      "decorative metal fence",
    ],
  },
  {
    slug: "privacy-fence",
    name: "Privacy Fence Installation",
    shortName: "Privacy Fencing",
    description:
      "Create your own backyard sanctuary. Privacy fences block views and noise for complete outdoor seclusion.",
    longDescription:
      "Privacy fencing transforms your backyard into a secluded retreat. Whether you want to enjoy your pool without prying eyes, create a safe play area for children, or simply relax without neighbor visibility, our privacy fence installations deliver complete seclusion. Available in wood, vinyl, and composite materials.",
    icon: Eye,
    benefits: [
      "Complete visual privacy",
      "Noise reduction",
      "Wind protection",
      "Increased property value",
      "Enhanced security",
      "Creates usable outdoor space",
    ],
    features: [
      "6ft and 8ft height options",
      "Board-on-board and solid panel styles",
      "Wood, vinyl, and composite options",
      "No-gap construction",
      "Lattice top options",
      "Custom gate solutions",
    ],
    faqs: [
      {
        question: "What is the best material for a privacy fence?",
        answer:
          "It depends on your priorities. Wood offers the best value and natural look, vinyl provides zero maintenance, and composite offers the best of both worlds at a premium price.",
      },
      {
        question: "How tall can I build a privacy fence in Valdosta?",
        answer:
          "In most Valdosta neighborhoods, 6ft is the standard maximum for backyard fences, though some areas allow 8ft. Front yard fences typically have lower height restrictions. We'll help you navigate local codes.",
      },
      {
        question: "Will a privacy fence block noise?",
        answer:
          "Solid privacy fences can reduce noise by 5-10 decibels, which makes a noticeable difference. For maximum sound reduction, we recommend 8ft solid wood or composite panels.",
      },
    ],
    keywords: [
      "privacy fence installation Valdosta",
      "backyard fence Georgia",
      "tall fence installation",
      "solid fence contractor",
    ],
  },
  {
    slug: "pool-fence",
    name: "Pool Fence Installation",
    shortName: "Pool Fencing",
    description:
      "Safety meets style. Our pool fences meet Georgia code requirements while enhancing your pool area's appearance.",
    longDescription:
      "Pool safety fencing isn't just the law in Georgia – it's peace of mind for your family. We install code-compliant pool fences in aluminum, vinyl, and mesh materials that keep children and pets safe without obstructing your pool area's aesthetics. All our pool fence installations include self-closing, self-latching gates.",
    icon: Waves,
    benefits: [
      "Meets Georgia pool code requirements",
      "Prevents accidental drowning",
      "Self-closing, self-latching gates",
      "Multiple material options",
      "Maintains pool aesthetics",
      "Increases liability protection",
    ],
    features: [
      "4ft minimum height (code compliant)",
      "Non-climbable designs",
      "Self-closing gate hardware",
      "Mesh, aluminum, and vinyl options",
      "Removable mesh options",
      "Child-proof latches",
    ],
    faqs: [
      {
        question: "What are Georgia's pool fence requirements?",
        answer:
          "Georgia requires pool fences to be at least 4 feet tall with self-closing, self-latching gates. The fence must not have openings that allow a 4-inch sphere to pass through. We ensure all installations meet or exceed these requirements.",
      },
      {
        question: "Can I remove my pool fence when not needed?",
        answer:
          "Yes! We offer removable mesh pool fencing that can be taken down when adults are supervising and reinstalled easily. This is popular for families who want flexibility.",
      },
      {
        question: "What's the best pool fence material?",
        answer:
          "Aluminum is the most popular choice for permanent pool fencing due to its rust-resistance and elegant appearance. Mesh fencing is great for families wanting a removable option.",
      },
    ],
    keywords: [
      "pool fence Valdosta GA",
      "pool safety fence Georgia",
      "swimming pool enclosure",
      "pool code fence installation",
    ],
  },
  {
    slug: "farm-ranch-fencing",
    name: "Farm & Ranch Fencing",
    shortName: "Farm & Ranch",
    description:
      "Built for South Georgia agriculture. Durable fencing solutions for livestock, property boundaries, and rural properties.",
    longDescription:
      "South Georgia's agricultural heritage demands fencing that can handle the job. From cattle and horse containment to property boundary definition, we install farm and ranch fencing designed for rural Valdosta properties. Our agricultural fencing stands up to livestock pressure and Georgia's weather conditions.",
    icon: Tractor,
    benefits: [
      "Designed for livestock containment",
      "Durable in all weather",
      "Large area coverage",
      "Multiple material options",
      "Cost-effective for acreage",
      "Custom gate solutions",
    ],
    features: [
      "Woven wire fencing",
      "Barbed wire installation",
      "T-post and wood post options",
      "High-tensile wire",
      "Pipe fencing for horses",
      "Electric fence options",
    ],
    faqs: [
      {
        question: "What type of fence is best for cattle?",
        answer:
          "For cattle, we typically recommend high-tensile wire or barbed wire fencing with sturdy posts. Woven wire is excellent for containing calves. The best choice depends on your herd size and behavior.",
      },
      {
        question: "Can you fence large acreage?",
        answer:
          "Absolutely. We regularly handle farm fencing projects of 10 acres or more. For large projects, we provide detailed quotes and can work in phases if needed.",
      },
      {
        question: "What about horse fencing?",
        answer:
          "Horses require special consideration due to their tendency to lean and chew. We recommend pipe fencing, vinyl board fencing, or properly installed woven wire with a visible top board for horse properties.",
      },
    ],
    keywords: [
      "farm fence Valdosta",
      "ranch fencing Georgia",
      "livestock fence installation",
      "agricultural fencing South Georgia",
    ],
  },
  {
    slug: "commercial-fencing",
    name: "Commercial Fencing",
    shortName: "Commercial",
    description:
      "Professional security and boundary solutions for businesses. From warehouses to retail, we secure your commercial property.",
    longDescription:
      "Valdosta businesses need fencing that provides security, defines boundaries, and presents a professional image. We install commercial fencing for warehouses, retail locations, industrial facilities, schools, and more. Our commercial team handles projects of all sizes with minimal disruption to your operations.",
    icon: Building2,
    benefits: [
      "Enhanced property security",
      "Professional appearance",
      "Liability protection",
      "Access control ready",
      "Durable commercial-grade materials",
      "Quick installation to minimize downtime",
    ],
    features: [
      "High-security chain link",
      "Ornamental commercial aluminum",
      "Anti-climb options",
      "Barbed wire and razor wire toppers",
      "Automated gate integration",
      "Crash-rated options available",
    ],
    faqs: [
      {
        question: "How quickly can you complete a commercial fence project?",
        answer:
          "Timeline depends on project scope, but most commercial fencing projects are completed within 1-2 weeks. We can often expedite for urgent security needs.",
      },
      {
        question: "Do you install security gate systems?",
        answer:
          "Yes, we install and integrate automated gate systems including card readers, keypads, and remote access controls. We work with leading access control brands.",
      },
      {
        question: "Can you work around business hours?",
        answer:
          "We schedule commercial projects to minimize disruption. For sensitive locations, we can perform work during off-hours or weekends at no additional charge.",
      },
    ],
    keywords: [
      "commercial fence Valdosta",
      "business fencing Georgia",
      "security fence contractor",
      "industrial fencing",
    ],
  },
  {
    slug: "fence-repair",
    name: "Fence Repair Services",
    shortName: "Fence Repair",
    description:
      "Don't replace – repair! Our expert team fixes storm damage, rot, leaning posts, and worn sections at a fraction of replacement cost.",
    longDescription:
      "A damaged fence doesn't always need complete replacement. Our fence repair services restore your existing fence to like-new condition, saving you money while extending its lifespan. We repair all fence types including wood, vinyl, chain link, and aluminum – from single post replacements to extensive storm damage restoration.",
    icon: Wrench,
    benefits: [
      "Save money vs. full replacement",
      "Quick turnaround time",
      "Match existing fence style",
      "Storm damage specialists",
      "All fence types serviced",
      "Free repair estimates",
    ],
    features: [
      "Post replacement and resetting",
      "Board and panel replacement",
      "Gate repair and adjustment",
      "Storm damage restoration",
      "Leaning fence correction",
      "Hardware replacement",
    ],
    faqs: [
      {
        question: "Should I repair or replace my fence?",
        answer:
          "If damage is limited to a few posts or sections, repair is usually the better value. If more than 30-40% of the fence is damaged, or if it's over 15 years old, replacement may be more cost-effective long-term.",
      },
      {
        question: "Can you match my existing fence?",
        answer:
          "In most cases, yes. We stock common fence materials and can source specialty items. For older fences with discontinued styles, we'll find the closest match possible.",
      },
      {
        question: "How quickly can you fix storm damage?",
        answer:
          "We prioritize storm damage repairs. For emergencies, we offer same-day or next-day assessment and can often begin repairs within 48-72 hours.",
      },
    ],
    keywords: [
      "fence repair Valdosta",
      "fix broken fence Georgia",
      "storm damage fence repair",
      "fence post replacement",
    ],
  },
  {
    slug: "gate-installation",
    name: "Gate Installation",
    shortName: "Gates",
    description:
      "Custom gates for every need. From simple walk-through gates to automated driveway entrances, we build and install it all.",
    longDescription:
      "A fence is only as good as its gate. We design and install custom gates to complement your fencing – from simple garden gates to grand automated driveway entrances. Our gates are built for smooth operation and lasting durability, with options for manual or automatic operation.",
    icon: DoorOpen,
    benefits: [
      "Custom sizing for any opening",
      "Manual and automatic options",
      "Matches existing fence style",
      "Heavy-duty hardware",
      "Smooth, reliable operation",
      "Security features available",
    ],
    features: [
      "Single and double swing gates",
      "Sliding gate options",
      "Automatic gate openers",
      "Keypad and remote access",
      "Heavy-duty hinges and latches",
      "Self-closing mechanisms",
    ],
    faqs: [
      {
        question: "Can you add an automatic opener to an existing gate?",
        answer:
          "In many cases, yes. We can retrofit automatic openers to existing gates, though some gates may need reinforcement or hardware upgrades to handle the motorized operation.",
      },
      {
        question: "What's better – swing or sliding gates?",
        answer:
          "Swing gates are simpler and more affordable but require clearance space. Sliding gates are better for steep driveways or tight spaces. We'll recommend the best option for your property.",
      },
      {
        question: "How do you power automatic gates?",
        answer:
          "Most automatic gates use standard 110V power with a dedicated circuit. We also offer solar-powered options for gates far from power sources.",
      },
    ],
    keywords: [
      "gate installation Valdosta",
      "automatic gate Georgia",
      "driveway gate contractor",
      "custom fence gate",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}


