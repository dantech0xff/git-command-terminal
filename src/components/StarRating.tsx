import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onClick?: (rating: number) => void;
}

export function StarRating({
  rating,
  interactive = false,
  onClick,
}: StarRatingProps) {
  const stars: React.ReactNode[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill="currentColor"
          className={`${
            interactive ? "cursor-pointer hover:text-accent" : ""
          } text-accent`}
          onClick={interactive ? () => onClick?.(i) : undefined}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      // Create a half-star effect using CSS
      stars.push(
        <div key={i} className="relative inline-block">
          <Star
            size={16}
            className={`${
              interactive ? "cursor-pointer hover:text-accent" : ""
            } text-muted-foreground`}
            onClick={interactive ? () => onClick?.(i) : undefined}
          />
          <Star
            size={16}
            fill="currentColor"
            className={`absolute top-0 left-0 text-accent overflow-hidden ${
              interactive ? "cursor-pointer hover:text-accent" : ""
            }`}
            style={{ clipPath: "inset(0 50% 0 0)" }}
            onClick={interactive ? () => onClick?.(i) : undefined}
          />
        </div>
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${
            interactive ? "cursor-pointer hover:text-accent" : ""
          } text-muted-foreground`}
          onClick={interactive ? () => onClick?.(i) : undefined}
        />
      );
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}
