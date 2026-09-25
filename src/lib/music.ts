export type Recommendation = {
  month: string;
  monthLabel: string;
  album: string;
  artist: string;
  note: string;
  coverPath: string;
};

export const featuredRecommendation: Recommendation = {
  month: "1996-12",
  monthLabel: "December 1996",
  album: "Like in the Movies (영화에서처럼)",
  artist: "Lee So-ra",
  note: "Lee So-ra probably was the artist that first introduced me to Korean R&B. One of her best albums.",
  coverPath: "/music/album-covers/like-in-the-movies.jpg",
};
