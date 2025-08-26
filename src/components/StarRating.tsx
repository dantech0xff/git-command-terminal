import { Star, StarHalf } from "@phosphor-icons/react";

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
          weight="fill"
          className={`${
            interactive ? "cursor-pointer hover:text-accent" : ""
          } text-accent`}
          onClick={interactive ? () => onClick?.(i) : undefined}
        />
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          size={16}
          weight="fill"
          className={`${
            interactive ? "cursor-pointer hover:text-accent" : ""
          } text-accent`}
          onClick={interactive ? () => onClick?.(i) : undefined}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={16}
          weight="regular"
          className={`${
            interactive ? "cursor-pointer hover:text-accent" : ""
          } text-muted-foreground`}
          onClick={interactive ? () => onClick?.(i) : undefined}
        />
      );
    }
  }
  return <>{stars}</>;
}
