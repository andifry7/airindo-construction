/**
 * Pemetaan antara bentuk data API dan bentuk yang dipakai komponen admin.
 *
 * API memakai nama eksplisit (`imageUrl`, `logoUrl`), sedangkan komponen
 * lama memakai `image` / `logo`. Pemetaan dikumpulkan di sini supaya
 * komponen tidak perlu tahu detail kontrak API.
 */

// ── Proyek ───────────────────────────────────────────────────

export function projectFromApi(project) {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    categoryKey: project.categoryKey,
    image: project.imageUrl ?? "",
    imagePublicId: project.imagePublicId ?? "",
    location: project.location,
    client: project.client,
    year: project.year,
    capacity: project.capacity ?? "",
    specs: project.specs ?? "",
    scope: project.scope ?? "",
    description: project.description ?? "",
    tags: Array.isArray(project.tags) ? project.tags : [],
    featured: Boolean(project.featured),
    sortOrder: project.sortOrder ?? 0,
  };
}

export function projectToApi(project) {
  return {
    title: project.title,
    category: project.category,
    categoryKey: project.categoryKey,
    imageUrl: project.image || null,
    imagePublicId: project.imagePublicId || null,
    location: project.location,
    client: project.client,
    year: project.year,
    capacity: project.capacity || null,
    specs: project.specs || null,
    scope: project.scope || null,
    description: project.description || null,
    tags: Array.isArray(project.tags) ? project.tags : [],
    featured: Boolean(project.featured),
    sortOrder: Number(project.sortOrder) || 0,
  };
}

// ── Klien ────────────────────────────────────────────────────

export function clientFromApi(client) {
  return {
    id: client.id,
    name: client.name,
    sector: client.sector,
    logo: client.logoUrl ?? "",
    logoPublicId: client.logoPublicId ?? "",
    sortOrder: client.sortOrder ?? 0,
  };
}

export function clientToApi(client) {
  return {
    name: client.name,
    sector: client.sector,
    logoUrl: client.logo || null,
    logoPublicId: client.logoPublicId || null,
    sortOrder: Number(client.sortOrder) || 0,
  };
}

// ── Layanan ──────────────────────────────────────────────────

export function serviceFromApi(service) {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    shortTitle: service.shortTitle,
    icon: service.icon,
    image: service.imageUrl ?? "",
    imagePublicId: service.imagePublicId ?? "",
    badge: service.badge ?? "",
    lead: service.lead,
    description: service.description,
    scopePoints: Array.isArray(service.scopePoints) ? service.scopePoints : [],
    standards: Array.isArray(service.standards) ? service.standards : [],
    caseHighlight: service.caseHighlight ?? "",
    sortOrder: service.sortOrder ?? 0,
  };
}

export function serviceToApi(service) {
  return {
    title: service.title,
    shortTitle: service.shortTitle,
    icon: service.icon,
    badge: service.badge || null,
    lead: service.lead,
    description: service.description,
    scopePoints: service.scopePoints,
    standards: service.standards,
    caseHighlight: service.caseHighlight || null,
    sortOrder: Number(service.sortOrder) || 0,
  };
}

// ── Perusahaan ───────────────────────────────────────────────

export function companyFromApi(payload) {
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

export function companyToApi(formData) {
  return {
    name: formData.name,
    fullName: formData.fullName,
    tagline: formData.tagline,
    phone: formData.phone,
    phoneRaw: formData.phoneRaw,
    email: formData.email,
    address: formData.address,
    mapQuery: formData.mapQuery || null,
    mapsUrl: formData.mapsUrl || null,
    establishedYear: Number(formData.establishedYear) || undefined,
    workshopAddress: formData.workshopAddress || null,
    stats: (formData.stats ?? []).map((stat) => ({
      value: stat.value,
      label: stat.label,
      detail: stat.detail || null,
    })),
  };
}
