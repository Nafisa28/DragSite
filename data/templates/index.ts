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
    id: "tpl-coming-soon",
    name: "Coming Soon",
    category: "Marketing",
    description: "Stylish coming soon page to build anticipation.",
    page_data: comingSoonTemplate,
    sort_order: 15,
  },
];
