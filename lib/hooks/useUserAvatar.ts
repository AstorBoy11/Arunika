"use client";

import { useEffect, useState } from "react";

export const USER_AVATAR_STORAGE_KEY = "arunika-user-avatar";
export const USER_AVATAR_UPDATED_EVENT = "arunika-user-avatar-updated";

export const DEFAULT_USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA2GmZQePWPY04wHlVPH7g2QechnIQhqr-oZQY35eO03gOTMRZT0T5GiSUL_P2shWFbkumDQ5nZG9meggW2Ue_5QoK3xIQeiSO6WSq-Vq_UI5-GJnkbAA7mTvlFrsRPvs4ZPqcE-2oI6EGqR0oJe33z1XydzPgbdW-aHPkOeOvJV1xacWdkSfHJu7pRSGJ_8x0tOmrDi6G00Gq7LOwFzNPHhmHf5oydaiE-D6ueg-TdCHj9yQm37IUtDqXdlP-eeKsK6igXmU_1mfFC";

const getStoredAvatar = () => {
  if (typeof window === "undefined") {
    return DEFAULT_USER_AVATAR;
  }

  return window.localStorage.getItem(USER_AVATAR_STORAGE_KEY) ?? DEFAULT_USER_AVATAR;
};

export const saveUserAvatar = (nextAvatar: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_AVATAR_STORAGE_KEY, nextAvatar);
  window.dispatchEvent(new Event(USER_AVATAR_UPDATED_EVENT));
};

export function useUserAvatar() {
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_USER_AVATAR);

  useEffect(() => {
    setAvatarSrc(getStoredAvatar());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === USER_AVATAR_STORAGE_KEY) {
        setAvatarSrc(event.newValue ?? DEFAULT_USER_AVATAR);
      }
    };

    const handleAvatarUpdated = () => {
      setAvatarSrc(getStoredAvatar());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(USER_AVATAR_UPDATED_EVENT, handleAvatarUpdated);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(USER_AVATAR_UPDATED_EVENT, handleAvatarUpdated);
    };
  }, []);

  return avatarSrc;
}
