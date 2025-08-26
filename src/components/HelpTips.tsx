import { Card } from "@/components/ui/card";
import { appStrings } from "@/config/strings";

export function HelpTips() {
  return (
    <Card className="bg-card border border-border p-3 sm:p-4">
      <h3 className="font-medium text-foreground mb-3 text-sm">
        {appStrings.sections.helpTips.title}
      </h3>
      <div className="text-xs text-muted-foreground space-y-2">
        <p>• {appStrings.tips.navigation.history}</p>
        <p className="hidden sm:block">
          • {appStrings.tips.navigation.autocomplete}
        </p>
        <p className="sm:hidden">
          • {appStrings.tips.navigation.autocompleteMobile}
        </p>
        <p className="hidden sm:block">
          • {appStrings.tips.navigation.relatedCommands}
        </p>
        <p className="sm:hidden">
          • {appStrings.tips.navigation.relatedCommandsMobile}
        </p>
        <p className="hidden sm:block">
          • {appStrings.tips.navigation.persistence}
        </p>
        <p className="sm:hidden">
          • {appStrings.tips.navigation.persistenceMobile}
        </p>
      </div>
    </Card>
  );
}
