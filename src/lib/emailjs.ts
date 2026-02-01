import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Replace these with your actual EmailJS credentials from your dashboard
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'qZIYhXxrpZsJvqR3G', // Your EmailJS public key
  SERVICE_ID: 'service_7js25ap', // Your Gmail service ID
  TEMPLATE_ID: 'template_x85vgiq' // Your email template ID
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// Send email function
export const sendEmail = async (formData: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  to_name?: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject,
        message: formData.message,
        to_name: formData.to_name || 'Sathish', // Your name as recipient
        reply_to: formData.from_email,
      }
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};