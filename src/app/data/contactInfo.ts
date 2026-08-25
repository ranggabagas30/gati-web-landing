const EMAIL = 'wearegati@gmail.com';
const WHATSAPP_NUMBER = '628978991119';
const SCHEDULE_SUBJECT = 'Product Consultation Request';
const SCHEDULE_BODY = "Hi GATI, I'd like to book a free 30-minute product consultation.";

export const CONTACT = {
  email: EMAIL,
  emailHref: `mailto:${EMAIL}`,
  // Default action for every "Schedule a conversation" CTA — opens an email
  // compose pre-filled with subject/body, matching v1's book-a-call intent.
  scheduleHref: `mailto:${EMAIL}?subject=${encodeURIComponent(SCHEDULE_SUBJECT)}&body=${encodeURIComponent(SCHEDULE_BODY)}`,
  whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(SCHEDULE_BODY)}`,
  instagramHref: 'https://www.instagram.com/appbygati/',
  linkedinHref: 'https://www.linkedin.com/company/appbygati',
};
