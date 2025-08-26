import { Card } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { Testimonial } from "@/types";
import { appStrings } from "@/config/strings";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="mt-8 sm:mt-12">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          {appStrings.sections.testimonials.title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          {appStrings.sections.testimonials.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="bg-card border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="text-xl sm:text-2xl">{testimonial.avatar}</div>
              <div>
                <div className="font-medium text-foreground text-sm sm:text-base">
                  {testimonial.name}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <StarRating rating={testimonial.rating} />
            </div>

            <p className="text-xs sm:text-sm text-card-foreground leading-relaxed">
              "{testimonial.comment}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
