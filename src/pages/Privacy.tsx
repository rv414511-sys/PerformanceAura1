import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <section className="section-padding pt-32 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-muted-foreground space-y-6">
            <p><strong className="text-foreground">Last updated:</strong> February 2026</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, phone number, and company name when you fill out contact forms or create an account.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use collected information to provide our services, communicate with you, improve our website, and send relevant marketing communications with your consent.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">3. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">4. Cookies</h2>
            <p>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
            <p>We may share data with trusted third-party service providers who help us operate our business, such as analytics providers and email services. They are contractually obligated to protect your data.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@growthpulse.com for any data-related requests.</p>

            <h2 className="font-display text-2xl font-semibold text-foreground">7. Contact</h2>
            <p>For questions about this policy, email us at <a href="mailto:privacy@growthpulse.com" className="text-primary hover:underline">privacy@growthpulse.com</a>.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
