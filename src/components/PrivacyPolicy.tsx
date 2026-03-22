import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-ivory/95 overflow-y-auto p-8 md:p-16"
    >
      <button 
        onClick={onClose}
        className="fixed top-7 right-7 w-10 h-10 border border-ink/15 rounded-full flex items-center justify-center text-ink hover:bg-ink/5 transition-colors z-[1001]"
      >
        <X size={20} />
      </button>
      
      <div className="max-w-2xl mx-auto text-ink">
        <h1 className="font-serif text-5xl font-normal mb-8">Privacy Policy</h1>
        <p className="text-sm leading-relaxed text-grey2 mb-4">Last updated: 2025. Prosify is committed to protecting your privacy and handling your data with transparency.</p>
        
        <h2 className="font-serif text-2xl font-normal mt-8 mb-3">Information We Collect</h2>
        <p className="text-sm leading-relaxed text-grey2 mb-4">We collect information you provide directly to us, such as when you contact us via email or fill out an inquiry form — including your name, email address, and message content.</p>
        
        <h2 className="font-serif text-2xl font-normal mt-8 mb-3">How We Use Your Information</h2>
        <p className="text-sm leading-relaxed text-grey2 mb-4">We use the information we collect solely to respond to your inquiries, deliver our services, and improve your experience with Prosify. We do not sell or share your data with third parties.</p>
        
        <h2 className="font-serif text-2xl font-normal mt-8 mb-3">Data Security</h2>
        <p className="text-sm leading-relaxed text-grey2 mb-4">We implement appropriate technical measures to protect your information against unauthorized access, alteration, or disclosure.</p>
        
        <h2 className="font-serif text-2xl font-normal mt-8 mb-3">Contact Us</h2>
        <p className="text-sm leading-relaxed text-grey2 mb-4">For any privacy-related questions, reach us at <a href="mailto:contactprosify@gmail.com" className="text-gold">contactprosify@gmail.com</a>.</p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
