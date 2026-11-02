"use client";

import { createContext, useContext } from "react";

const ContentContext = createContext(null);

/**
 * Menyediakan konten situs (hasil `getSiteContent()` di server) ke seluruh
 * komponen klien di bawahnya. Satu kali fetch untuk semua halaman publik.
 */
export default function ContentProvider({ content, children }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent() harus dipakai di dalam <ContentProvider>.");
  }

  return context;
}
