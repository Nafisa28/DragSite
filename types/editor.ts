// ─── Page Data JSON shape (heart of the builder) ─────────────────────────────

export type WidgetType =
  | "heading"
  | "text"
  | "image"
  | "button"
  | "spacer"
  | "divider"
  | "video"
  | "icon"
  | "list"
  | "form"
  | "gallery";

export type SectionType = "hero" | "section" | "footer" | "navbar";

export interface WidgetStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  minHeight?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  borderRadius?: string;
  border?: string;
  borderBottom?: string;
  boxShadow?: string;
  background?: string;
  cursor?: string;
  opacity?: string | number;
  objectFit?: string;
  [key: string]: string | number | undefined;
}

export interface Widget {
  id: string;
  type: WidgetType;
  content?: string;
  src?: string;       // for image / video
  alt?: string;       // for image
  href?: string;      // for button / link
  items?: string[];   // for list
  style?: WidgetStyle;
}

export interface Column {
  id: string;
  width: string;      // e.g. "50%", "33%", "100%"
  style?: WidgetStyle;
  widgets: Widget[];
}

export interface Section {
  id: string;
  type: SectionType;
  style?: WidgetStyle;
  columns: Column[];
}

export interface PageData {
  id: string;
  sections: Section[];
  globalStyle?: {
    fontFamily?: string;
    primaryColor?: string;
    backgroundColor?: string;
  };
}

// ─── Editor State ─────────────────────────────────────────────────────────────

export type SelectionType = "section" | "column" | "widget" | null;

export interface EditorSelection {
  type: SelectionType;
  sectionId?: string;
  columnId?: string;
  widgetId?: string;
}

export type DeviceMode = "desktop" | "tablet" | "mobile";

export interface EditorState {
  pageData: PageData;
  selection: EditorSelection | null;
  deviceMode: DeviceMode;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
}

// ─── Template ─────────────────────────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  category: string;
  description?: string;
  thumbnail_url?: string;
  page_data: PageData;
  sort_order?: number;
}

// ─── Site ─────────────────────────────────────────────────────────────────────

export type SiteStatus = "draft" | "published";

export interface Site {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  template_id?: string;
  status: SiteStatus;
  page_data: PageData;
  thumbnail_url?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}
