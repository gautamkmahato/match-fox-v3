// lib/dodo/constants.js

export const PRODUCT_METADATA = {
  // Monthly Plans
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_MONTHLY]: {
    plan: "Basic",
    credits: 9000,
    price: 1500,
  },
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_PROFESSIONAL_MONTHLY]: {
    plan: "Professional",
    credits: 27000,
    price: 3999,
  },
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_ENTERPRISE_MONTHLY]: {
    plan: "Enterprise",
    credits: 120000,
    price: 14999,
  },
  // Yearly Plans
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_BASIC_YEARLY]: {
    plan: "Basic",
    credits: 108000,
    price: 15000,
  },
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_PROFESSIONAL_YEARLY]: {
    plan: "Professional",
    credits: 324000,
    price: 39999,
  },
  [process.env.NEXT_PUBLIC_DODO_PAYMENTS_ENTERPRISE_YEARLY]: {
    plan: "Enterprise",
    credits: 1440000,
    price: 149999,
  },
};
