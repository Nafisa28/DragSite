import { PageData } from "@/types/editor";

export const portfolioTemplate: PageData = {
  id: "tpl-portfolio",
  sections: [
    {
      id: "sec-hero",
      type: "hero",
      style: {
        backgroundColor: "#0f0f0f",
        padding: "120px 0",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      },
      columns: [
        {
          id: "col-hero-1",
          width: "100%",
          style: { textAlign: "center", maxWidth: "800px", margin: "0 auto" },
          widgets: [
            {
              id: "w-hero-tag",
              type: "text",
              content: "👋 Available for hire",
              style: {
                color: "#a78bfa",
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "16px",
              },
            },
            {
              id: "w-hero-heading",
              type: "heading",
              content: "Hi, I'm Alex Chen",
              style: {
                color: "#ffffff",
                fontSize: "72px",
                fontWeight: "800",
                lineHeight: "1.1",
                marginBottom: "24px",
              },
            },
            {
              id: "w-hero-sub",
              type: "text",
              content:
                "Full-Stack Developer & UI Designer crafting beautiful digital experiences.",
              style: {
                color: "#9ca3af",
                fontSize: "20px",
                lineHeight: "1.7",
                marginBottom: "40px",
              },
            },
            {
              id: "w-hero-btn",
              type: "button",
              content: "View My Work",
              style: {
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                padding: "16px 40px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-about",
      type: "section",
      style: { backgroundColor: "#111827", padding: "100px 0" },
      columns: [
        {
          id: "col-about-1",
          width: "50%",
          style: { padding: "0 40px" },
          widgets: [
            {
              id: "w-about-label",
              type: "text",
              content: "ABOUT ME",
              style: {
                color: "#7c3aed",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "3px",
                marginBottom: "16px",
              },
            },
            {
              id: "w-about-heading",
              type: "heading",
              content: "Passionate about clean code & great design",
              style: {
                color: "#f9fafb",
                fontSize: "40px",
                fontWeight: "700",
                lineHeight: "1.2",
                marginBottom: "24px",
              },
            },
            {
              id: "w-about-text",
              type: "text",
              content:
                "With 5+ years of experience, I specialize in building scalable web applications using React, Node.js, and modern cloud infrastructure. I care deeply about performance, accessibility, and the details that make products feel alive.",
              style: {
                color: "#9ca3af",
                fontSize: "16px",
                lineHeight: "1.8",
              },
            },
          ],
        },
        {
          id: "col-about-2",
          width: "50%",
          style: { padding: "0 40px" },
          widgets: [
            {
              id: "w-skill-1",
              type: "text",
              content: "React / Next.js",
              style: {
                color: "#f9fafb",
                fontSize: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #1f2937",
              },
            },
            {
              id: "w-skill-2",
              type: "text",
              content: "TypeScript",
              style: {
                color: "#f9fafb",
                fontSize: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #1f2937",
              },
            },
            {
              id: "w-skill-3",
              type: "text",
              content: "Node.js / Express",
              style: {
                color: "#f9fafb",
                fontSize: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #1f2937",
              },
            },
            {
              id: "w-skill-4",
              type: "text",
              content: "PostgreSQL / Supabase",
              style: {
                color: "#f9fafb",
                fontSize: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #1f2937",
              },
            },
            {
              id: "w-skill-5",
              type: "text",
              content: "UI / UX Design",
              style: {
                color: "#f9fafb",
                fontSize: "16px",
                padding: "12px 0",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-cta",
      type: "section",
      style: {
        backgroundColor: "#7c3aed",
        padding: "100px 0",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-cta",
          width: "100%",
          style: { maxWidth: "600px", margin: "0 auto" },
          widgets: [
            {
              id: "w-cta-heading",
              type: "heading",
              content: "Let's work together",
              style: {
                color: "#ffffff",
                fontSize: "48px",
                fontWeight: "700",
                marginBottom: "20px",
              },
            },
            {
              id: "w-cta-text",
              type: "text",
              content: "Have a project in mind? I'd love to hear about it.",
              style: {
                color: "#ede9fe",
                fontSize: "18px",
                marginBottom: "40px",
              },
            },
            {
              id: "w-cta-btn",
              type: "button",
              content: "Get In Touch",
              style: {
                backgroundColor: "#ffffff",
                color: "#7c3aed",
                padding: "16px 40px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const businessTemplate: PageData = {
  id: "tpl-business",
  sections: [
    {
      id: "sec-nav",
      type: "section",
      style: {
        backgroundColor: "#ffffff",
        padding: "20px 60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
      },
      columns: [
        {
          id: "col-nav-logo",
          width: "30%",
          style: {},
          widgets: [
            {
              id: "w-logo",
              type: "heading",
              content: "Nexus Co.",
              style: {
                color: "#111827",
                fontSize: "24px",
                fontWeight: "800",
              },
            },
          ],
        },
        {
          id: "col-nav-cta",
          width: "20%",
          style: { textAlign: "right" },
          widgets: [
            {
              id: "w-nav-btn",
              type: "button",
              content: "Get Started",
              style: {
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "10px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-hero",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
        padding: "120px 60px",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-hero",
          width: "100%",
          style: { maxWidth: "750px", margin: "0 auto" },
          widgets: [
            {
              id: "w-hero-h",
              type: "heading",
              content: "Grow Your Business With Confidence",
              style: {
                color: "#ffffff",
                fontSize: "60px",
                fontWeight: "800",
                lineHeight: "1.15",
                marginBottom: "24px",
              },
            },
            {
              id: "w-hero-p",
              type: "text",
              content:
                "We provide enterprise-grade solutions that scale with your ambitions. From strategy to execution — we're your growth partner.",
              style: {
                color: "#bfdbfe",
                fontSize: "18px",
                lineHeight: "1.7",
                marginBottom: "48px",
              },
            },
            {
              id: "w-hero-btn1",
              type: "button",
              content: "Start Free Trial",
              style: {
                backgroundColor: "#ffffff",
                color: "#1e40af",
                padding: "16px 40px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
                marginRight: "16px",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-services",
      type: "section",
      style: { backgroundColor: "#f9fafb", padding: "100px 60px" },
      columns: [
        {
          id: "col-s1",
          width: "33%",
          style: {
            padding: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            margin: "0 12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          },
          widgets: [
            {
              id: "w-s1-icon",
              type: "text",
              content: "🚀",
              style: { fontSize: "40px", marginBottom: "16px" },
            },
            {
              id: "w-s1-h",
              type: "heading",
              content: "Strategy",
              style: {
                color: "#111827",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "12px",
              },
            },
            {
              id: "w-s1-p",
              type: "text",
              content:
                "Data-driven strategies tailored to your market and growth goals.",
              style: { color: "#6b7280", fontSize: "15px", lineHeight: "1.7" },
            },
          ],
        },
        {
          id: "col-s2",
          width: "33%",
          style: {
            padding: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            margin: "0 12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          },
          widgets: [
            {
              id: "w-s2-icon",
              type: "text",
              content: "💡",
              style: { fontSize: "40px", marginBottom: "16px" },
            },
            {
              id: "w-s2-h",
              type: "heading",
              content: "Innovation",
              style: {
                color: "#111827",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "12px",
              },
            },
            {
              id: "w-s2-p",
              type: "text",
              content:
                "Cutting-edge technology solutions to keep you ahead of the competition.",
              style: { color: "#6b7280", fontSize: "15px", lineHeight: "1.7" },
            },
          ],
        },
        {
          id: "col-s3",
          width: "33%",
          style: {
            padding: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            margin: "0 12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          },
          widgets: [
            {
              id: "w-s3-icon",
              type: "text",
              content: "📈",
              style: { fontSize: "40px", marginBottom: "16px" },
            },
            {
              id: "w-s3-h",
              type: "heading",
              content: "Growth",
              style: {
                color: "#111827",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "12px",
              },
            },
            {
              id: "w-s3-p",
              type: "text",
              content:
                "Measurable results and transparent reporting at every step.",
              style: { color: "#6b7280", fontSize: "15px", lineHeight: "1.7" },
            },
          ],
        },
      ],
    },
  ],
};

export const landingPageTemplate: PageData = {
  id: "tpl-landing",
  sections: [
    {
      id: "sec-hero",
      type: "hero",
      style: {
        background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 100%)",
        padding: "140px 60px",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-hero",
          width: "100%",
          style: { maxWidth: "800px", margin: "0 auto" },
          widgets: [
            {
              id: "w-badge",
              type: "text",
              content: "✨ Now in Public Beta",
              style: {
                display: "inline-block",
                backgroundColor: "rgba(167,139,250,0.15)",
                color: "#a78bfa",
                padding: "6px 16px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "600",
                marginBottom: "32px",
                border: "1px solid rgba(167,139,250,0.3)",
              },
            },
            {
              id: "w-hero-h",
              type: "heading",
              content: "Ship Faster. Scale Smarter.",
              style: {
                color: "#ffffff",
                fontSize: "72px",
                fontWeight: "900",
                lineHeight: "1.05",
                marginBottom: "24px",
                letterSpacing: "-2px",
              },
            },
            {
              id: "w-hero-p",
              type: "text",
              content:
                "The platform built for modern teams who want to move fast without breaking things. Zero config, infinite scale.",
              style: {
                color: "#94a3b8",
                fontSize: "20px",
                lineHeight: "1.7",
                marginBottom: "48px",
              },
            },
            {
              id: "w-cta-btn",
              type: "button",
              content: "Start for Free →",
              style: {
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                color: "#ffffff",
                padding: "18px 48px",
                borderRadius: "12px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 40px rgba(124,58,237,0.4)",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-features",
      type: "section",
      style: { backgroundColor: "#0f172a", padding: "100px 60px" },
      columns: [
        {
          id: "col-feat-header",
          width: "100%",
          style: { textAlign: "center", marginBottom: "60px" },
          widgets: [
            {
              id: "w-feat-h",
              type: "heading",
              content: "Everything you need",
              style: {
                color: "#f8fafc",
                fontSize: "48px",
                fontWeight: "800",
                marginBottom: "16px",
              },
            },
            {
              id: "w-feat-p",
              type: "text",
              content: "No duct tape. No workarounds. Just the right tools.",
              style: { color: "#64748b", fontSize: "18px" },
            },
          ],
        },
      ],
    },
  ],
};

export const comingSoonTemplate: PageData = {
  id: "tpl-coming-soon",
  sections: [
    {
      id: "sec-main",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)",
        minHeight: "100vh",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-main",
          width: "100%",
          style: { maxWidth: "600px", margin: "0 auto", padding: "40px" },
          widgets: [
            {
              id: "w-logo-text",
              type: "heading",
              content: "🌟 MyBrand",
              style: {
                color: "#fbbf24",
                fontSize: "32px",
                fontWeight: "800",
                marginBottom: "60px",
              },
            },
            {
              id: "w-main-h",
              type: "heading",
              content: "Something Amazing\nis Coming Soon",
              style: {
                color: "#fafaf9",
                fontSize: "56px",
                fontWeight: "900",
                lineHeight: "1.1",
                marginBottom: "24px",
              },
            },
            {
              id: "w-main-p",
              type: "text",
              content:
                "We're working hard to launch something you'll love. Be the first to know.",
              style: {
                color: "#78716c",
                fontSize: "18px",
                lineHeight: "1.7",
                marginBottom: "48px",
              },
            },
            {
              id: "w-notify-btn",
              type: "button",
              content: "Notify Me",
              style: {
                backgroundColor: "#fbbf24",
                color: "#0c0a09",
                padding: "16px 48px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
  ],
};

export const restaurantTemplate: PageData = {
  id: "tpl-restaurant",
  sections: [
    {
      id: "sec-restaurant-hero",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)",
        padding: "100px 60px",
        color: "#ffffff",
      },
      columns: [
        {
          id: "col-restaurant-hero",
          width: "100%",
          style: { maxWidth: "800px", margin: "0 auto" },
          widgets: [
            {
              id: "w-rest-tag",
              type: "text",
              content: "Finest dining experience",
              style: {
                color: "#93c5fd",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              },
            },
            {
              id: "w-rest-heading",
              type: "heading",
              content: "A menu worth savoring",
              style: {
                color: "#ffffff",
                fontSize: "64px",
                fontWeight: "800",
                lineHeight: "1.05",
                marginBottom: "24px",
              },
            },
            {
              id: "w-rest-copy",
              type: "text",
              content:
                "Elegant seasonal dishes, curated for every occasion. Reserve a table or explore our chef's specials.",
              style: {
                color: "#cbd5e1",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              },
            },
            {
              id: "w-rest-btn",
              type: "button",
              content: "Book a table",
              style: {
                backgroundColor: "#ffffff",
                color: "#1e3a8a",
                padding: "16px 44px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-menu",
      type: "section",
      style: { backgroundColor: "#0f172a", padding: "80px 60px" },
      columns: [
        {
          id: "col-menu-1",
          width: "33%",
          style: { padding: "24px", margin: "0 12px", backgroundColor: "#111827", borderRadius: "24px" },
          widgets: [
            {
              id: "w-menu-card-1",
              type: "heading",
              content: "Seasonal starters",
              style: {
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "16px",
              },
            },
            {
              id: "w-menu-copy-1",
              type: "text",
              content: "Fresh flavors that celebrate local ingredients and thoughtful preparation.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-menu-2",
          width: "33%",
          style: { padding: "24px", margin: "0 12px", backgroundColor: "#111827", borderRadius: "24px" },
          widgets: [
            {
              id: "w-menu-card-2",
              type: "heading",
              content: "Main courses",
              style: {
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "16px",
              },
            },
            {
              id: "w-menu-copy-2",
              type: "text",
              content: "Handcrafted entrees designed to impress, whether you're celebrating or dining casually.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-menu-3",
          width: "33%",
          style: { padding: "24px", margin: "0 12px", backgroundColor: "#111827", borderRadius: "24px" },
          widgets: [
            {
              id: "w-menu-card-3",
              type: "heading",
              content: "Signature desserts",
              style: {
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
                marginBottom: "16px",
              },
            },
            {
              id: "w-menu-copy-3",
              type: "text",
              content: "Finish your evening with elegant sweets and drinks crafted by our pastry team.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    },
  ],
};

export const blogTemplate: PageData = {
  id: "tpl-blog",
  sections: [
    {
      id: "sec-blog-hero",
      type: "hero",
      style: {
        backgroundColor: "#ffffff",
        padding: "100px 60px",
        color: "#0f172a",
      },
      columns: [
        {
          id: "col-blog-hero",
          width: "100%",
          style: { maxWidth: "760px", margin: "0 auto" },
          widgets: [
            {
              id: "w-blog-overline",
              type: "text",
              content: "Insights & stories",
              style: {
                color: "#8b5cf6",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              },
            },
            {
              id: "w-blog-heading",
              type: "heading",
              content: "Words that spark ideas",
              style: {
                color: "#0f172a",
                fontSize: "64px",
                fontWeight: "900",
                lineHeight: "1.05",
                marginBottom: "24px",
              },
            },
            {
              id: "w-blog-copy",
              type: "text",
              content:
                "A modern blog layout for sharing expertise, launch updates, and creative thinking.",
              style: {
                color: "#475569",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              },
            },
            {
              id: "w-blog-btn",
              type: "button",
              content: "Browse posts",
              style: {
                backgroundColor: "#7c3aed",
                color: "#ffffff",
                padding: "16px 44px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-blog-posts",
      type: "section",
      style: { backgroundColor: "#f8fafc", padding: "80px 60px" },
      columns: [
        {
          id: "col-blog-1",
          width: "33%",
          style: { padding: "30px", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)", margin: "0 12px" },
          widgets: [
            {
              id: "w-blog-post-1",
              type: "heading",
              content: "Design systems that scale",
              style: { color: "#0f172a", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-blog-excerpt-1",
              type: "text",
              content: "Build consistent interfaces with smart, reusable patterns.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-blog-2",
          width: "33%",
          style: { padding: "30px", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)", margin: "0 12px" },
          widgets: [
            {
              id: "w-blog-post-2",
              type: "heading",
              content: "Launching with confidence",
              style: { color: "#0f172a", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-blog-excerpt-2",
              type: "text",
              content: "A practical guide to launching product updates that feel polished.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-blog-3",
          width: "33%",
          style: { padding: "30px", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 18px 50px rgba(15,23,42,0.08)", margin: "0 12px" },
          widgets: [
            {
              id: "w-blog-post-3",
              type: "heading",
              content: "Storytelling for brands",
              style: { color: "#0f172a", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-blog-excerpt-3",
              type: "text",
              content: "Communicate your values and build trust through smart narratives.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    },
  ],
};

export const agencyTemplate: PageData = {
  id: "tpl-agency",
  sections: [
    {
      id: "sec-agency-hero",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #090909 0%, #4f46e5 100%)",
        padding: "110px 60px",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-agency-hero",
          width: "100%",
          style: { maxWidth: "760px", margin: "0 auto" },
          widgets: [
            {
              id: "w-agency-label",
              type: "text",
              content: "Agency website",
              style: {
                color: "#c7d2fe",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              },
            },
            {
              id: "w-agency-heading",
              type: "heading",
              content: "Strategy, design, and growth — aligned.",
              style: {
                color: "#ffffff",
                fontSize: "62px",
                fontWeight: "900",
                lineHeight: "1.05",
                marginBottom: "24px",
              },
            },
            {
              id: "w-agency-copy",
              type: "text",
              content:
                "A polished digital presence for agencies that want to stand out and book bigger clients.",
              style: {
                color: "#cbd5e1",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              },
            },
            {
              id: "w-agency-btn",
              type: "button",
              content: "View services",
              style: {
                backgroundColor: "#ffffff",
                color: "#3730a3",
                padding: "16px 44px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-agency-services",
      type: "section",
      style: { backgroundColor: "#0f172a", padding: "80px 60px" },
      columns: [
        {
          id: "col-agency-1",
          width: "33%",
          style: { padding: "28px", backgroundColor: "#111827", borderRadius: "24px", margin: "0 12px" },
          widgets: [
            {
              id: "w-agency-service-1",
              type: "heading",
              content: "Brand strategy",
              style: { color: "#ffffff", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-agency-service-copy-1",
              type: "text",
              content: "Create distinctive positioning that connects with your ideal audience.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-agency-2",
          width: "33%",
          style: { padding: "28px", backgroundColor: "#111827", borderRadius: "24px", margin: "0 12px" },
          widgets: [
            {
              id: "w-agency-service-2",
              type: "heading",
              content: "Product design",
              style: { color: "#ffffff", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-agency-service-copy-2",
              type: "text",
              content: "Beautiful interfaces that feel intuitive and polished.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-agency-3",
          width: "33%",
          style: { padding: "28px", backgroundColor: "#111827", borderRadius: "24px", margin: "0 12px" },
          widgets: [
            {
              id: "w-agency-service-3",
              type: "heading",
              content: "Growth marketing",
              style: { color: "#ffffff", fontSize: "22px", fontWeight: "700", marginBottom: "16px" },
            },
            {
              id: "w-agency-service-copy-3",
              type: "text",
              content: "Campaigns and messaging designed to move the needle.",
              style: { color: "#cbd5e1", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    },
  ],
};

export const eventTemplate: PageData = {
  id: "tpl-event",
  sections: [
    {
      id: "sec-event-hero",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #111827 0%, #7c3aed 100%)",
        padding: "100px 60px",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-event-hero",
          width: "100%",
          style: { maxWidth: "760px", margin: "0 auto" },
          widgets: [
            {
              id: "w-event-label",
              type: "text",
              content: "Featured event",
              style: {
                color: "#c4b5fd",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              },
            },
            {
              id: "w-event-heading",
              type: "heading",
              content: "Join us for an unforgettable evening",
              style: {
                color: "#ffffff",
                fontSize: "58px",
                fontWeight: "900",
                lineHeight: "1.05",
                marginBottom: "24px",
              },
            },
            {
              id: "w-event-copy",
              type: "text",
              content:
                "Inspiring speakers, curated programming, and networking designed for ambitious teams.",
              style: {
                color: "#dbeafe",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              },
            },
            {
              id: "w-event-btn",
              type: "button",
              content: "Reserve your spot",
              style: {
                backgroundColor: "#ffffff",
                color: "#4f46e5",
                padding: "16px 44px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-event-schedule",
      type: "section",
      style: { backgroundColor: "#0f172a", padding: "80px 60px" },
      columns: [
        {
          id: "col-event-1",
          width: "100%",
          style: { padding: "30px", backgroundColor: "#111827", borderRadius: "24px" },
          widgets: [
            {
              id: "w-event-schedule-h",
              type: "heading",
              content: "Agenda highlights",
              style: { color: "#ffffff", fontSize: "28px", fontWeight: "700", marginBottom: "20px" },
            },
            {
              id: "w-event-schedule-1",
              type: "text",
              content: "Keynotes, panels, and hands-on workshops led by industry leaders.",
              style: { color: "#cbd5e1", fontSize: "16px", lineHeight: "1.8", marginBottom: "12px" },
            },
            {
              id: "w-event-schedule-2",
              type: "text",
              content: "Networking lounges, evening socials, and breakout sessions for every interest.",
              style: { color: "#cbd5e1", fontSize: "16px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    },
  ],
};

export const nonprofitTemplate: PageData = {
  id: "tpl-nonprofit",
  sections: [
    {
      id: "sec-nonprofit-hero",
      type: "hero",
      style: {
        background: "linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%)",
        padding: "100px 60px",
        textAlign: "center",
      },
      columns: [
        {
          id: "col-nonprofit-hero",
          width: "100%",
          style: { maxWidth: "760px", margin: "0 auto" },
          widgets: [
            {
              id: "w-nonprofit-label",
              type: "text",
              content: "Purpose-driven",
              style: {
                color: "#bae6fd",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "18px",
              },
            },
            {
              id: "w-nonprofit-heading",
              type: "heading",
              content: "Make impact visible",
              style: {
                color: "#ffffff",
                fontSize: "60px",
                fontWeight: "900",
                lineHeight: "1.05",
                marginBottom: "24px",
              },
            },
            {
              id: "w-nonprofit-copy",
              type: "text",
              content:
                "Share your mission, showcase programs, and invite supporters with a transparent, modern website.",
              style: {
                color: "#dbeafe",
                fontSize: "18px",
                lineHeight: "1.8",
                marginBottom: "40px",
              },
            },
            {
              id: "w-nonprofit-btn",
              type: "button",
              content: "Join the movement",
              style: {
                backgroundColor: "#ffffff",
                color: "#0f172a",
                padding: "16px 44px",
                borderRadius: "9999px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
              },
            },
          ],
        },
      ],
    },
    {
      id: "sec-nonprofit-impact",
      type: "section",
      style: { backgroundColor: "#f8fafc", padding: "80px 60px" },
      columns: [
        {
          id: "col-nonprofit-1",
          width: "33%",
          style: { padding: "32px", backgroundColor: "#ffffff", borderRadius: "24px", margin: "0 12px", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
          widgets: [
            {
              id: "w-nonprofit-stat-1",
              type: "heading",
              content: "120K",
              style: { color: "#0f172a", fontSize: "40px", fontWeight: "900", marginBottom: "14px" },
            },
            {
              id: "w-nonprofit-stat-copy-1",
              type: "text",
              content: "Lives changed through our programs.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-nonprofit-2",
          width: "33%",
          style: { padding: "32px", backgroundColor: "#ffffff", borderRadius: "24px", margin: "0 12px", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
          widgets: [
            {
              id: "w-nonprofit-stat-2",
              type: "heading",
              content: "85%",
              style: { color: "#0f172a", fontSize: "40px", fontWeight: "900", marginBottom: "14px" },
            },
            {
              id: "w-nonprofit-stat-copy-2",
              type: "text",
              content: "Of donations go directly to programs.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
        {
          id: "col-nonprofit-3",
          width: "33%",
          style: { padding: "32px", backgroundColor: "#ffffff", borderRadius: "24px", margin: "0 12px", boxShadow: "0 24px 70px rgba(15,23,42,0.08)" },
          widgets: [
            {
              id: "w-nonprofit-stat-3",
              type: "heading",
              content: "12",
              style: { color: "#0f172a", fontSize: "40px", fontWeight: "900", marginBottom: "14px" },
            },
            {
              id: "w-nonprofit-stat-copy-3",
              type: "text",
              content: "Countries reached with our mission.",
              style: { color: "#64748b", fontSize: "15px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    },
  ],
};

export const ALL_TEMPLATES = [
  {
    id: "tpl-portfolio",
    name: "Portfolio",
    category: "Personal",
    description: "Showcase your work and skills with a stunning dark portfolio.",
    page_data: portfolioTemplate,
    sort_order: 1,
  },
  {
    id: "tpl-business",
    name: "Business",
    category: "Business",
    description: "Professional business site with services and hero section.",
    page_data: businessTemplate,
    sort_order: 2,
  },
  {
    id: "tpl-landing",
    name: "Landing Page",
    category: "Marketing",
    description: "High-converting landing page for your SaaS or product.",
    page_data: landingPageTemplate,
    sort_order: 3,
  },
  {
    id: "tpl-restaurant",
    name: "Restaurant",
    category: "Food",
    description: "A warm, modern restaurant website with menu highlights and reservation focus.",
    page_data: restaurantTemplate,
    sort_order: 4,
  },
  {
    id: "tpl-blog",
    name: "Blog",
    category: "Creative",
    description: "Content-first blogging layout for stories, case studies, and ideas.",
    page_data: blogTemplate,
    sort_order: 5,
  },
  {
    id: "tpl-agency",
    name: "Agency",
    category: "Business",
    description: "A premium agency homepage with service blocks and a bold hero.",
    page_data: agencyTemplate,
    sort_order: 6,
  },
  {
    id: "tpl-event",
    name: "Event",
    category: "Event",
    description: "An elegant event landing page built to drive registrations.",
    page_data: eventTemplate,
    sort_order: 7,
  },
  {
    id: "tpl-nonprofit",
    name: "Nonprofit",
    category: "Creative",
    description: "A mission-first website layout for causes, campaigns, and community impact.",
    page_data: nonprofitTemplate,
    sort_order: 8,
  },
  {
    id: "tpl-coming-soon",
    name: "Coming Soon",
    category: "Marketing",
    description: "Stylish coming soon page to build anticipation.",
    page_data: comingSoonTemplate,
    sort_order: 15,
  },
];
