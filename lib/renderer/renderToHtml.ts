import { PageData, Section, Column, Widget, WidgetStyle } from "@/types/editor";

// Convert a WidgetStyle object to inline CSS string
function styleToCSS(style?: WidgetStyle): string {
  if (!style) return "";
  return Object.entries(style)
    .map(([k, v]) => {
      if (v === undefined || v === null) return "";
      // Convert camelCase to kebab-case
      const prop = k.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
      return `${prop}: ${v}`;
    })
    .filter(Boolean)
    .join("; ");
}

// Render a single widget to HTML
function renderWidget(widget: Widget): string {
  const style = styleToCSS(widget.style);
  const styleAttr = style ? ` style="${style}"` : "";

  switch (widget.type) {
    case "heading":
      return `<h2 class="ds-widget ds-heading"${styleAttr}>${widget.content ?? ""}</h2>`;

    case "text":
      return `<p class="ds-widget ds-text"${styleAttr}>${widget.content ?? ""}</p>`;

    case "button":
      return `<a href="${widget.href ?? "#"}" class="ds-widget ds-button"${styleAttr}>${widget.content ?? "Click here"}</a>`;

    case "image":
      return `<img src="${widget.src ?? ""}" alt="${widget.alt ?? ""}" class="ds-widget ds-image"${styleAttr} loading="lazy" />`;

    case "spacer":
      return `<div class="ds-widget ds-spacer"${styleAttr}></div>`;

    case "divider":
      return `<hr class="ds-widget ds-divider"${styleAttr} />`;

    case "video":
      return widget.src?.includes("youtube.com") || widget.src?.includes("youtu.be")
        ? `<div class="ds-widget ds-video"${styleAttr} style="aspect-ratio:16/9;width:100%;border-radius:12px;overflow:hidden"><iframe src="${widget.src}" title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:none;"></iframe></div>`
        : widget.src
        ? `<video src="${widget.src}" class="ds-widget ds-video"${styleAttr} controls style="width:100%;border-radius:12px;"></video>`
        : `<div class="ds-widget ds-video-placeholder"${styleAttr}>Video placeholder</div>`;

    case "list":
      return `<ul class="ds-widget ds-list"${styleAttr}>${(widget.items ?? [])
        .map((item) => `<li>${item}</li>`)
        .join("")}</ul>`;

    case "icon":
      return `<span class="ds-widget ds-icon"${styleAttr}>${widget.content ?? "★"}</span>`;

    case "form":
      return `
<form class="ds-widget ds-form"${styleAttr} onsubmit="return false">
  <input type="email" placeholder="Enter your email" class="ds-form-input" />
  <button type="submit" class="ds-form-btn">${widget.content ?? "Subscribe"}</button>
</form>`;

    case "gallery":
      return `
<div class="ds-widget ds-gallery"${styleAttr} style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:12px;">
  <img src="https://via.placeholder.com/200?text=1" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;" alt="Gallery 1" loading="lazy" />
  <img src="https://via.placeholder.com/200?text=2" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;" alt="Gallery 2" loading="lazy" />
  <img src="https://via.placeholder.com/200?text=3" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:8px;" alt="Gallery 3" loading="lazy" />
</div>`;

    default:
      return `<div class="ds-widget"${styleAttr}>${widget.content ?? ""}</div>`;
  }
}

// Render a column
function renderColumn(col: Column): string {
  const style: WidgetStyle = {
    width: col.width,
    ...col.style,
  };
  return `<div class="ds-column" style="${styleToCSS(style)}">${col.widgets.map(renderWidget).join("\n")}</div>`;
}

// Render a section
function renderSection(section: Section): string {
  const sectionStyle = styleToCSS(section.style);
  const styleAttr = sectionStyle ? ` style="${sectionStyle}"` : "";
  return `<section class="ds-section ds-${section.type}"${styleAttr}><div class="ds-columns">${section.columns.map(renderColumn).join("\n")}</div></section>`;
}

// Base CSS for published pages
const BASE_CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; line-height: 1.6; }
img, video { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.ds-columns {
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.ds-column { flex: 1 1 auto; }

.ds-button {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.ds-button:hover { opacity: 0.85; }

.ds-image { max-width: 100%; border-radius: inherit; }

.ds-divider { border: none; border-top: 1px solid #e5e7eb; }

.ds-form { display: flex; gap: 8px; flex-wrap: wrap; }
.ds-form-input {
  flex: 1;
  min-width: 200px;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
}
.ds-form-btn {
  padding: 12px 24px;
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.ds-gallery {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
}

@media (max-width: 768px) {
  .ds-columns { flex-direction: column; }
  .ds-column { width: 100% !important; }
}
`;

// Main render function — converts PageData JSON to a full HTML string
export function renderToHtml(pageData: PageData, siteName = "My Site"): string {
  const body = pageData.sections.map(renderSection).join("\n");

  const globalFontFamily = pageData.globalStyle?.fontFamily;
  const fontImport = globalFontFamily
    ? `<link href="https://fonts.googleapis.com/css2?family=${globalFontFamily.replace(/\s+/g, "+")}:wght@400;600;700;800;900&display=swap" rel="stylesheet">`
    : "";

  const globalCSSExtra = globalFontFamily
    ? `body { font-family: '${globalFontFamily}', sans-serif; }`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${siteName}</title>
  ${fontImport}
  <style>
${BASE_CSS}
${globalCSSExtra}
  </style>
</head>
<body>
${body}
</body>
</html>`;
}
