import Link from "next/link";

const featuredProducts = [
  {
    title: "Штани Motion",
    price: "₴1 720",
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Футболка Signature",
    price: "₴950",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Худі Essential",
    price: "₴1 550",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Шопер Daily",
    price: "₴780",
    imageUrl:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Кросівки Pace",
    price: "₴2 450",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
];

const carouselProducts = [...featuredProducts, ...featuredProducts];

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

        <section className="mt-20 overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] py-8">
          <div className="px-6">
            <p className="text-sm uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-faint)]">
              Всі товари
            </p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold text-[var(--color-text-strong)] sm:text-4xl">
                  Перегляньте асортимент у русі
                </h2>
                <p className="mt-3 text-[var(--color-text-muted)]">
                  Натискайте на будь-яку картку в каруселі або переходьте в повний каталог кнопкою нижче.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden">
            <div className="product-carousel-track flex gap-5 px-6">
              {carouselProducts.map((product, index) => (
                <Link
                  key={`${product.title}-${index}`}
                  href="/products"
                  className="group block w-[260px] shrink-0 overflow-hidden rounded-[calc(var(--radius-card)-0.25rem)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-page)] transition hover:border-[var(--color-border-hover)]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--color-bg-image)]">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-base font-semibold text-[var(--color-text-strong)]">{product.title}</p>
                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 px-6">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] px-5 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-surface-hover)]"
            >
              Перейти до всіх товарів
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
