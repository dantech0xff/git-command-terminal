import { Terminal, Copy } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitCommand } from "@/lib/git-commands";

interface CommandDetailsProps {
  command: any;
}

export function CommandDetails({ command }: CommandDetailsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className="bg-card border border-border p-3 sm:p-4">
      <h3 className="font-medium text-foreground mb-3 flex items-center gap-2 text-sm">
        <Terminal size={14} className="sm:hidden" />
        <Terminal size={16} className="hidden sm:block" />
        <span className="hidden sm:inline">Command Details</span>
        <span className="sm:hidden">Details</span>
      </h3>

      <div className="space-y-3 text-xs sm:text-sm">
        <div>
          <div className="text-primary font-mono font-medium mb-1 break-words">
            {command.command}
          </div>
          <div className="text-card-foreground leading-relaxed">
            {command.description}
          </div>
        </div>

        <div>
          <div className="text-muted-foreground font-medium mb-1">Usage:</div>
          <code className="text-xs bg-muted text-muted-foreground p-2 rounded block break-words">
            {command.usage}
          </code>
        </div>

        {command.examples && command.examples.length > 0 && (
          <div>
            <div className="text-muted-foreground font-medium mb-2">
              Examples:
            </div>
            <div className="space-y-1">
              {command.examples.map((example: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <code className="text-xs bg-muted text-muted-foreground p-1 rounded flex-1 break-words">
                    {example}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(example)}
                    className="h-6 w-6 p-0 copy-button flex-shrink-0">
                    <Copy size={10} className="sm:hidden" />
                    <Copy size={12} className="hidden sm:block" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
