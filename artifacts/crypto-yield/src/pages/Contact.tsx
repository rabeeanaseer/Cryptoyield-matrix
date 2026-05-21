import { useState } from "react";
import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Building2, CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  useSeo({
    title: "Contact CryptoYield — Business Inquiries & Support",
    description: "Get in touch with the CryptoYield team for data licensing, business partnerships, press inquiries, or platform support.",
  });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");

    // Log submission for now; replace with actual backend endpoint when ready
    console.log("[CryptoYield Contact Submission]", {
      ...form,
      submittedAt: new Date().toISOString(),
    });

    await new Promise((r) => setTimeout(r, 800));
    setState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact CryptoYield</h1>
          <p className="text-muted-foreground font-mono text-sm max-w-2xl">
            Whether you have a data licensing question, a partnership proposal, or need platform support — 
            our team responds to all genuine inquiries within 2 business days.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-lg mb-6">Contact Channels</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: Mail,
                    label: "General Inquiries",
                    value: "hello@cryptoyield.com",
                    desc: "Platform questions, feedback, support"
                  },
                  {
                    icon: Building2,
                    label: "Business & Partnerships",
                    value: "partnerships@cryptoyield.com",
                    desc: "Data licensing, enterprise access, integrations"
                  },
                  {
                    icon: MessageSquare,
                    label: "Press & Media",
                    value: "press@cryptoyield.com",
                    desc: "Media inquiries, data citations, interviews"
                  },
                ].map(({ icon: Icon, label, value, desc }) => (
                  <div key={label} className="flex gap-4 p-4 border border-border rounded-lg bg-card">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-sm mb-0.5">{label}</div>
                      <div className="text-xs font-mono text-primary mb-1">{value}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg p-5 bg-card">
              <h3 className="font-bold text-sm mb-3">Response Times</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Support requests</span>
                  <span className="font-mono text-xs">24–48 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Business inquiries</span>
                  <span className="font-mono text-xs">1–2 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Press & media</span>
                  <span className="font-mono text-xs">Same business day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {state === "success" ? (
              <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-10 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h2 className="text-xl font-bold">Message Received</h2>
                <p className="text-muted-foreground font-mono text-sm max-w-sm">
                  Thank you for reaching out. We'll get back to you at the email address you provided within 2 business days.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-2 text-sm font-mono text-primary hover:underline"
                  data-testid="button-send-another"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      data-testid="input-name"
                      className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      data-testid="input-email"
                      className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    data-testid="select-subject"
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Platform Support</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="data-licensing">Data Licensing</option>
                    <option value="press">Press & Media</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry in detail..."
                    data-testid="textarea-message"
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-y"
                  />
                </div>

                <div className="text-xs font-mono text-muted-foreground">
                  By submitting this form you agree to our{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                  We will never share your information with third parties.
                </div>

                <Button
                  type="submit"
                  disabled={state === "submitting"}
                  data-testid="button-submit-contact"
                  className="w-full font-mono font-bold tracking-wide"
                >
                  {state === "submitting" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
