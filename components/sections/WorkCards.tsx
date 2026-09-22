import { workSamples } from "@/data/work";
import { Reveal } from "../ui/Reveal";

export function WorkCards() {
  if (workSamples.length === 0) {
    return (
      <Reveal>
        <div className="rounded-[2rem] border border-[var(--border)] bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase text-[var(--brand-700)]">Case studies</p>
          <h3 className="mt-4 text-balance text-3xl font-black text-[var(--foreground)]">
            Verified project stories will appear here when approved.
          </h3>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-8 text-[var(--muted)]">
            The case-study structure supports challenges, solutions, technologies, images,
            results, and project URLs. No fictional customer work or invented performance
            metrics are shown.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {workSamples.map((work, index) => (
        <Reveal key={work.name} delay={index * 0.05}>
          <article className="h-full rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[var(--brand-300)] hover:shadow-[var(--shadow-tight)]">
            <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold text-[var(--brand-700)]">
              {work.isSample ? "Sample concept" : work.industry}
            </span>
            <h3 className="mt-5 text-xl font-bold text-[var(--foreground)]">{work.name}</h3>
            <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{work.industry}</p>
            <div className="mt-5 grid gap-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                <strong className="text-[var(--foreground)]">Challenge:</strong>{" "}
                {work.challenge}
              </p>
              <p>
                <strong className="text-[var(--foreground)]">Solution:</strong> {work.solution}
              </p>
              <p>
                <strong className="text-[var(--foreground)]">Result:</strong> {work.result}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {work.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
