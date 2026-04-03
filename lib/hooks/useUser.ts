"use client";

import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { IAddress, IUser } from "@/lib/models";

type UserData = Pick<IUser, "name" | "email" | "phone" | "addresses"> & {
  _id: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type UpdateProfilePayload = {
  name?: string;
  phone?: string;
};

type CreateAddressPayload = {
  label: string;
  type: "home" | "office";
  recipient: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  isDefault?: boolean;
};

type UpdateAddressPayload = Partial<CreateAddressPayload>;

type UserContextValue = {
  user: UserData | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<UserData | null>;
  updateProfile: (id: string, data: UpdateProfilePayload) => Promise<UserData | null>;
  addAddress: (id: string, data: CreateAddressPayload) => Promise<UserData | null>;
  updateAddress: (id: string, addressId: number, data: UpdateAddressPayload) => Promise<UserData | null>;
  deleteAddress: (id: string, addressId: number) => Promise<UserData | null>;
  clearError: () => void;
};

const STORAGE_KEY = "arunika-user";

const UserContext = createContext<UserContextValue | undefined>(undefined);

const normalizeUser = (input: UserData): UserData => ({
  _id: input._id,
  name: input.name,
  email: input.email,
  phone: input.phone,
  addresses: input.addresses,
});

const parseStoredUser = (raw: string | null): UserData | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as UserData;
    if (!parsed?._id) return null;
    return normalizeUser(parsed);
  } catch {
    return null;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const persistUser = useCallback((nextUser: UserData | null) => {
    if (typeof window === "undefined") return;

    if (!nextUser) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const handleApiError = useCallback((message: string) => {
    setError(message);
  }, []);

  const fetchUser = useCallback(
    async (id: string): Promise<UserData | null> => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${id}`, { cache: "no-store" });
        const json = (await response.json()) as ApiResponse<UserData>;

        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.message || "Gagal memuat user");
        }

        const normalized = normalizeUser(json.data);
        setUser(normalized);
        persistUser(normalized);
        return normalized;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal memuat user";
        handleApiError(message);
        return null;
      } finally {
        setActionLoading(false);
      }
    },
    [handleApiError, persistUser]
  );

  const updateProfile = useCallback(
    async (id: string, data: UpdateProfilePayload): Promise<UserData | null> => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = (await response.json()) as ApiResponse<UserData>;

        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.message || "Gagal memperbarui profil");
        }

        const normalized = normalizeUser(json.data);
        setUser(normalized);
        persistUser(normalized);
        return normalized;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal memperbarui profil";
        handleApiError(message);
        return null;
      } finally {
        setActionLoading(false);
      }
    },
    [handleApiError, persistUser]
  );

  const addAddress = useCallback(
    async (id: string, data: CreateAddressPayload): Promise<UserData | null> => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${id}/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = (await response.json()) as ApiResponse<UserData>;

        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.message || "Gagal menambahkan alamat");
        }

        const normalized = normalizeUser(json.data);
        setUser(normalized);
        persistUser(normalized);
        return normalized;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal menambahkan alamat";
        handleApiError(message);
        return null;
      } finally {
        setActionLoading(false);
      }
    },
    [handleApiError, persistUser]
  );

  const updateAddress = useCallback(
    async (id: string, addressId: number, data: UpdateAddressPayload): Promise<UserData | null> => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${id}/addresses/${addressId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const json = (await response.json()) as ApiResponse<UserData>;

        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.message || "Gagal memperbarui alamat");
        }

        const normalized = normalizeUser(json.data);
        setUser(normalized);
        persistUser(normalized);
        return normalized;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal memperbarui alamat";
        handleApiError(message);
        return null;
      } finally {
        setActionLoading(false);
      }
    },
    [handleApiError, persistUser]
  );

  const deleteAddress = useCallback(
    async (id: string, addressId: number): Promise<UserData | null> => {
      try {
        setActionLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${id}/addresses/${addressId}`, {
          method: "DELETE",
        });
        const json = (await response.json()) as ApiResponse<UserData>;

        if (!response.ok || !json.success || !json.data) {
          throw new Error(json.message || "Gagal menghapus alamat");
        }

        const normalized = normalizeUser(json.data);
        setUser(normalized);
        persistUser(normalized);
        return normalized;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal menghapus alamat";
        handleApiError(message);
        return null;
      } finally {
        setActionLoading(false);
      }
    },
    [handleApiError, persistUser]
  );

  useEffect(() => {
    const bootstrapUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const stored = parseStoredUser(window.localStorage.getItem(STORAGE_KEY));
        if (stored?._id) {
          const refreshed = await fetchUser(stored._id);
          if (refreshed) return;
        }

        const usersResponse = await fetch("/api/users", { cache: "no-store" });
        const usersJson = (await usersResponse.json()) as ApiResponse<UserData[]>;

        if (!usersResponse.ok || !usersJson.success) {
          throw new Error(usersJson.message || "Gagal memuat daftar user");
        }

        const firstUser = usersJson.data?.[0] ?? null;
        if (!firstUser) {
          handleApiError("Belum ada user di database. Tambahkan user terlebih dahulu.");
          persistUser(null);
          setUser(null);
          return;
        }

        const normalized = normalizeUser(firstUser);
        setUser(normalized);
        persistUser(normalized);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Gagal inisialisasi user";
        handleApiError(message);
      } finally {
        setLoading(false);
      }
    };

    void bootstrapUser();
  }, [fetchUser, handleApiError, persistUser]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<UserContextValue>(
    () => ({
      user,
      loading,
      actionLoading,
      error,
      fetchUser,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      clearError,
    }),
    [
      actionLoading,
      addAddress,
      clearError,
      deleteAddress,
      error,
      fetchUser,
      loading,
      updateAddress,
      updateProfile,
      user,
    ]
  );

  return createElement(UserContext.Provider, { value }, children);
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
