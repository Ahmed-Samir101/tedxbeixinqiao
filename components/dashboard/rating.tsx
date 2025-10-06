"use client";

import { Star } from "lucide-react";
import { useState } from "react";

const _MAX_RATING = 5;
const STAR_RANGE = Array.from({ length: _MAX_RATING }, (_, i) => i + 1);

// Rating component
export const Rating = ({
  rating,
  onChange,
  disabled = false,
}: {
  rating: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent, star: number) => {
    if (onChange && !disabled && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      e.stopPropagation();
      onChange(star);
    }
  };

  return (
    <fieldset
      aria-label="Rating"
      className="flex items-center gap-1 rounded-md border-0 p-0 px-2 py-1.5 transition-colors"
    >
      {STAR_RANGE.map((star) => (
        <Star
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className={`
            ${star <= (hoverRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            ${onChange && !disabled ? "cursor-pointer transition-colors duration-150" : ""}
            ${disabled ? "opacity-70" : ""}
          `}
          key={star}
          onClick={(e) => {
            if (onChange && !disabled) {
              e.stopPropagation();
              onChange(star);
            }
          }}
          onKeyDown={(e) => handleKeyDown(e, star)}
          onMouseEnter={() => onChange && !disabled && setHoverRating(star)}
          onMouseLeave={() => onChange && !disabled && setHoverRating(0)}
          role="button"
          size={16}
          tabIndex={onChange && !disabled ? 0 : -1}
        />
      ))}
    </fieldset>
  );
};
