"use client";

import { useState, useEffect, Suspense } from "react";
import {
  company,
  companyStats,
  services as initialServices,
  clients as initialClients,
  projects as initialProjects,
} from "@/lib/data";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProjectsManager from "@/components/admin/ProjectsManager";
import ClientsManager from "@/components/admin/ClientsManager";
import ServicesManager from "@/components/admin/ServicesManager";
import CompanySettings from "@/components/admin/CompanySettings";
import LoginForm from "@/components/admin/LoginForm";
import { authApi } from "@/lib/admin-api";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

function AdminPortalContent() {
  // Sesi admin — diverifikasi ke backend, bukan disimpan di browser
  const [authUser, setAuthUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Local editable data state
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [companyData, setCompanyData] = useState(company);
  const [statsData, setStatsData] = useState(companyStats);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

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

  // Muat data konten dari localStorage.
  // Sementara — diganti pengambilan dari API pada Fase 5b.
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Load Projects
        const savedProjects = localStorage.getItem("airindo_projects");
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          // Add featured flag to first 2 items by default
          const seeded = initialProjects.map((p, idx) => ({
            ...p,
            featured: idx < 2,
          }));
          setProjects(seeded);
        }

        // Load Clients
        const savedClients = localStorage.getItem("airindo_clients");
        if (savedClients) {
          setClients(JSON.parse(savedClients));
        } else {
          setClients(initialClients);
        }

        // Load Services
        const savedServices = localStorage.getItem("airindo_services");
        if (savedServices) {
          setServices(JSON.parse(savedServices));
        } else {
          setServices(initialServices);
        }

        // Load Company Info
        const savedCompany = localStorage.getItem("airindo_company");
        if (savedCompany) {
          setCompanyData(JSON.parse(savedCompany));
        }

        // Load Stats
        const savedStats = localStorage.getItem("airindo_stats");
        if (savedStats) {
          setStatsData(JSON.parse(savedStats));
        }
      } catch (err) {
        console.error("Failed to load local admin data:", err);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save changes to localStorage helper
  const persistState = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  // Handler autentikasi — sesi dikelola server lewat cookie httpOnly
  const handleLoginSuccess = (user) => {
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
  const handleAddProject = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    persistState("airindo_projects", updated);
    showToast(`Proyek "${newProject.title}" berhasil ditambahkan.`);
  };

  const handleUpdateProject = (updatedProject) => {
    const updated = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updated);
    persistState("airindo_projects", updated);
    showToast(`Proyek "${updatedProject.title}" berhasil diperbarui.`);
  };

  const handleDeleteProject = (projectId) => {
    const target = projects.find((p) => p.id === projectId);
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    persistState("airindo_projects", updated);
    showToast(`Proyek "${target?.title || "Terpilih"}" telah dihapus.`, "info");
  };

  const handleToggleFeatured = (projectId) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        const nextFeatured = !p.featured;
        showToast(
          nextFeatured
            ? `"${p.title}" ditampilkan di beranda.`
            : `"${p.title}" dihapus dari beranda.`
        );
        return { ...p, featured: nextFeatured };
      }
      return p;
    });
    setProjects(updated);
    persistState("airindo_projects", updated);
  };

  // --- CRUD Clients ---
  const handleAddClient = (newClient) => {
    const updated = [newClient, ...clients];
    setClients(updated);
    persistState("airindo_clients", updated);
    showToast(`Klien "${newClient.name}" berhasil ditambahkan.`);
  };

  const handleUpdateClient = (index, updatedClient) => {
    const updated = [...clients];
    updated[index] = updatedClient;
    setClients(updated);
    persistState("airindo_clients", updated);
    showToast(`Data klien "${updatedClient.name}" diperbarui.`);
  };

  const handleDeleteClient = (index) => {
    const target = clients[index];
    const updated = clients.filter((_, i) => i !== index);
    setClients(updated);
    persistState("airindo_clients", updated);
    showToast(`Klien "${target?.name || "Terpilih"}" dihapus.`, "info");
  };

  // --- Services ---
  const handleUpdateService = (updatedService) => {
    const updated = services.map((s) =>
      s.id === updatedService.id ? updatedService : s
    );
    setServices(updated);
    persistState("airindo_services", updated);
    showToast(`Layanan "${updatedService.title}" berhasil diperbarui.`);
  };

  // --- Company Settings ---
  const handleSaveCompanySettings = (formData) => {
    setCompanyData(formData);
    persistState("airindo_company", formData);

    if (formData.stats) {
      setStatsData(formData.stats);
      persistState("airindo_stats", formData.stats);
    }

    showToast("Informasi perusahaan & kontak berhasil disimpan.");
  };

  // --- Backup & Reset ---
  const handleExportJson = () => {
    const exportBundle = {
      exportedAt: new Date().toISOString(),
      company: companyData,
      companyStats: statsData,
      projects,
      clients,
      services,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `airindo-content-backup-${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast("File cadangan JSON berhasil diunduh.");
  };

  const handleResetDefault = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin mengembalikan semua data proyek, klien, dan pengaturan ke data awal bawaan kode?"
      )
    ) {
      localStorage.removeItem("airindo_projects");
      localStorage.removeItem("airindo_clients");
      localStorage.removeItem("airindo_services");
      localStorage.removeItem("airindo_company");
      localStorage.removeItem("airindo_stats");

      setProjects(
        initialProjects.map((p, idx) => ({ ...p, featured: idx < 2 }))
      );
      setClients(initialClients);
      setServices(initialServices);
      setCompanyData(company);
      setStatsData(companyStats);

      showToast("Seluruh data dikembalikan ke default bawaan.", "info");
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
          {toast.type === "info" ? (
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
          projects: projects.length,
          clients: clients.length,
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobile={() => setIsMobileSidebarOpen(true)}
          onExportJson={handleExportJson}
          onResetDefault={handleResetDefault}
        />

        {/* Tab View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && (
            <DashboardOverview
              projects={projects}
              clients={clients}
              companyData={companyData}
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
