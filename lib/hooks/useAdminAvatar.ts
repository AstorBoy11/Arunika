"use client";

import { useEffect, useState } from "react";

export const ADMIN_AVATAR_STORAGE_KEY = "arunika-admin-avatar";
export const ADMIN_AVATAR_UPDATED_EVENT = "arunika-admin-avatar-updated";

export const DEFAULT_ADMIN_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPm2FuOkpZbQ74djdMD59KmT18_KcjZ5d6FmHcRNABFvPDkQKaVcDb3Q02KLzqFCsg6halyhJv0TcgllVCpNqJ_34kTpDIsdGXqpco8cQjKBq2iO_QrxymGiNyb0p3si8ru0hC-n5hKUrB6jvT_uE39rBhAIMfMtYSQS1Y-OUalputwF5qPM3avyJ2WNouN_negs2tm0r3uRF2JMP83BlB3bc2yo1ntZ86uO7PwU5QEB4ObrjLa4JtOegY14MNIii6-rBGlzw8lkgX";

const getStoredAvatar = () => {
  if (typeof window === "undefined") {
    return DEFAULT_ADMIN_AVATAR;
  }

  return window.localStorage.getItem(ADMIN_AVATAR_STORAGE_KEY) ?? DEFAULT_ADMIN_AVATAR;
};

export const saveAdminAvatar = (nextAvatar: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ADMIN_AVATAR_STORAGE_KEY, nextAvatar);
  window.dispatchEvent(new Event(ADMIN_AVATAR_UPDATED_EVENT));
};

export function useAdminAvatar() {
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_ADMIN_AVATAR);

  useEffect(() => {
    setAvatarSrc(getStoredAvatar());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ADMIN_AVATAR_STORAGE_KEY) {
        setAvatarSrc(event.newValue ?? DEFAULT_ADMIN_AVATAR);
      }
    };

    const handleAvatarUpdated = () => {
      setAvatarSrc(getStoredAvatar());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(ADMIN_AVATAR_UPDATED_EVENT, handleAvatarUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(ADMIN_AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    };
  }, []);

  return avatarSrc;
}
