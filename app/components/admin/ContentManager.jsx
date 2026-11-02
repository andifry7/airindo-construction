"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Save, Loader2, Inbox } from "lucide-react";

/** Nama ikon yang dikenali registry frontend (app/lib/icons.js). */
const ICON_OPTIONS = [
  "Wrench",
  "Zap",
  "Cpu",
  "Flame",
  "Briefcase",
  "Clock3",
  "ShieldCheck",
  "MessageSquareText",
  "TrendingUp",
  "Lightbulb",
  "Users",
  "MessagesSquare",
  "BadgeCheck",
  "Headset",
  "Handshake",
  "HardHat",
];

const textField = (key, label, placeholder = "") => ({
  key,
  label,
  type: "text",
  placeholder,
});

const areaField = (key, label, rows = 3, placeholder = "") => ({
  key,
  label,
  type: "textarea",
  rows,
  placeholder,
});

const iconField = () => ({
  key: "icon",
  label: "Ikon",
  type: "icon",
  placeholder: "Contoh: ShieldCheck",
});

/**
 * Definisi tiap jenis konten pendukung.
 * Urutan field mengikuti urutan tampil di form.
 */
export const CONTENT_DEFINITIONS = {
  faqs: {
    label: "FAQ",
    hint: "Pertanyaan yang tampil di bagian Tanya Jawab pada beranda.",
    fields: [
      areaField("question", "Pertanyaan", 2, "Tulis pertanyaan..."),
      areaField("answer", "Jawaban", 3, "Tulis jawaban..."),
    ],
    emptyItem: { question: "", answer: "" },
    titleOf: (item) => item.question || "Pertanyaan baru",
  },
  workshops: {
    label: "Workshop",
    hint: "Fasilitas workshop yang tampil di halaman Tentang Kami dan Kontak.",
    fields: [
      textField("name", "Nama Workshop", "Workshop Sentul Bogor"),
      areaField("location", "Lokasi", 2, "Kawasan Sirkuit Sentul, Bogor"),
      textField("mapQuery", "Query Google Maps", "Sirkuit Sentul Bogor"),
      textField("mapsUrl", "URL Google Maps", "https://maps.google.com/?q=..."),
      areaField("features", "Kapabilitas & Alat Utama", 2, "Fasilitas fabrikasi pipa besar..."),
    ],
    emptyItem: { name: "", location: "", mapQuery: "", mapsUrl: "", features: "" },
    titleOf: (item) => item.name || "Workshop baru",
  },
  highlights: {
    label: "Highlight",
    hint: "Empat kartu keunggulan yang tampil tepat di bawah hero beranda.",
    fields: [
      iconField(),
      textField("title", "Judul", "Tenaga Ahli Bersertifikat"),
      areaField("text", "Deskripsi", 2, "Penjelasan singkat..."),
      textField("badge", "Badge", "Certified Engineers"),
    ],
    emptyItem: { icon: "ShieldCheck", title: "", text: "", badge: "" },
    titleOf: (item) => item.title || "Highlight baru",
  },
  "about-values": {
    label: "Nilai Perusahaan",
    hint: "Nilai utama yang tampil di halaman Tentang Kami.",
    fields: [
      iconField(),
      textField("title", "Judul", "Solusi & Inovasi"),
      areaField("text", "Deskripsi", 3, "Penjelasan singkat..."),
    ],
    emptyItem: { icon: "Lightbulb", title: "", text: "" },
    titleOf: (item) => item.title || "Nilai baru",
  },
  "cta-points": {
    label: "Poin CTA",
    hint: "Poin-poin ajakan di bagian bawah halaman Layanan dan Proyek.",
    fields: [
      iconField(),
      textField("title", "Judul", "Konsultasi Teknis Gratis"),
      areaField("text", "Deskripsi", 2, "Penjelasan singkat..."),
    ],
    emptyItem: { icon: "Handshake", title: "", text: "" },
    titleOf: (item) => item.title || "Poin baru",
  },
};

export const CONTENT_TYPES = Object.keys(CONTENT_DEFINITIONS);

/** Field teks biasa. */
function TextInput({ field, value, onChange }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
        {field.label}
      </label>
      <input
        type="text"
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}

export default function ContentManager({ type, items, onSave }) {
  const definition = CONTENT_DEFINITIONS[type];
  const [draft, setDraft] = useState(() => items.map((item) => ({ ...item })));
  const [isSaving, setIsSaving] = useState(false);

  const updateItem = (index, key, value) => {
    setDraft((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  };

  const addItem = () => {
    setDraft((prev) => [...prev, { ...definition.emptyItem }]);
  };

  const removeItem = (index) => {
    setDraft((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const moveItem = (index, direction) => {
    setDraft((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return next;
    });
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    const success = await onSave(type, draft);
    setIsSaving(false);
    if (success === false) return;
  };

  return (
    <div className="space-y-5">
      {/* Info */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">{definition.label}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{definition.hint}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand hover:bg-[#0b2557] text-white text-xs font-semibold shadow-sm transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {/* Daftar item */}
      {draft.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
          <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800 text-sm">Belum ada data</h3>
          <p className="text-xs text-slate-500 mt-1">
            Klik &quot;Tambah&quot; untuk membuat item pertama.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {draft.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5"
            >
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-brand text-[11px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {definition.titleOf(item)}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    title="Naikkan"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === draft.length - 1}
                    title="Turunkan"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand hover:bg-slate-100 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    title="Hapus item"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {definition.fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.type === "textarea" ? "sm:col-span-2" : ""}
                  >
                    {field.type === "textarea" ? (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          {field.label}
                        </label>
                        <textarea
                          rows={field.rows ?? 3}
                          value={item[field.key] ?? ""}
                          placeholder={field.placeholder}
                          onChange={(event) => updateItem(index, field.key, event.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                    ) : field.type === "icon" ? (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                          {field.label}
                        </label>
                        <input
                          type="text"
                          list="content-icon-options"
                          value={item[field.key] ?? ""}
                          placeholder={field.placeholder}
                          onChange={(event) => updateItem(index, field.key, event.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
                        />
                      </div>
                    ) : (
                      <TextInput
                        field={field}
                        value={item[field.key]}
                        onChange={(value) => updateItem(index, field.key, value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Saran nama ikon */}
      <datalist id="content-icon-options">
        {ICON_OPTIONS.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>
    </div>
  );
}
