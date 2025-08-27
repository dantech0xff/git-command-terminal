import { useEffect } from "react";
import { toast } from "sonner";
import {
  getCurrentTheme,
  setCurrentTheme,
  themes,
  applyTheme,
} from "@/lib/themes";
import { strings } from "@/config/strings";

interface UseThemeHandlersProps {
  currentThemeId: string;
  setCurrentThemeId: (themeId: string) => void;
}

export function useThemeHandlers({ currentThemeId, setCurrentThemeId }: UseThemeHandlersProps) {
  // Theme management effects
  useEffect(() => {
    const savedTheme = getCurrentTheme();
    setCurrentThemeId(savedTheme);
    const theme = themes.find((t) => t.id === savedTheme) || themes[0];
    applyTheme(theme);
  }, [setCurrentThemeId]);

  useEffect(() => {
    const theme = themes.find((t) => t.id === currentThemeId) || themes[0];
    applyTheme(theme);
  }, [currentThemeId]);

  const handleThemeChange = (themeId: string) => {
    setCurrentThemeId(themeId);
    setCurrentTheme(themeId);
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      toast.success(
        strings.buildSuccessMessage("themeChanged", { themeName: theme.name })
      );
    }
  };

  return {
    handleThemeChange,
  };
}