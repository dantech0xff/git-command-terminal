import { Code, Globe } from "@phosphor-icons/react";
import { appStrings, interpolateString } from "@/config/strings";

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 sm:mt-20 border-t border-border pt-6 sm:pt-8 pb-8 sm:pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <Code size={14} className="text-primary sm:hidden" />
            <Code size={16} className="text-primary hidden sm:block" />
          </div>
          <div className="text-center md:text-left">
            <div className="font-medium text-foreground text-sm sm:text-base">
              {appStrings.footer.builtBy}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {appStrings.footer.tagline}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <a
            href={appStrings.footer.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
            <Globe size={14} className="sm:hidden" />
            <Globe size={16} className="hidden sm:block" />
            {appStrings.footer.visitBlog}
          </a>
          <div className="text-xs text-muted-foreground">
            {interpolateString(appStrings.footer.copyright, {
              year: currentYear,
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
