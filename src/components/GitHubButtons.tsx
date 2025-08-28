import { useState, useEffect } from "react";
import { Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appStrings } from "@/config/strings";

interface GitHubData {
  stargazers_count: number;
}

export function GitHubButtons() {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const repositoryUrl = appStrings.footer.github.repositoryUrl;
  const repoPath = repositoryUrl.replace("https://github.com/", "");

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repoPath}`);
        if (response.ok) {
          const data: GitHubData = await response.json();
          setStarCount(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub star count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarCount();
  }, [repoPath]);

  const handleStarClick = () => {
    window.open(repositoryUrl, "_blank", "noopener,noreferrer");
  };

  const handleForkClick = () => {
    window.open(`${repositoryUrl}/fork`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Star Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleStarClick}
        className="flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1 h-7 sm:h-8 hover:text-foreground"
        disabled={loading}
      >
        <Star size={14} className="fill-current" />
        <span className="hidden sm:inline">{appStrings.footer.github.starText}</span>
        {starCount !== null && (
          <span className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">
            {starCount}
          </span>
        )}
      </Button>

      {/* Fork Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleForkClick}
        className="flex items-center gap-1.5 text-xs px-2 sm:px-3 py-1 h-7 sm:h-8 hover:text-foreground"
      >
        <GitFork size={14} />
        <span className="hidden sm:inline">{appStrings.footer.github.forkText}</span>
      </Button>

      {/* Sponsor Button */}
      <iframe
        src="https://github.com/sponsors/dantech0xff/button"
        title="Sponsor dantech0xff"
        height="32"
        width="114"
        style={{ border: 0, borderRadius: '6px' }}
      />
    </div>
  );
}