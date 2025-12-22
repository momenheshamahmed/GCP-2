import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "investor";
  avatar?: string;
}

interface AppState {
  // Theme
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;

  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Map State
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  mapViewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  setMapViewport: (viewport: {
    latitude: number;
    longitude: number;
    zoom: number;
  }) => void;

  // Filters
  mineralFilters: string[];
  setMineralFilters: (filters: string[]) => void;
  toggleMineralFilter: (filter: string) => void;

  // Language
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: "system",
      setTheme: (theme) => set({ theme }),

      // User
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      isAuthenticated: false,

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

      // Map State
      selectedRegion: null,
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      mapViewport: {
        latitude: 24.7136, // Saudi Arabia center
        longitude: 46.6753,
        zoom: 5,
      },
      setMapViewport: (viewport) => set({ mapViewport: viewport }),

      // Filters
      mineralFilters: [],
      setMineralFilters: (filters) => set({ mineralFilters: filters }),
      toggleMineralFilter: (filter) => {
        const filters = get().mineralFilters;
        if (filters.includes(filter)) {
          set({ mineralFilters: filters.filter((f) => f !== filter) });
        } else {
          set({ mineralFilters: [...filters, filter] });
        }
      },

      // Language
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "saudi-mining-store",
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

