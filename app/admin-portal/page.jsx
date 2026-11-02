"use client";

import { useCallback, useEffect, useState, Suspense } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ClientsManager from "@/components/admin/ClientsManager";
import ServicesManager from "@/components/admin/ServicesManager";
import CompanySettings from "@/components/admin/CompanySettings";
import LoginForm from "@/components/admin/LoginForm";
import { adminApi, authApi } from "@/lib/admin-api";
import {
  clientFromApi,
  clientToApi,
  companyFromApi,
  companyToApi,
  projectFromApi,
  projectToApi,
  serviceFromApi,
  serviceToApi,
} from "@/lib/admin-mappers";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

function AdminPortalContent() {
  // Sesi admin — diverifikasi ke backend, bukan disimpan di browser
  const [authUser, setAuthUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Konten — seluruhnya berasal dari database
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [companyData, setCompanyData] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [counts, setCounts] = useState(null);
  const [isContentLoading, setIsContentLoading] = useState(true);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // Verifikasi sesi ke backend saat panel dibuka
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { user } = await authApi.me();
        if (active) setAuthUser(user);
      } catch {
        if (active) setAuthUser(null);
      } finally {
        if (active) setIsAuthChecking(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  /** Ambil seluruh konten dari API. */
  const loadContent = useCallback(async () => {
    const [projectsRes, clientsRes, servicesRes, companyRes, dashboardRes] = await Promise.all([
      adminApi.projects.list({ limit: 100 }),
      adminApi.clients.list(),
      adminApi.services.list(),
      adminApi.company.get(),
      adminApi.dashboard(),
    ]);

    setProjects(projectsRes.map(projectFromApi));
    setClients(clientsRes.map(clientFromApi));
    setServices(servicesRes.map(serviceFromApi));
    setCompanyData(companyFromApi(companyRes));
    setStatsData(companyRes.stats ?? []);
    setCounts(dashboardRes);
  }, []);

  // Muat konten setelah sesi diketahui valid.
  // Status loading sudah `true` sejak awal (dan di-set saat login),
  // jadi tidak perlu setState sinkron di dalam effect.
  useEffect(() => {
    if (!authUser) return undefined;

    let active = true;

    const run = async () => {
      try {
        await loadContent();
      } catch (error) {
        if (!active) return;
        if (error?.isUnauthorized) {
          setAuthUser(null);
          return;
        }
        showToast(error?.message || "Gagal memuat konten dari server.", "error");
      } finally {
        if (active) setIsContentLoading(false);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [authUser, loadContent, showToast]);

  /** Setelah setiap mutasi, ambil ulang data agar tampilan = isi database. */
  const refreshAfterMutation = useCallback(async () => {
    try {
      await loadContent();
    } catch {
      // Toast utama sudah memberi tahu pengguna; kegagalan refresh tidak fatal.
    }
  }, [loadContent]);

  // Handler autentikasi
  const handleLoginSuccess = (user) => {
    setIsContentLoading(true);
    setAuthUser(user);
    showToast(`Selamat datang, ${user?.displayName || user?.username || "Admin"}.`, "success");
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Walau permintaan gagal, panel tetap dikunci di sisi klien.
    }
    setAuthUser(null);
    showToast("Anda telah keluar dari panel admin.", "info");
  };

  // --- CRUD Projects ---
  const handleAddProject = async (project) => {
    try {
      await adminApi.projects.create(projectToApi(project));
      await refreshAfterMutation();
      showToast(`Proyek "${project.title}" berhasil ditambahkan.`);
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal menambahkan proyek.", "error");
      return false;
    }
  };

  const handleUpdateProject = async (project) => {
    try {
      await adminApi.projects.update(project.id, projectToApi(project));
      await refreshAfterMutation();
      showToast(`Proyek "${project.title}" berhasil diperbarui.`);
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal memperbarui proyek.", "error");
      return false;
    }
  };

  const handleDeleteProject = async (projectId) => {
    const target = projects.find((item) => item.id === projectId);
    try {
      await adminApi.projects.remove(projectId);
      await refreshAfterMutation();
      showToast(`Proyek "${target?.title || "Terpilih"}" telah dihapus.`, "info");
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal menghapus proyek.", "error");
      return false;
    }
  };

  const handleToggleFeatured = async (projectId) => {
    const target = projects.find((item) => item.id === projectId);
    if (!target) return false;

    try {
      await adminApi.projects.setFeatured(projectId, !target.featured);
      await refreshAfterMutation();
      showToast(
        !target.featured
          ? `"${target.title}" ditampilkan di beranda.`
          : `"${target.title}" dihapus dari beranda.`
      );
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal mengubah status unggulan.", "error");
      return false;
    }
  };

  // --- CRUD Clients ---
  const handleAddClient = async (client) => {
    try {
      await adminApi.clients.create(clientToApi(client));
      await refreshAfterMutation();
      showToast(`Klien "${client.name}" berhasil ditambahkan.`);
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal menambahkan klien.", "error");
      return false;
    }
  };

  const handleUpdateClient = async (clientId, client) => {
    try {
      await adminApi.clients.update(clientId, clientToApi(client));
      await refreshAfterMutation();
      showToast(`Data klien "${client.name}" diperbarui.`);
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal memperbarui klien.", "error");
      return false;
    }
  };

  const handleDeleteClient = async (clientId) => {
    const target = clients.find((item) => item.id === clientId);
    try {
      await adminApi.clients.remove(clientId);
      await refreshAfterMutation();
      showToast(`Klien "${target?.name || "Terpilih"}" dihapus.`, "info");
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal menghapus klien.", "error");
      return false;
    }
  };

  // --- Services (edit-only, 4 pilar) ---
  const handleUpdateService = async (service) => {
    try {
      await adminApi.services.update(service.id, serviceToApi(service));
      await refreshAfterMutation();
      showToast(`Layanan "${service.title}" berhasil diperbarui.`);
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal memperbarui layanan.", "error");
      return false;
    }
  };

  // --- Company Settings ---
  const handleSaveCompanySettings = async (formData) => {
    try {
      const result = await adminApi.company.update(companyToApi(formData));
      setCompanyData(companyFromApi(result));
      setStatsData(result.stats ?? []);
      showToast("Informasi perusahaan & kontak berhasil disimpan.");
      return true;
    } catch (error) {
      showToast(error?.message || "Gagal menyimpan pengaturan.", "error");
      return false;
    }
  };

  // --- Backup JSON (dari server) ---
  const handleExportJson = async () => {
    try {
      const bundle = await adminApi.exportAll();
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `airindo-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      showToast("File cadangan JSON berhasil diunduh.");
    } catch (error) {
      showToast(error?.message || "Gagal membuat cadangan.", "error");
    }
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#081a38] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400 font-mono">Memuat Panel Airindo...</p>
        </div>
      </div>
    );
  }

  // Belum punya sesi valid → tampilkan form login
  if (!authUser) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          {toast.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : toast.type === "info" ? (
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="p-1 hover:text-slate-300 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
        onLock={handleLogout}
        statsCount={{
          projects: counts?.projects ?? projects.length,
          clients: counts?.clients ?? clients.length,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobile={() => setIsMobileSidebarOpen(true)}
          onExportJson={handleExportJson}
        />

        {/* Tab View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {isContentLoading ? (
            <div className="flex items-center justify-center py-28 text-slate-500 text-xs font-medium">
              <span className="inline-block w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin mr-2.5" />
              Memuat konten dari server...
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <DashboardOverview
                  projects={projects}
                  clients={clients}
                  companyData={companyData}
                  counts={counts}
                  onNavigateTab={setActiveTab}
                  onOpenNewProject={() => setActiveTab("projects")}
                  onOpenNewClient={() => setActiveTab("clients")}
                />
              )}

              {activeTab === "projects" && (
                <ProjectsManager
                  projects={projects}
                  onAddProject={handleAddProject}
                  onUpdateProject={handleUpdateProject}
                  onDeleteProject={handleDeleteProject}
                  onToggleFeatured={handleToggleFeatured}
                />
              )}

              {activeTab === "clients" && (
                <ClientsManager
                  clients={clients}
                  onAddClient={handleAddClient}
                  onUpdateClient={handleUpdateClient}
                  onDeleteClient={handleDeleteClient}
                />
              )}

              {activeTab === "services" && (
                <ServicesManager
                  services={services}
                  onUpdateService={handleUpdateService}
                />
              )}

              {activeTab === "settings" && (
                <CompanySettings
                  companyData={companyData}
                  companyStats={statsData}
                  onSaveSettings={handleSaveCompanySettings}
                  onPasswordChanged={handleLogout}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#081a38] flex items-center justify-center text-white">
          <div className="w-8 h-8 border-3 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminPortalContent />
    </Suspense>
  );
}
