import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text-base)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
        <header className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="text-lg font-semibold uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-strong)]"
          >
            Corewear
          </Link>
          <nav>
            <Link
              href="/products"
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
            >
              Продукти
            </Link>
          </nav>
        </header>

        <section className="mt-20 max-w-3xl">
          <p className="text-sm uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-faint)]">
            Сучасний гардероб
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-tight text-[var(--color-text-strong)] sm:text-6xl">
            Одяг, що дозволяє почуватися легко кожного дня.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-muted)]">
            Виберіть базові речі з чистими лініями та продуманими матеріалами, які створюють стиль без зайвих
            ефектів.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] px-5 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-surface-hover)]"
            >
              Переглянути колекцію
            </Link>
          </div>
        </section>

        <section className="mt-auto border-t border-[var(--color-border-subtle)] pt-8">
          <p className="text-sm text-[var(--color-text-faint)]">Чистота, простота та фокус на контенті.</p>
        </section>
      </div>
    </main>
  );
}
