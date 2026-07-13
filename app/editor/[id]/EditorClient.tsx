"use client";

import { useEffect, useMemo, useState, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import useEditorStore from "@/lib/store/editorStore";
import { PageData, Section, Widget, WidgetType, EditorSelection } from "@/types/editor";
import { renderToHtml } from "@/lib/renderer/renderToHtml";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useStoreWithEqualityFn } from "zustand/traditional";
import JSZip from "jszip";
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Plus,
  Loader2,
  RotateCcw,
  RotateCw,
  Download,
} from "lucide-react";

interface Props {
  siteId: string;
  initialName: string;
  initialStatus: "draft" | "published";
  initialSlug: string;
  initialPageData: PageData;
}

const DEVICE_MODES = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

function styleToReact(style?: Record<string, string | number | undefined>) {
  return style ? { ...style } : undefined;
}

function getWidgetLabel(widget: Widget) {
  switch (widget.type) {
    case "heading":
      return "Heading";
    case "text":
      return "Text";
    case "button":
      return "Button";
    case "image":
      return "Image";
    case "spacer":
      return "Spacer";
    case "divider":
      return "Divider";
    case "video":
      return "Video";
    case "list":
      return "List";
    case "icon":
      return "Icon";
    case "form":
      return "Form";
    case "gallery":
      return "Gallery";
    default:
      return "Widget";
  }
}

function createWidget(type: WidgetType): Widget {
  const id = `w-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  switch (type) {
    case "heading":
      return {
        id,
        type,
        content: "New heading",
        style: { color: "#ffffff", fontSize: "36px", fontWeight: 700, marginBottom: "16px" },
      };
    case "text":
      return {
        id,
        type,
        content: "New paragraph text.",
        style: { color: "#e5e7eb", fontSize: "16px", lineHeight: "1.8", marginBottom: "16px" },
      };
    case "button":
      return {
        id,
        type,
        content: "Call to action",
        href: "#",
        style: { backgroundColor: "#7c3aed", color: "#ffffff", padding: "14px 28px", borderRadius: "9999px", fontWeight: 700, border: "none" },
      };
    case "image":
      return {
        id,
        type,
        src: "https://via.placeholder.com/800x450?text=New+Image",
        alt: "New image",
        style: { borderRadius: "24px", objectFit: "cover", width: "100%" },
      };
    case "divider":
      return {
        id,
        type,
        style: { borderTop: "1px solid rgba(255,255,255,0.12)", margin: "24px 0" },
      };
    case "spacer":
      return {
        id,
        type,
        style: { height: "32px" },
      };
    case "list":
      return {
        id,
        type,
        items: ["List item 1", "List item 2", "List item 3"],
        style: { color: "#e5e7eb", fontSize: "16px", marginBottom: "16px" },
      };
    default:
      return { id, type, content: "New widget" };
  }
}

function SortableSection({
  section,
  children,
}: {
  section: Section;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.8 : 1,
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

function WidgetPreview({
  widget,
  selected,
  onSelect,
}: {
  widget: Widget;
  selected: boolean;
  onSelect: () => void;
}) {
  const baseStyle = styleToReact(widget.style) || {};

  const wrapperClass = selected
    ? "outline outline-2 outline-violet-500 rounded-xl"
    : "";

  switch (widget.type) {
    case "heading":
      return (
        <h2
          onClick={onSelect}
          className={`cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        >
          {widget.content ?? "Heading"}
        </h2>
      );
    case "text":
      return (
        <p
          onClick={onSelect}
          className={`cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        >
          {widget.content ?? "Lorem ipsum dolor sit amet."}
        </p>
      );
    case "button":
      return (
        <a
          onClick={onSelect}
          className={`inline-flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90 ${wrapperClass}`}
          style={baseStyle}
          href={widget.href ?? "#"}
        >
          {widget.content ?? "Call to action"}
        </a>
      );
    case "image":
      return (
        <img
          onClick={onSelect}
          className={`w-full rounded-2xl object-cover cursor-pointer ${wrapperClass}`}
          style={baseStyle}
          src={widget.src ?? "https://via.placeholder.com/800x450?text=Image"}
          alt={widget.alt ?? "Image"}
        />
      );
    case "divider":
      return (
        <hr
          onClick={onSelect}
          className={`border-white/10 my-4 cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        />
      );
    case "spacer":
      return (
        <div
          onClick={onSelect}
          className={`cursor-pointer ${wrapperClass}`}
          style={{ height: widget.style?.height ?? "24px" }}
        />
      );
    case "list":
      return (
        <ul
          onClick={onSelect}
          className={`marker:text-violet-400 space-y-2 ${wrapperClass}`}
          style={baseStyle}
        >
          {(widget.items ?? ["Item one", "Item two", "Item three"]).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
    case "icon":
      return (
        <span
          onClick={onSelect}
          className={`inline-flex items-center justify-center text-3xl cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        >
          {widget.content ?? "★"}
        </span>
      );
    case "form":
      return (
        <form
          onClick={onSelect}
          className={`flex flex-col gap-3 rounded-2xl p-6 bg-white/5 ${wrapperClass}`}
          style={baseStyle}
        >
          <input
            className="rounded-xl border border-white/10 bg-black/10 p-3 text-sm text-white outline-none"
            placeholder="you@example.com"
            readOnly
          />
          <button className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">
            {widget.content ?? "Subscribe"}
          </button>
        </form>
      );
    case "gallery":
      return (
        <div
          onClick={onSelect}
          className={`rounded-2xl border border-white/10 p-8 text-center text-sm text-gray-300 cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        >
          Gallery placeholder
        </div>
      );
    default:
      return (
        <div
          onClick={onSelect}
          className={`rounded-2xl border border-white/10 p-4 cursor-pointer ${wrapperClass}`}
          style={baseStyle}
        >
          {widget.content ?? "Widget"}
        </div>
      );
  }
}

export default function EditorClient({
  siteId,
  initialName,
  initialStatus,
  initialSlug,
  initialPageData,
}: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  const initEditor = useEditorStore((state) => state.initEditor);
  const pageData = useEditorStore((state) => state.pageData);
  const selection = useEditorStore((state) => state.selection);
  const deviceMode = useEditorStore((state) => state.deviceMode);
  const isDirty = useEditorStore((state) => state.isDirty);
  const lastSaved = useEditorStore((state) => state.lastSaved);
  const siteName = useEditorStore((state) => state.siteName);
  const siteStatus = useEditorStore((state) => state.siteStatus);

  const setSelection = useEditorStore((state) => state.setSelection);
  const setDeviceMode = useEditorStore((state) => state.setDeviceMode);
  const setSiteName = useEditorStore((state) => state.setSiteName);
  const setSiteStatus = useEditorStore((state) => state.setSiteStatus);
  const setLastSaved = useEditorStore((state) => state.setLastSaved);
  const markClean = useEditorStore((state) => state.markClean);
  const updateSectionStyle = useEditorStore((state) => state.updateSectionStyle);
  const reorderSections = useEditorStore((state) => state.reorderSections);
  const deleteSection = useEditorStore((state) => state.deleteSection);
  const duplicateSection = useEditorStore((state) => state.duplicateSection);
  const updateWidget = useEditorStore((state) => state.updateWidget);
  const updateWidgetStyle = useEditorStore((state) => state.updateWidgetStyle);
  const updateColumnStyle = useEditorStore((state) => state.updateColumnStyle);
  const addWidget = useEditorStore((state) => state.addWidget);
  const addSection = useEditorStore((state) => state.addSection);

  const temporal = useStoreWithEqualityFn(useEditorStore.temporal as any, (state: any) => ({
    undo: state.undo,
    redo: state.redo,
    canUndo: (state.pastStates?.length ?? 0) > 0,
    canRedo: (state.futureStates?.length ?? 0) > 0,
  }));

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  useEffect(() => {
    initEditor(siteId, initialName, initialSlug, initialStatus, initialPageData);
  }, [siteId, initialName, initialSlug, initialStatus, initialPageData, initEditor]);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || !isDirty || saving) return;

    const autoSaveTimer = window.setTimeout(() => {
      handleSave(false, true);
    }, 3000);

    return () => window.clearTimeout(autoSaveTimer);
  }, [pageData, isDirty, saving, hasHydrated]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "s") {
        event.preventDefault();
        handleSave(false);
      }
      if ((event.metaKey || event.ctrlKey) && key === "z" && !event.shiftKey) {
        event.preventDefault();
        temporal.undo?.();
      }
      if ((event.metaKey || event.ctrlKey) && (key === "y" || (event.shiftKey && key === "z"))) {
        event.preventDefault();
        temporal.redo?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSave, temporal]);

  const selectedSection = useMemo(
    () => pageData.sections.find((section) => section.id === selection?.sectionId),
    [pageData.sections, selection]
  );
  const selectedColumn = useMemo(
    () =>
      selectedSection?.columns.find((column) => column.id === selection?.columnId),
    [selectedSection, selection]
  );
  const selectedWidget = useMemo(
    () =>
      selectedColumn?.widgets.find((widget) => widget.id === selection?.widgetId),
    [selectedColumn, selection]
  );

  const isPublished = siteStatus === "published";

  function moveSection(direction: "up" | "down") {
    if (!selectedSection) return;

    const currentIndex = pageData.sections.findIndex((section) => section.id === selectedSection.id);
    const nextIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex >= pageData.sections.length) return;

    const targetSection = pageData.sections[nextIndex];
    reorderSections(selectedSection.id, targetSection.id);
  }

  async function handleSave(publish = false, silent = false) {
    setError(null);
    if (!silent) setMessage(null);
    setSaving(true);

    const updatedStatus = publish ? "published" : siteStatus;
    const publishedAt = publish ? new Date().toISOString() : null;

    const { error: updateError } = await supabase
      .from("sites")
      .update({
        name: siteName,
        status: updatedStatus,
        page_data: pageData,
        published_at: publishedAt,
      })
      .eq("id", siteId);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    if (publish) {
      setSiteStatus("published");
    }

    markClean();
    setLastSaved(new Date());
    setSaving(false);
    if (!silent) {
      setMessage(publish ? "Site published successfully." : "Changes saved.");
      window.setTimeout(() => setMessage(null), 3000);
    }
  }

  async function handleExportZip() {
    setError(null);
    setMessage(null);
    setExporting(true);

    try {
      const zip = new JSZip();
      const html = renderToHtml(pageData, siteName || "My Site");
      zip.file("index.html", html);
      zip.file(
        "styles.css",
        `body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; background: #ffffff; color: #111827; }
.ds-columns { display: flex; flex-wrap: wrap; gap: 16px; }
.ds-column { flex: 1 1 0; min-width: 200px; }
.ds-button { border-radius: 9999px; }
`,
      );

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${siteName.replace(/\s+/g, "_").toLowerCase() || "site"}.zip`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("ZIP exported successfully.");
      window.setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError((err as Error)?.message ?? "Failed to export ZIP.");
    } finally {
      setExporting(false);
    }
  }

  function findTargetColumn() {
    if (selectedSection && selectedColumn) {
      return { sectionId: selectedSection.id, columnId: selectedColumn.id };
    }
    const firstSection = pageData.sections[0];
    if (!firstSection) return null;
    const firstColumn = firstSection.columns[0];
    if (!firstColumn) return null;
    return { sectionId: firstSection.id, columnId: firstColumn.id };
  }

  function handleAddWidget(type: WidgetType) {
    const target = findTargetColumn();
    if (!target) {
      setError("Unable to find a section and column to add the widget to.");
      return;
    }

    addWidget(target.sectionId, target.columnId, createWidget(type));
    setSelection({ type: "column", sectionId: target.sectionId, columnId: target.columnId });
  }

  function handleAddSection() {
    const sectionId = `sec-${Date.now()}`;
    const newSection: Section = {
      id: sectionId,
      type: "section",
      style: { padding: "80px 0", backgroundColor: "#111827" },
      columns: [
        {
          id: `col-${Date.now()}-1`,
          width: "100%",
          style: { padding: "0 24px" },
          widgets: [
            {
              id: `w-${Date.now()}-1`,
              type: "heading",
              content: "New section",
              style: { color: "#ffffff", fontSize: "36px", fontWeight: 700, marginBottom: "16px" },
            },
            {
              id: `w-${Date.now()}-2`,
              type: "text",
              content: "Start customizing this section.",
              style: { color: "#d1d5db", fontSize: "16px", lineHeight: "1.8" },
            },
          ],
        },
      ],
    };

    addSection(newSection);
    setSelection({ type: "section", sectionId: sectionId });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    reorderSections(active.id as string, over.id as string);
  }

  function renderSelectionInspector() {
    if (!selection) {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-2">No selection</h2>
            <p className="text-sm text-gray-400">
              Click a section, column, or widget inside the page preview to inspect and edit it.
            </p>
          </div>
          <div className="space-y-3 bg-white/5 rounded-3xl border border-white/10 p-5">
            <h3 className="text-sm uppercase tracking-[0.24em] text-gray-400">Tip</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Use the preview to jump between page elements quickly and customize individual content blocks.
            </p>
          </div>
        </div>
      );
    }

    if (selection.type === "section" && selectedSection) {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Section settings</h2>
            <p className="text-sm text-gray-400 mb-4">
              Adjust the selected section background, padding, and layout.
            </p>

            <label className="block text-sm text-gray-300 mb-2">Background</label>
            <input
              type="color"
              value={selectedSection.style?.backgroundColor ?? "#111827"}
              onChange={(event) =>
                updateSectionStyle(selectedSection.id, {
                  backgroundColor: event.target.value,
                })
              }
              className="w-full h-12 rounded-2xl border border-white/10 bg-black/10 p-2"
            />

            <label className="block text-sm text-gray-300 mt-4 mb-2">Padding</label>
            <input
              type="text"
              value={selectedSection.style?.padding ?? ""}
              onChange={(event) =>
                updateSectionStyle(selectedSection.id, {
                  padding: event.target.value,
                })
              }
              placeholder="120px 0"
              className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => moveSection("up")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 hover:bg-white/10 transition"
                type="button"
              >
                <ChevronUp className="w-4 h-4" /> Move up
              </button>
              <button
                onClick={() => moveSection("down")}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 hover:bg-white/10 transition"
                type="button"
              >
                <ChevronDown className="w-4 h-4" /> Move down
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => duplicateSection(selectedSection.id)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 hover:bg-white/10 transition"
                type="button"
              >
                <Copy className="w-4 h-4" /> Duplicate
              </button>
              <button
                onClick={() => {
                  deleteSection(selectedSection.id);
                  setSelection(null);
                }}
                className="rounded-2xl border border-white/10 bg-red-500/10 px-4 py-3 text-sm text-red-300 hover:bg-red-500/15 transition"
                type="button"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selection.type === "widget" && selectedWidget && selectedSection && selectedColumn) {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">{getWidgetLabel(selectedWidget)} settings</h2>
            <label className="block text-sm text-gray-300 mb-2">Content</label>
            <textarea
              value={selectedWidget.content ?? ""}
              onChange={(event) =>
                updateWidget(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                  content: event.target.value,
                })
              }
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
            />

            {selectedWidget.type === "button" && (
              <>
                <label className="block text-sm text-gray-300 mb-2 mt-4">Button link</label>
                <input
                  type="text"
                  value={selectedWidget.href ?? ""}
                  onChange={(event) =>
                    updateWidget(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                      href: event.target.value,
                    })
                  }
                  placeholder="https://"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
                />
              </>
            )}

            {selectedWidget.type === "image" && (
              <>
                <label className="block text-sm text-gray-300 mb-2 mt-4">Image URL</label>
                <input
                  type="text"
                  value={selectedWidget.src ?? ""}
                  onChange={(event) =>
                    updateWidget(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                      src: event.target.value,
                    })
                  }
                  placeholder="https://"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
                />

                <label className="block text-sm text-gray-300 mb-2 mt-4">Alt text</label>
                <input
                  type="text"
                  value={selectedWidget.alt ?? ""}
                  onChange={(event) =>
                    updateWidget(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                      alt: event.target.value,
                    })
                  }
                  placeholder="Describe the image"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
                />
              </>
            )}

            <label className="block text-sm text-gray-300 mb-2 mt-4">Color</label>
            <input
              type="color"
              value={selectedWidget.style?.color ?? "#ffffff"}
              onChange={(event) =>
                updateWidgetStyle(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                  color: event.target.value,
                })
              }
              className="w-full h-12 rounded-2xl border border-white/10 bg-black/10 p-2"
            />

            <label className="block text-sm text-gray-300 mb-2 mt-4">Font size</label>
            <input
              type="text"
              value={selectedWidget.style?.fontSize ?? ""}
              onChange={(event) =>
                updateWidgetStyle(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                  fontSize: event.target.value,
                })
              }
              placeholder="20px"
              className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
            />

            <label className="block text-sm text-gray-300 mb-2 mt-4">Background</label>
            <input
              type="color"
              value={selectedWidget.style?.backgroundColor ?? "#000000"}
              onChange={(event) =>
                updateWidgetStyle(selectedSection.id, selectedColumn.id, selectedWidget.id, {
                  backgroundColor: event.target.value,
                })
              }
              className="w-full h-12 rounded-2xl border border-white/10 bg-black/10 p-2"
            />
          </div>
        </div>
      );
    }

    if (selection.type === "column" && selectedColumn && selectedSection) {
      return (
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Column settings</h2>
            <label className="block text-sm text-gray-300 mb-2">Width</label>
            <input
              type="text"
              value={selectedColumn.width}
              onChange={(event) =>
                updateColumnStyle(selectedSection.id, selectedColumn.id, {
                  width: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
            />

            <label className="block text-sm text-gray-300 mb-2 mt-4">Padding</label>
            <input
              type="text"
              value={selectedColumn.style?.padding ?? ""}
              onChange={(event) =>
                updateColumnStyle(selectedSection.id, selectedColumn.id, {
                  padding: event.target.value,
                })
              }
              placeholder="20px"
              className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-white outline-none"
            />
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="min-h-screen bg-[#09090f] text-white">
      <div className="border-b border-white/10 px-8 py-4 bg-[#0b0b12] sticky top-0 z-20">
        <div className="max-w-8xl mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div>
              <div className="text-sm text-gray-400">Editing</div>
              <input
                value={siteName}
                onChange={(event) => setSiteName(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-lg font-semibold text-white outline-none min-w-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              Status: <span className="ml-2 font-semibold text-white">{siteStatus}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <span className="hidden sm:inline">View:</span>
              {DEVICE_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setDeviceMode(mode.id as "desktop" | "tablet" | "mobile")}
                    className={`grid h-10 w-10 place-items-center rounded-xl transition ${deviceMode === mode.id ? "bg-violet-600 text-white" : "bg-white/5 text-gray-300 hover:bg-white/10"}`}
                    aria-label={mode.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => temporal.undo?.()}
              disabled={!temporal.canUndo || saving}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 disabled:opacity-50"
            >
              <RotateCcw className="w-4 h-4" /> Undo
            </button>
            <button
              type="button"
              onClick={() => temporal.redo?.()}
              disabled={!temporal.canRedo || saving}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 disabled:opacity-50"
            >
              <RotateCw className="w-4 h-4" /> Redo
            </button>
            <button
              type="button"
              onClick={handleExportZip}
              disabled={saving || exporting}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 disabled:opacity-50"
            >
              <Download className="w-4 h-4" /> Export ZIP
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving || isPublished}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4" />
              {isPublished ? "Published" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_360px] gap-6 px-8 py-8">
        <aside className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Page status</p>
                <p className="text-lg font-semibold text-white">{isPublished ? "Live" : "Draft"}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                {lastSaved ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(lastSaved) : "Not saved"}
              </div>
            </div>
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => setSelection(null)}
                className="rounded-2xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition"
              >
                Reset selection
              </button>
              <Link
                href={isPublished ? `/s/${initialSlug}` : "/dashboard"}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 hover:bg-white/10 transition"
              >
                View published site
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Widget library</h2>
                <p className="text-sm text-gray-400">Add a widget to the selected column or first column.</p>
              </div>
              <Plus className="w-5 h-5 text-violet-400" />
            </div>
            <div className="grid gap-3">
              {[
                { label: "Heading", type: "heading" },
                { label: "Text", type: "text" },
                { label: "Button", type: "button" },
                { label: "Image", type: "image" },
                { label: "Divider", type: "divider" },
                { label: "Spacer", type: "spacer" },
                { label: "List", type: "list" },
              ].map((widget) => (
                <button
                  type="button"
                  key={widget.type}
                  onClick={() => handleAddWidget(widget.type as WidgetType)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-gray-200 hover:border-violet-500 hover:bg-violet-500/5 transition"
                >
                  {widget.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-white">Sections</h2>
                <p className="text-sm text-gray-400">Select a section to customize layout & spacing.</p>
              </div>
              <button
                type="button"
                onClick={handleAddSection}
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition"
              >
                <Plus className="w-4 h-4" /> Add section
              </button>
            </div>
            <div className="space-y-3">
              {pageData.sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setSelection({ type: "section", sectionId: section.id })}
                  className={`w-full rounded-3xl border px-4 py-3 text-left transition ${selection?.sectionId === section.id ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">Section {index + 1}</p>
                      <p className="text-xs text-gray-400">{section.type}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                      {section.columns.length} col
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className="min-h-[calc(100vh-160px)] rounded-[32px] border border-white/10 bg-[#07070d] p-6 shadow-xl shadow-black/20">
          <div className={`mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-[#11131c] ${deviceMode === "desktop" ? "max-w-[1200px]" : deviceMode === "tablet" ? "max-w-[840px]" : "max-w-[420px]"}`}>
            <div className="bg-[#0f1220] border-b border-white/5 px-5 py-3 text-sm text-gray-400">
              Live preview ({deviceMode})
            </div>
            <div className="p-6" style={{ minHeight: 640 }}>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={pageData.sections.map((section) => section.id)} strategy={verticalListSortingStrategy}>
                  {pageData.sections.map((section) => (
                    <SortableSection key={section.id} section={section}>
                      <div
                        onClick={() => setSelection({ type: "section", sectionId: section.id })}
                        className="rounded-[24px] border border-white/5 p-6 mb-6 transition hover:border-violet-500/30"
                        style={styleToReact(section.style)}
                      >
                        <div className="grid gap-6" style={{ gridTemplateColumns: section.columns.length > 1 ? "repeat(auto-fit, minmax(220px, 1fr))" : "1fr" }}>
                          {section.columns.map((column) => (
                            <div
                              key={column.id}
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelection({ type: "column", sectionId: section.id, columnId: column.id });
                              }}
                              className="rounded-3xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-500/30"
                              style={styleToReact(column.style)}
                            >
                              {column.widgets.map((widget) => (
                                <div key={widget.id} className="mb-4 last:mb-0">
                                  <WidgetPreview
                                    widget={widget}
                                    selected={selection?.widgetId === widget.id}
                                    onSelect={() =>
                                      setSelection({
                                        type: "widget",
                                        sectionId: section.id,
                                        columnId: column.id,
                                        widgetId: widget.id,
                                      })
                                    }
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </SortableSection>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-semibold text-white">Inspector</h2>
                <p className="text-sm text-gray-400">Customize the selected element.</p>
              </div>
            </div>
            {renderSelectionInspector()}
            {error ? <div className="mt-4 rounded-2xl bg-red-500/10 p-3 text-sm text-red-300">{error}</div> : null}
            {message ? <div className="mt-4 rounded-2xl bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</div> : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
