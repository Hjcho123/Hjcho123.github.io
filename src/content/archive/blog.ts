export type ArchivedPost = {
  date: string;
  field: string;
  title: string;
  body: string;
};

export const archivedPosts: ArchivedPost[] = [
  {
    date: "Jan 3, 2026",
    field: "learnings",
    title: "Alpha Research",
    body: "I finished building the basic framework of this website today. I'm hoping to keep shaping it into something great.",
  },
  {
    date: "Sep 22, 2026",
    field: "life",
    title: "Tribute to CoCo",
    body: "A tribute to my best friend of the last 18 years",
  },
];