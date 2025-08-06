import React, { useEffect, useState } from "react";
import "./Rating.css";
import { useAppSelector } from "../../hook/reduxHook";
import type { RatingData } from "../../interface/ratingInterface";

export const Rating = ({
  productId,
  onClick,
}: {
  productId: string;
  onClick?: () => void;
}) => {
  const { data: ratingData } = useAppSelector((state) => state.rating);
  const [filterRating, setFilterRating] = useState<RatingData>();

  useEffect(() => {
    if (productId && ratingData) {
      setFilterRating(
        (ratingData as RatingData[])?.find(
          (data) => data?.productId === productId
        )
      );
    }
  }, [productId, ratingData]);

  const fullStars = Math.floor(filterRating?.totalRating ?? 0);
  const hasHalfStar = (filterRating?.totalRating ?? 0) - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <button className="product-rating" onClick={onClick}>
      <div className="star-rating">
        {"★".repeat(fullStars)}
        {hasHalfStar && <span className="half">{"★"}</span>}
        {"☆".repeat(emptyStars)}
      </div>
      {filterRating?.ratingDetail?.length ? (
        <span>{filterRating.ratingDetail.length}</span>
      ) : null}
    </button>
  );
};
