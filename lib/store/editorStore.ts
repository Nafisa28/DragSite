import { create } from "zustand";
import { temporal } from "zundo";
import {
  PageData,
  Section,
  Column,
  Widget,
  EditorSelection,
  DeviceMode,
} from "@/types/editor";

interface EditorStore {
  pageData: PageData;
  selection: EditorSelection | null;
  deviceMode: DeviceMode;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  siteId: string | null;
  siteName: string;
  siteSlug: string;
  siteStatus: "draft" | "published";

  // Init
  initEditor: (
    siteId: string,
    siteName: string,
    siteSlug: string,
    siteStatus: "draft" | "published",
    pageData: PageData
  ) => void;

  // Selection
  setSelection: (sel: EditorSelection | null) => void;

  // Device mode
  setDeviceMode: (mode: DeviceMode) => void;

  // Save state
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
  setSiteStatus: (status: "draft" | "published") => void;
  setSiteName: (name: string) => void;
  markClean: () => void;

  // Page mutations (these get tracked by zundo for undo/redo)
  setPageData: (data: PageData) => void;

  // Section ops
  updateSectionStyle: (sectionId: string, style: Record<string, string>) => void;
  reorderSections: (activeId: string, overId: string) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;

  // Widget ops
  updateWidget: (sectionId: string, colId: string, widgetId: string, updates: Partial<Widget>) => void;
  updateWidgetStyle: (sectionId: string, colId: string, widgetId: string, style: Record<string, string>) => void;
  addWidget: (sectionId: string, colId: string, widget: Widget) => void;
  deleteWidget: (sectionId: string, colId: string, widgetId: string) => void;
  reorderWidgets: (sectionId: string, colId: string, activeId: string, overId: string) => void;

  // Column ops
  updateColumnStyle: (sectionId: string, colId: string, style: Record<string, string>) => void;
}

const useEditorStore = create<EditorStore>()(
  temporal(
    (set, get) => ({
      pageData: { id: "", sections: [] },
      selection: null,
      deviceMode: "desktop",
      isDirty: false,
      isSaving: false,
      lastSaved: null,
      siteId: null,
      siteName: "",
      siteSlug: "",
      siteStatus: "draft",

      initEditor: (siteId, siteName, siteSlug, siteStatus, pageData) =>
        set({ siteId, siteName, siteSlug, siteStatus, pageData, isDirty: false, selection: null }),

      setSelection: (sel) => set({ selection: sel }),
      setDeviceMode: (mode) => set({ deviceMode: mode }),
      setIsSaving: (saving) => set({ isSaving: saving }),
      setLastSaved: (date) => set({ lastSaved: date }),
      setSiteStatus: (status) => set({ siteStatus: status }),
      setSiteName: (name) => set({ siteName: name }),
      markClean: () => set({ isDirty: false }),

      setPageData: (data) => set({ pageData: data, isDirty: true }),

      updateSectionStyle: (sectionId, style) =>
        set((state) => ({
          isDirty: true,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id === sectionId
                ? { ...s, style: { ...s.style, ...style } }
                : s
            ),
          },
        })),

      reorderSections: (activeId, overId) =>
        set((state) => {
          const sections = [...state.pageData.sections];
          const oldIdx = sections.findIndex((s) => s.id === activeId);
          const newIdx = sections.findIndex((s) => s.id === overId);
          if (oldIdx === -1 || newIdx === -1) return {};
          const [moved] = sections.splice(oldIdx, 1);
          sections.splice(newIdx, 0, moved);
          return { isDirty: true, pageData: { ...state.pageData, sections } };
        }),

      deleteSection: (sectionId) =>
        set((state) => ({
          isDirty: true,
          selection: null,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.filter((s) => s.id !== sectionId),
          },
        })),

      duplicateSection: (sectionId) =>
        set((state) => {
          const sections = [...state.pageData.sections];
          const idx = sections.findIndex((s) => s.id === sectionId);
          if (idx === -1) return {};
          const original = sections[idx];
          const copy: Section = JSON.parse(JSON.stringify(original));
          copy.id = `sec-${Date.now()}`;
          copy.columns = copy.columns.map((col) => ({
            ...col,
            id: `col-${Date.now()}-${Math.random()}`,
            widgets: col.widgets.map((w) => ({
              ...w,
              id: `w-${Date.now()}-${Math.random()}`,
            })),
          }));
          sections.splice(idx + 1, 0, copy);
          return { isDirty: true, pageData: { ...state.pageData, sections } };
        }),

      updateWidget: (sectionId, colId, widgetId, updates) =>
        set((state) => ({
          isDirty: true,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id !== sectionId
                ? s
                : {
                    ...s,
                    columns: s.columns.map((col) =>
                      col.id !== colId
                        ? col
                        : {
                            ...col,
                            widgets: col.widgets.map((w) =>
                              w.id !== widgetId ? w : { ...w, ...updates }
                            ),
                          }
                    ),
                  }
            ),
          },
        })),

      updateWidgetStyle: (sectionId, colId, widgetId, style) =>
        set((state) => ({
          isDirty: true,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id !== sectionId
                ? s
                : {
                    ...s,
                    columns: s.columns.map((col) =>
                      col.id !== colId
                        ? col
                        : {
                            ...col,
                            widgets: col.widgets.map((w) =>
                              w.id !== widgetId
                                ? w
                                : { ...w, style: { ...w.style, ...style } }
                            ),
                          }
                    ),
                  }
            ),
          },
        })),

      addWidget: (sectionId, colId, widget) =>
        set((state) => ({
          isDirty: true,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id !== sectionId
                ? s
                : {
                    ...s,
                    columns: s.columns.map((col) =>
                      col.id !== colId
                        ? col
                        : { ...col, widgets: [...col.widgets, widget] }
                    ),
                  }
            ),
          },
        })),

      deleteWidget: (sectionId, colId, widgetId) =>
        set((state) => ({
          isDirty: true,
          selection: null,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id !== sectionId
                ? s
                : {
                    ...s,
                    columns: s.columns.map((col) =>
                      col.id !== colId
                        ? col
                        : {
                            ...col,
                            widgets: col.widgets.filter((w) => w.id !== widgetId),
                          }
                    ),
                  }
            ),
          },
        })),

      reorderWidgets: (sectionId, colId, activeId, overId) =>
        set((state) => {
          const sections = state.pageData.sections.map((s) => {
            if (s.id !== sectionId) return s;
            return {
              ...s,
              columns: s.columns.map((col) => {
                if (col.id !== colId) return col;
                const widgets = [...col.widgets];
                const oldIdx = widgets.findIndex((w) => w.id === activeId);
                const newIdx = widgets.findIndex((w) => w.id === overId);
                if (oldIdx === -1 || newIdx === -1) return col;
                const [moved] = widgets.splice(oldIdx, 1);
                widgets.splice(newIdx, 0, moved);
                return { ...col, widgets };
              }),
            };
          });
          return { isDirty: true, pageData: { ...state.pageData, sections } };
        }),

      updateColumnStyle: (sectionId, colId, style) =>
        set((state) => ({
          isDirty: true,
          pageData: {
            ...state.pageData,
            sections: state.pageData.sections.map((s) =>
              s.id !== sectionId
                ? s
                : {
                    ...s,
                    columns: s.columns.map((col) =>
                      col.id !== colId
                        ? col
                        : { ...col, style: { ...col.style, ...style } }
                    ),
                  }
            ),
          },
        })),
    }),
    {
      limit: 50, // 50 undo steps
      partialize: (state) => ({ pageData: state.pageData }),
    }
  )
);

export default useEditorStore;
