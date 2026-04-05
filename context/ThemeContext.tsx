"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

export function useTheme() {
    const { theme, setTheme, resolvedTheme } = useNextTheme();
    // Return consistent interface matching previous manual context if possible, 
    // or just expose what we need. 
    // Previous: { theme: "dark"|"light", toggleTheme: () => void }
    // Next-themes: { theme, setTheme, ... }

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const toggleTheme = () => {
        const current = resolvedTheme || theme;
        setTheme(current === "dark" ? "light" : "dark");
    };

    const setThemeMode = (mode: "light" | "dark" | "system") => {
        setTheme(mode);
    };

    // Avoid hydration mismatch
    if (!mounted) {
        return {
            theme: "light",
            themeMode: "system",
            toggleTheme,
            setTheme,
            setThemeMode,
            mounted: false,
        };
    }

    // Return resolvedTheme as 'theme' so consuming components (AdminHeader) 
    // checking (theme === 'dark') work correctly with system preferences.
    return {
        theme: resolvedTheme,
        themeMode: (theme ?? "system") as "light" | "dark" | "system",
        toggleTheme,
        setTheme,
        setThemeMode,
        mounted: true,
    };
}
