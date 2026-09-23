export const company = {
  name: "AmezSoft",
  legalName: "AmezSoft Pvt Ltd",
  tagline: "We Build. You Grow.",
  supportingTagline: "Ideas Today, Better Tomorrow.",
  description:
    "AmezSoft builds modern digital products and software solutions that help businesses innovate, scale, and grow.",
  shortDescription:
    "A modern software company turning business ideas into dependable digital products.",
  siteUrl:
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://www.amezsoft.com",
  locale: "en_US",
  serviceArea: "Worldwide",
  brandAssets: {
    logoFull: "/brand/amezsoft-logo.svg",
    logoMark: "/brand/amezsoft-mark.svg",
    assetsPending: true
  },
  contact: {
    generalEmail: "amezsoft1@gmail.com",
    salesEmail: "amezsoftsales@gmail.com",
    supportEmail: "amezsoftsupport@gmail.com",
    phone: "+91 9322719784",
    whatsapp: "+91 9322719784",
    location: "Kolhapur, Maharashtra, India",
    businessHours: "Monday-Saturday, 9:30 AM-6:30 PM IST",
    preferredContactNote: "Phone, WhatsApp, email, or contact form"
  },
  legal: {
    cin: null,
    gst: null,
    registeredAddress: null,
    privacyEmail: "amezsoft1@gmail.com"
  },
  social: [
    { name: "Instagram", href: "https://www.instagram.com/amezsoft/", isPlaceholder: false }
  ]
} as const;

export const companyPlaceholders = [
  "Final logo files",
  "Verified full street address",
  "CIN and GST details, if applicable",
  "LinkedIn, Facebook, X/Twitter, and YouTube links when available",
  "Verified client testimonials",
  "Real project screenshots and measurable results"
] as const;

export function whatsappUrl(
  message = "Hi AmezSoft, I'm interested in discussing a software project."
) {
  const digits = company.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
