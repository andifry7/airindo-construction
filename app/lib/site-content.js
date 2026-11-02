import { cacheLife, cacheTag } from "next/cache";
import {
  aboutValues as staticAboutValues,
  clientFiles as staticClients,
  company as staticCompany,
  companyStats as staticStats,
  ctaPoints as staticCtaPoints,
  faqs as staticFaqs,
  highlights as staticHighlights,
  projects as staticProjects,
  services as staticServices,
  workshops as staticWorkshops,
} from "./data";
import { iconNameOf } from "./icons";

/** Tag cache — dipakai `revalidateTag` setelah admin menyimpan perubahan. */
export const CONTENT_CACHE_TAG = "site-content";

const API_BASE_URL = (process.env.API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");

// ─────────────────────────────────────────────────────────────
// Adapter: bentuk respons API → bentuk yang dipakai komponen
// ─────────────────────────────────────────────────────────────

function adaptCompany(payload) {
  const profile = payload?.profile ?? {};

  return {
    name: profile.name ?? "",
    fullName: profile.fullName ?? "",
    tagline: profile.tagline ?? "",
    phone: profile.phone ?? "",
    phoneRaw: profile.phoneRaw ?? "",
    email: profile.email ?? "",
    address: profile.address ?? "",
    mapQuery: profile.mapQuery ?? "",
    mapsUrl: profile.mapsUrl ?? "",
    establishedYear: profile.establishedYear ?? null,
    workshopAddress: profile.workshopAddress ?? "",
  };
}

function adaptStat(stat) {
  return { value: stat.value, label: stat.label, detail: stat.detail ?? "" };
}

function adaptService(service) {
  return {
    // Komponen memakai `id` sebagai anchor (#mechanical) → pakai slug, bukan UUID.
    id: service.slug,
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    icon: service.icon,
    image: service.imageUrl ?? "",
    badge: service.badge ?? "",
    lead: service.lead,
    description: service.description,
    scopePoints: Array.isArray(service.scopePoints) ? service.scopePoints : [],
    standards: Array.isArray(service.standards) ? service.standards : [],
    caseHighlight: service.caseHighlight ?? "",
  };
}

function adaptClient(client) {
  return {
    id: client.id,
    name: client.name,
    sector: client.sector,
    logo: client.logoUrl ?? "",
  };
}

function adaptProject(project) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    categoryKey: project.categoryKey,
    image: project.imageUrl ?? "",
    location: project.location,
    client: project.client,
    year: project.year,
    capacity: project.capacity ?? "",
    specs: project.specs ?? "",
    scope: project.scope ?? "",
    description: project.description ?? "",
    // Selalu array — komponen memanggil .some() dan .slice().
    tags: Array.isArray(project.tags) ? project.tags : [],
    featured: Boolean(project.featured),
  };
}

function adaptFaq(faq) {
  return { id: faq.id, q: faq.question, a: faq.answer };
}

function adaptHighlight(item) {
  return { id: item.id, icon: item.icon, title: item.title, text: item.text, badge: item.badge ?? "" };
}

function adaptSimpleItem(item) {
  return { id: item.id, icon: item.icon, title: item.title, text: item.text };
}

function adaptWorkshop(workshop) {
  return {
    id: workshop.id,
    name: workshop.name,
    location: workshop.location,
    mapQuery: workshop.mapQuery ?? "",
    mapsUrl: workshop.mapsUrl ?? "",
    features: workshop.features ?? "",
  };
}

function adaptBootstrap(data) {
  const projects = data?.projects ?? {};

  return {
    company: adaptCompany(data?.company),
    stats: (data?.company?.stats ?? []).map(adaptStat),
    services: (data?.services ?? []).map(adaptService),
    clients: (data?.clients ?? []).map(adaptClient),
    projects: {
      all: (projects.all ?? []).map(adaptProject),
      featured: (projects.featured ?? []).map(adaptProject),
      total: projects.total ?? (projects.all ?? []).length,
    },
    faqs: (data?.faqs ?? []).map(adaptFaq),
    highlights: (data?.highlights ?? []).map(adaptHighlight),
    aboutValues: (data?.aboutValues ?? []).map(adaptSimpleItem),
    ctaPoints: (data?.ctaPoints ?? []).map(adaptSimpleItem),
    workshops: (data?.workshops ?? []).map(adaptWorkshop),
  };
}

// ─────────────────────────────────────────────────────────────
// Fallback: dipakai bila API tidak bisa dijangkau (mis. saat build
// tanpa backend). Sumbernya app/lib/data.js agar situs tidak kosong.
// ─────────────────────────────────────────────────────────────

function buildFallbackContent() {
  return {
    company: {
      name: staticCompany.name,
      fullName: staticCompany.fullName,
      tagline: staticCompany.tagline,
      phone: staticCompany.phone,
      phoneRaw: staticCompany.phoneRaw,
      email: staticCompany.email,
      address: staticCompany.address,
      mapQuery: staticCompany.mapQuery,
      mapsUrl: staticCompany.mapsUrl,
      establishedYear: staticCompany.establishedYear,
      workshopAddress: "Sentul Bogor, Jawa Barat",
    },
    stats: staticStats.map(adaptStat),
    services: staticServices.map((service) =>
      adaptService({
        ...service,
        icon: iconNameOf(service.icon),
        imageUrl: service.image,
      })
    ),
    clients: staticClients.map((client) => ({
      id: client.name,
      name: client.name,
      sector: client.sector,
      logo: client.logo,
    })),
    projects: {
      all: staticProjects.map((project) => adaptProject({ ...project, imageUrl: project.image })),
      featured: staticProjects
        .slice(0, 2)
        .map((project) => adaptProject({ ...project, imageUrl: project.image })),
      total: staticProjects.length,
    },
    faqs: staticFaqs.map((faq, index) => ({ id: `faq-${index}`, q: faq.q, a: faq.a })),
    highlights: staticHighlights.map((item, index) => ({
      id: `highlight-${index}`,
      icon: iconNameOf(item.icon),
      title: item.title,
      text: item.text,
      badge: item.badge ?? "",
    })),
    aboutValues: staticAboutValues.map((item, index) => ({
      id: `value-${index}`,
      icon: iconNameOf(item.icon),
      title: item.title,
      text: item.text,
    })),
    ctaPoints: staticCtaPoints.map((item, index) => ({
      id: `cta-${index}`,
      icon: iconNameOf(item.icon),
      title: item.title,
      text: item.text,
    })),
    workshops: staticWorkshops.map((workshop) => adaptWorkshop(workshop)),
  };
}

// ─────────────────────────────────────────────────────────────
// Pengambilan data
// ─────────────────────────────────────────────────────────────

/**
 * Seluruh konten situs dalam satu objek.
 *
 * Di-cache dengan tag `site-content`; backend memanggil endpoint
 * `/api/revalidate` setelah admin menyimpan perubahan agar cache ini dibuang.
 */
export async function getSiteContent() {
  "use cache";
  cacheTag(CONTENT_CACHE_TAG);
  cacheLife("hours");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/public/bootstrap`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();

    if (!payload?.success || !payload?.data) {
      throw new Error("respons API tidak valid");
    }

    return adaptBootstrap(payload.data);
  } catch (error) {
    console.warn(
      `[site-content] API tidak tersedia (${error.message}). Memakai data statis app/lib/data.js.`
    );
    return buildFallbackContent();
  }
}
