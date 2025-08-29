import { Terminal, Palette, Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { themes } from "@/lib/themes";
import { appStrings } from "@/config/strings";

interface AppHeaderProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onClearTerminal: () => void;
  showTerminal: boolean;
  showInfoPanel: boolean;
  onToggleTerminal: () => void;
  onToggleInfoPanel: () => void;
}

export function AppHeader({
  currentThemeId,
  onThemeChange,
  onClearTerminal,
  showTerminal,
  showInfoPanel,
  onToggleTerminal,
  onToggleInfoPanel,
}: AppHeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 text-foreground">
      <Terminal size={20} strokeWidth={2.5} className="sm:hidden" />
      <Terminal size={24} strokeWidth={2.5} className="hidden sm:block" />
      <h1 className="text-lg sm:text-xl font-bold">{appStrings.app.title}</h1>
      <div className="ml-auto flex gap-1 sm:gap-2 items-center">
        {/* Panel Toggle Controls */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleTerminal}
          className="h-7 sm:h-8 px-2 text-xs"
          title="Toggle Terminal">
          {showTerminal ? <Eye size={14} /> : <EyeOff size={14} />}
          <span className="hidden sm:inline ml-1">Terminal</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleInfoPanel}
          className="h-7 sm:h-8 px-2 text-xs"
          title="Toggle Info Panel">
          {showInfoPanel ? <Info size={14} /> : <EyeOff size={14} />}
          <span className="hidden sm:inline ml-1">Info</span>
        </Button>
        
        {/* Theme Selector */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Palette size={14} className="text-muted-foreground sm:hidden" />
          <Palette
            size={16}
            className="text-muted-foreground hidden sm:block"
          />
          <Select value={currentThemeId} onValueChange={onThemeChange}>
            <SelectTrigger className="w-36 sm:w-40 h-7 sm:h-8 text-xs theme-selector">
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
          className="hidden sm:flex text-xs px-2 sm:px-3 py-1 h-7 sm:h-8 hover:text-foreground">
          {appStrings.ui.buttons.clear}
        </Button>
      </div>
    </div>
  );
}
