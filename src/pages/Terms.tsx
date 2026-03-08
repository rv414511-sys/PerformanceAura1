import { motion } from "framer-motion";

const Terms = () => (
  <section className="section-padding pt-32 bg-background">
    <div className="container mx-auto max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Terms & Conditions</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> March 2026</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By accessing or using the PerformanceAura website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">2. Services</h2>
          <p>PerformanceAura provides digital marketing services including but not limited to Meta Ads management, Google Ads management, performance marketing, content writing, video editing, social media marketing, and web design. The scope of services for each client is defined in the individual project agreement.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">3. Client Responsibilities</h2>
          <p>Clients are responsible for providing accurate information, timely feedback, necessary access to platforms and tools, and all materials required for the execution of services. Delays caused by the Client may affect project timelines.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">4. Payment Terms</h2>
          <p>A minimum of 50% advance payment is required before project commencement. The remaining balance is due upon completion or as agreed in the project contract. All payments are in Indian Rupees (INR) unless otherwise specified.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">5. Intellectual Property</h2>
          <p>All deliverables created by PerformanceAura become the property of the Client upon full payment. PerformanceAura reserves the right to showcase completed work in its portfolio unless the Client explicitly requests otherwise in writing.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">6. Confidentiality</h2>
          <p>Both parties agree to keep confidential all proprietary information shared during the engagement. This includes business strategies, campaign data, financial information, and trade secrets.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">7. Limitation of Liability</h2>
          <p>PerformanceAura shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the total amount paid by the Client for the specific service in question.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">8. Termination</h2>
          <p>Either party may terminate the engagement with 15 days' written notice. In case of termination, the Client shall pay for all work completed up to the termination date. Refund terms are governed by our Refund Policy.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">9. Governing Law</h2>
          <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.</p>

          <h2 className="font-display text-2xl font-semibold text-foreground">10. Contact</h2>
          <p>For questions about these Terms, email us at <a href="mailto:hello@performanceaura.com" className="text-primary hover:underline">hello@performanceaura.com</a>.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Terms;
