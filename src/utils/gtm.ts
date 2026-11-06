declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Pushes an Enhanced Conversion event to the GTM dataLayer.
 * Call this AFTER successful form submission (API returns success),
 * BEFORE any page redirect.
 */
export function pushEnhancedConversion(data: {
  email: string;
  phone: string;
  name: string;
}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "Enhanced_form",
    enhanced_conversions_data: {
      email: data.email.trim().toLowerCase(),
      phone_number: data.phone.startsWith("+") ? data.phone.replace(/[\s\-]/g, "") : `+${data.phone.replace(/[\s\-]/g, "")}`,
      full_name: data.name.trim(),
    },
  });
}
