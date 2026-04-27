import { Server } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { RevealText } from "@/components/primitives/RevealText";
import { SectionEyebrow } from "@/components/primitives/SectionEyebrow";

export function FooterSection() {
  return (
    <section className="story-section footer-section" id="handshake">
      <RevealText className="copy-block centered">
        <SectionEyebrow>System Handshake</SectionEyebrow>
        <h2>Ready to Build the Future.</h2>
        <p>
          Software Development Engineer in Bangalore, India. Available for systems, platforms, intelligent products, and ambitious engineering conversations.
        </p>
      </RevealText>
      <RevealText className="contact-card">
        {socialLinks.map((item) => (
          <MagneticLink item={item} key={item.label} />
        ))}
      </RevealText>
      <div className="boot-success">
        <Server size={15} />
        System Boot Success - Bangalore, India
      </div>
    </section>
  );
}
