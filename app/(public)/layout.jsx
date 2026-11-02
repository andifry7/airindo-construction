import PublicLayoutClient from "@/components/layout/PublicLayoutClient";
import ContentProvider from "@/components/providers/ContentProvider";
import { getSiteContent } from "@/lib/site-content";

export default async function PublicLayout({ children }) {
  // Di-cache dengan tag `site-content`; backend memicu revalidasi setelah
  // admin menyimpan perubahan.
  const content = await getSiteContent();

  return (
    <ContentProvider content={content}>
      <PublicLayoutClient>{children}</PublicLayoutClient>
    </ContentProvider>
  );
}
