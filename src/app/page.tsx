import Link from "next/link";

const sections = [
  {
    title: "Traceability Primitives",
    description: "Units, kits, lots, fixtures, episodes, and their execution history are ready in Prisma to power traceability dashboards and workflows.",
    tags: ["Unit", "Kit", "ComponentLot", "Fixture", "Episode"],
  },
  {
    title: "Process & Quality",
    description: "Capture defined process steps, associated CTQs, and the measurements collected during executions.",
    tags: ["ProcessStepDefinition", "ProcessStepExecution", "CTQDefinition", "Measurement"],
  },
  {
    title: "Developer Ready",
    description: "Next.js App Router, Tailwind CSS, and Prisma are pre-wired with seed data so you can start building product experiences right away.",
    tags: ["Next.js", "Tailwind", "Prisma", "SQLite"],
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="section-card flex flex-col gap-4">
        <div className="tag w-fit">Manufacturing data foundation</div>
        <h1 className="text-4xl font-semibold text-slate-100 sm:text-5xl">
          Linesight v2 starter
        </h1>
        <p className="text-lg text-slate-200 sm:text-xl">
          A Next.js App Router template with Prisma models for traceability, quality, and process execution.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="tag">App Router</span>
          <span className="tag">Tailwind CSS</span>
          <span className="tag">Prisma + SQLite</span>
          <span className="tag">Seeded data</span>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <div key={section.title} className="section-card">
            <h2 className="text-2xl font-semibold text-slate-100">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300">{section.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="section-card">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-100">Get started</h3>
          <span className="tag">Developer guide</span>
        </div>
        <p className="mt-3 text-sm text-slate-300">
          Run the seed script to populate the database, then iterate on the Prisma schema and Next.js routes to build data-driven experiences.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="grid-card">
            <p className="text-sm text-slate-200">Database access</p>
            <p className="text-xs text-slate-400">Use the Prisma client helper:</p>
            <code className="mt-2 block rounded bg-slate-900/60 p-2 text-xs text-slate-200">
              import {{ prisma }} from "@/lib/prisma";
            </code>
          </div>
          <div className="grid-card">
            <p className="text-sm text-slate-200">Prisma Studio</p>
            <p className="text-xs text-slate-400">Inspect seeded data visually:</p>
            <code className="mt-2 block rounded bg-slate-900/60 p-2 text-xs text-slate-200">
              npx prisma studio
            </code>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Need a starting API? Add routes in <code className="font-mono">src/app/api</code> using the existing data models.
        </p>
        <Link
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
          href="https://nextjs.org/docs"
        >
          Next.js documentation
        </Link>
      </section>
    </main>
  );
}
