import { Terminal, Palette } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/lib/themes";

interface AppHeaderProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onClearTerminal: () => void;
}

export function AppHeader({
  currentThemeId,
  onThemeChange,
  onClearTerminal,
}: AppHeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-foreground">
      <Terminal size={20} weight="bold" className="sm:hidden" />
      <Terminal size={24} weight="bold" className="hidden sm:block" />
      <h1 className="text-lg sm:text-xl font-bold">Git Command Terminal</h1>
      <div className="ml-auto flex gap-1 sm:gap-2 items-center">
        {/* Theme Selector */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Palette size={14} className="text-muted-foreground sm:hidden" />
          <Palette
            size={16}
            className="text-muted-foreground hidden sm:block"
          />
          <Select value={currentThemeId} onValueChange={onThemeChange}>
            <SelectTrigger className="w-28 sm:w-40 h-7 sm:h-8 text-xs theme-selector">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {themes.map((theme) => (
                <SelectItem key={theme.id} value={theme.id} className="text-xs">
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onClearTerminal}
          className="text-xs px-2 sm:px-3 py-1 h-7 sm:h-8 hover:text-foreground">
          Clear
        </Button>
      </div>
    </div>
  );
}
