import Head from "next/head";
import "@nextcss/reset";
import { MainBanner } from "../components/main/MainBanner";
import Footer from "../components/main/Footer";
import Image from "next/image";

import classes from "../styles/mainpage/contact.module.css";

import brand from "../styles/images/iconblack.png";
import pin from "../styles/images/pin.png";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. Thank you!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.message ||
          "Unable to send message right now. You can email us directly instead.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Contact | O&apos;CLOCK PRODUCTION</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* same top nav as homepage */}
      <MainBanner />

      <main className={classes.page}>
        <div className={classes.wrapper}>
          {/* LEFT PANEL – info / brand */}
          <section className={classes.leftPanel}>
            <div className={classes.brandBlock}>
              <Image
                src={brand}
                alt="O'CLOCK Production"
                className={classes.brandLogo}
              />
              <h1 className={classes.heading}>Let&apos;s work together.</h1>
              <p className={classes.subheading}>
                Share your ideas, projects, or questions — we&apos;ll get back
                to you as soon as possible.
              </p>
            </div>

            <div className={classes.infoBlock}>
              <div className={classes.infoItem}>
                <Image src={pin} alt="Location pin" className={classes.icon} />
                <div>
                  <p className={classes.infoLabel}>Location</p>
                  <p className={classes.infoText}>Saigon, Vietnam</p>
                </div>
              </div>

              <div className={classes.infoItem}>
                <span className={classes.iconCircle}>✉︎</span>
                <div>
                  <p className={classes.infoLabel}>Email</p>
                  <p className={classes.infoText}>
                    oclockproduction.info@gmail.com
                  </p>
                </div>
              </div>

              <div className={classes.infoItem}>
                <span className={classes.iconCircle}>⏱</span>
                <div>
                  <p className={classes.infoLabel}>Availability</p>
                  <p className={classes.infoText}>
                    Mon – Fri · 10:00 – 18:00 (GMT+7)
                  </p>
                </div>
              </div>
            </div>

            <p className={classes.note}>
              Prefer to email directly? Reach us at{" "}
              <span className={classes.highlight}>
                oclockproduction.info@gmail.com
              </span>
              .
            </p>
          </section>

          {/* RIGHT PANEL – form */}
          <section className={classes.rightPanel}>
            <h2 className={classes.formTitle}>Contact</h2>
            <p className={classes.formDescription}>
              Fill in the form below and we&apos;ll get back to you via email.
            </p>

            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <label htmlFor="name">
                    Name <span className={classes.required}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={classes.formGroup}>
                  <label htmlFor="email">
                    Email <span className={classes.required}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project, collaboration, question..."
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className={classes.formGroup}>
                <label htmlFor="message">
                  Message <span className={classes.required}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a bit about what you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status.message && (
                <p
                  className={
                    status.type === "success"
                      ? classes.statusSuccess
                      : classes.statusError
                  }
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                className={classes.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
