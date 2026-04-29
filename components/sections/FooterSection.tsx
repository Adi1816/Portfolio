"use client";

import { Check, Copy, FileText, Mail, Server } from "lucide-react";
import { useState } from "react";
import { siteProfile, socialLinks } from "@/data/portfolio";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

export function FooterSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(siteProfile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="story-section footer-section" id="handshake">
      <RevealText className="copy-block centered">
        <SectionEyebrow>System Handshake</SectionEyebrow>
        <h2>Ready to Build the Future.</h2>
        <p>
          Software Development Engineer in Bangalore, India. Available for systems, platforms, intelligent products, and ambitious engineering conversations.
        </p>
      </RevealText>

      <RevealText className="command-center">
        <div className="command-primary">
          <div className="command-primary-copy">
            <span>Direct Access</span>
            <p>{siteProfile.email}</p>
          </div>
          <div className="command-actions-row">
            <a className="command-action-primary" href={siteProfile.resumeHref} rel="noreferrer" target="_blank">
              <FileText size={18} />
              View Resume
            </a>
            <button onClick={copyEmail} type="button">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy Email"}
            </button>
            <a href={`mailto:${siteProfile.email}`}>
              <Mail size={18} />
              Send Email
            </a>
          </div>
        </div>

        <div className="command-terminal">
          <span>contact.protocol</span>
          <p>identity: Aditya Srivastava</p>
          <p>location: {siteProfile.location}</p>
          <p>channel: resume, email, project demos</p>
          <p>response: direct engineering conversation</p>
        </div>
      </RevealText>

      <RevealText className="contact-card">
        {socialLinks
          .filter((item) => !["Contact", "Resume"].includes(item.label))
          .map((item) => (
            <MagneticLink item={item} key={item.label} />
          ))}
      </RevealText>
      <div className="boot-success">
        <Server size={15} />
        System Boot Success - {siteProfile.location}
      </div>
    </section>
  );
}
