import { motion } from "framer-motion";

const RefundPolicy = () => (
  <section className="section-padding pt-32 bg-background">
    <div className="container mx-auto max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">Refund Policy</h1>
        <div className="prose prose-lg text-muted-foreground space-y-6">
          <p><strong className="text-foreground">Last updated:</strong> March 2026</p>
          <p>
            This Refund Policy outlines the terms and conditions under which refunds may or may not be issued by PerformanceAura ("the Agency") for services rendered to clients ("the Client"). By engaging our services, you agree to the terms stated herein.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">1. Advance Payment</h2>
          <p>
            The Client is required to pay a minimum of 50% (fifty percent) of the total project cost as an advance before the commencement of any work. This advance payment secures the project slot and initiates the strategy development process.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">2. Non-Refundable Conditions</h2>
          <p>
            Once the strategy discussion and initial consultation meeting has been completed and the advance payment has been received by the Agency, the payment is <strong className="text-foreground">non-refundable</strong> if the Client decides to cancel the project at any stage thereafter. This includes but is not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Change of business direction or priorities by the Client.</li>
            <li>The Client's decision to discontinue the project for personal or business reasons.</li>
            <li>Failure of the Client to provide necessary materials, approvals, or access required for project execution.</li>
            <li>Disagreement on creative direction after strategy has been finalized.</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-foreground">3. Refund Eligibility — Before Work Begins</h2>
          <p>
            If the Client requests cancellation <strong className="text-foreground">before</strong> any work has commenced (i.e., prior to the strategy meeting and before any deliverables have been initiated), a refund may be considered at the sole discretion of the Agency, subject to a 10% administrative and processing fee.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">4. Refund Eligibility — Agency Default</h2>
          <p>
            In the event that the Agency fails to deliver the promised services due to internal issues, operational failures, or any reason solely attributable to the Agency, a full or partial refund may be processed. The refund amount will be determined based on the proportion of work completed versus the total project scope.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">5. Course & Digital Product Purchases</h2>
          <p>
            All purchases of digital courses, templates, guides, and downloadable resources are <strong className="text-foreground">final and non-refundable</strong> once access has been granted. If you experience technical issues accessing your purchase, please contact our support team for assistance.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">6. Dispute Resolution</h2>
          <p>
            In the event of a dispute regarding refunds, both parties agree to resolve the matter amicably through discussion. If no resolution is reached, the matter shall be subject to the jurisdiction of the courts in Noida, Uttar Pradesh, India.
          </p>

          <h2 className="font-display text-2xl font-semibold text-foreground">7. Contact</h2>
          <p>
            For refund-related inquiries, please contact us at{" "}
            <a href="mailto:hello@performanceaura.com" className="text-primary hover:underline">hello@performanceaura.com</a>.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default RefundPolicy;
