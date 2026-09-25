import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Hee Jae Cho" },
      {
        name: "description",
        content:
          "Curriculum vitae of Hee Jae Cho: Mathematics (Computer Science track) at HKUST, IT intern, software developer and research experience.",
      },
      { property: "og:title", content: "CV — Hee Jae Cho" },
      {
        property: "og:description",
        content: "Experience, education and languages of Hee Jae Cho, HKUST Mathematics.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CV,
});

const experience = [
  {
    range: "2025—2026",
    role: "Information Technology Intern",
    org: "HKUST IT Office",
    body: "Managing computer laboratories and supporting students and staff with hardware, printing, ID card, and general IT issues.",
  },
  {
    range: "2025—2026",
    role: "Software Developer",
    org: "Google Developer Student Club · HKUST",
    body: "Contributing to team software projects across web and app development using JavaScript, Python, and Flutter.",
  },
  {
    range: "2022—2024",
    role: "Director of Analysis",
    org: "Ateneo de Manila Senior High School",
    body: "Led 40 junior researchers, over 20 analysts, and more than 15 research projects and surveys.",
  },
  {
    range: "2022—2023",
    role: "Lead Researcher",
    org: "COVID-19 Spatio-temporal Analysis",
    body: "First author of an award-winning study using more than two million patient records across three years.",
  },
];

const languages = [
  "English / native",
  "Korean / native",
  "Filipino / professional",
  "Mandarin / elementary",
];

function CV() {
  return (
    <SiteLayout pathLabel="./home/heejae/profile/cv">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,30rem)_1fr] lg:items-start">
          <div className="title-block pt-8">
            <p className="label">./home/heejae/profile/cv</p>
            <h1 className="page-title mt-7">
              Hee Jae
              <br />
              Cho
            </h1>
            <div className="mt-10 space-y-1 border-l border-accent pl-5 text-sm text-muted-foreground">
              <p>BSc Mathematics with an Extension in AI</p>
              <p>Hong Kong University of Science and Technology</p>
              <a
                href="mailto:hjchoaa@connect.ust.hk"
                className="inline-block text-foreground underline underline-offset-4"
              >
                hjchoaa@connect.ust.hk
              </a>
            </div>
          </div>

          <div className="max-w-sm lg:mt-40">
            <p className="label">Profile</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Interested in roles related to software development, data science, machine learning, and quantitative trading.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[10rem_1fr]">
          <p className="label lg:pt-4">Experience</p>
          <div className="border-t-2 border-border">
            {experience.map((item) => (
              <article
                key={item.role + item.range}
                className="grid gap-3 border-b-2 border-border py-7 sm:grid-cols-[7rem_1fr]"
              >
                <span className="font-mono text-[0.7rem] text-accent">{item.range}</span>
                <div>
                  <h2 className="display text-2xl">{item.role}</h2>
                  <p className="mt-1 text-sm font-medium">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[10rem_1fr]">
          <p className="label lg:pt-4">Education & languages</p>
          <div className="grid border-t-2 border-border sm:grid-cols-2 sm:divide-x-2 sm:divide-border">
            <div className="border-b-2 border-border py-7 sm:pr-8">
              <h2 className="display text-2xl">HKUST · 2024—2030</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                BSc Mathematics with an Extension inArtificial Intelligence.
              </p>
            </div>
            <div className="border-b-2 border-border py-7 sm:pl-8">
              <ul className="grid gap-2 font-mono text-xs text-muted-foreground">
                {languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
