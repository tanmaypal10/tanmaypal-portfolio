import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com/tanmaypal", label: "GitHub", color: "hover:text-gray-600" },
  { icon: Linkedin, href: "https://linkedin.com/in/tanmaypal", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: Twitter, href: "https://twitter.com/tanmaypal", label: "Twitter", color: "hover:text-sky-500" },
  { icon: Mail, href: "mailto:hello@tanmay.dev", label: "Email", color: "hover:text-red-500" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main className="pt-20">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle size={16} className="text-primary" />
              <span className="text-sm text-primary font-medium">Let's Connect</span>
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            <motion.div 
              className="flex items-center justify-center gap-2 text-muted-foreground"
              whileHover={{ x: 10 }}
            >
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm">I typically respond within 24 hours</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div 
                className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <h3 className="font-display text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <motion.div 
                  className="w-1 h-8 bg-primary rounded-full"
                  initial={{ height: 0 }}
                  animate={{ height: 32 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                Let's Start a Conversation
              </h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Whether you have a question, want to discuss a project, or just
                want to say hello, I'm always open to new opportunities and
                connections.
              </p>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-sm text-muted-foreground mb-6 font-medium">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/50 text-muted-foreground ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl hover:border-primary/50`}
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <motion.div 
                className="absolute -top-4 -right-4 w-12 h-12 bg-secondary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.form 
                onSubmit={handleSubmit} 
                className="card-glow p-8 md:p-10 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 1 }}
                />
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                    <motion.div 
                      className="w-1 h-6 bg-primary rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: 24 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    Send me a message
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <motion.div 
                      className="relative"
                      animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence>
                        {focusedField === 'name' && (
                          <motion.div 
                            className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:shadow-md"
                        placeholder="John Doe"
                      />
                    </motion.div>
                    <motion.div 
                      className="relative"
                      animate={{ scale: focusedField === 'email' ? 1.02 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatePresence>
                        {focusedField === 'email' && (
                          <motion.div 
                            className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                      <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:shadow-md"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    className="relative mb-6"
                    animate={{ scale: focusedField === 'subject' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence>
                      {focusedField === 'subject' && (
                        <motion.div 
                          className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      required
                      className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:shadow-md"
                      placeholder="Project Inquiry"
                    />
                  </motion.div>

                  <motion.div 
                    className="relative mb-8"
                    animate={{ scale: focusedField === 'message' ? 1.02 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AnimatePresence>
                      {focusedField === 'message' && (
                        <motion.div 
                          className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </AnimatePresence>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                      rows={6}
                      className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none shadow-sm hover:shadow-md"
                      placeholder="Tell me about your project..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-glow flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="submitting"
                          initial={{ opacity: 0, rotate: 0 }}
                          animate={{ opacity: 1, rotate: 360 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Send size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Sending...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send-text"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
