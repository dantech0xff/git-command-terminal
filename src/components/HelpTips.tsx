import { Card } from "@/components/ui/card";

export function HelpTips() {
  return (
    <Card className="bg-card border border-border p-3 sm:p-4">
      <h3 className="font-medium text-foreground mb-3 text-sm">Tips</h3>
      <div className="text-xs text-muted-foreground space-y-2">
        <p>• Use ↑/↓ arrows for history</p>
        <p className="hidden sm:block">• Press Tab for command autocomplete</p>
        <p className="sm:hidden">• Tab for autocomplete</p>
        <p className="hidden sm:block">• Click related commands to explore</p>
        <p className="sm:hidden">• Click suggestions</p>
        <p className="hidden sm:block">
          • Your history is saved between sessions
        </p>
        <p className="sm:hidden">• History is saved</p>
      </div>
    </Card>
  );
}
