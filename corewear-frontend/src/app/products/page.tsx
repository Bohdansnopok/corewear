"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const filters = [
  { id: "all", label: "Усі" },
  { id: "pants", label: "Штани" },
  { id: "tshirts", label: "Футболки" },
  { id: "hoodies", label: "Кофти" },
  { id: "bags", label: "Сумки" },
  { id: "shoes", label: "Взуття" },
] as const;

const sortOptions = [
  { id: "price-asc", label: "Ціна: від нижчої до вищої" },
  { id: "price-desc", label: "Ціна: від вищої до нижчої" },
  { id: "newest", label: "Найновіше" },
  { id: "oldest", label: "Найстаріше" },
] as const;

const products = [
  {
    title: "Штани Motion",
    description: "Прямий крій і комфортна посадка для активного ритму без візуального шуму.",
    hoverText: "Стримана база, що легко поєднується і з кросівками, і з масивними черевиками.",
    price: 1720,
    category: "pants",
    inStock: true,
    addedAt: "2026-04-05",
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Джинси Core",
    description: "Щоденна пара з фактурного деніму, яка тримає форму та не перевантажує образ.",
    hoverText: "Працюють як база на кожен день і витримують активне використання.",
    price: 1890,
    category: "pants",
    inStock: false,
    addedAt: "2026-03-14",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Футболка Signature",
    description: "М'яка тканина, нейтральний відтінок і вільний силует для щоденного носіння.",
    hoverText: "Легка футболка, яка тримає форму і добре поєднується з будь-яким образом.",
    price: 950,
    category: "tshirts",
    inStock: true,
    addedAt: "2026-04-04",
    imageUrl:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Футболка Daily",
    description: "Щільніша бавовна й вільніший крій для розслабленого щоденного образу.",
    hoverText: "Добре працює як самостійно, так і в багатошарових поєднаннях.",
    price: 1050,
    category: "tshirts",
    inStock: false,
    addedAt: "2026-02-18",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Худі Essential",
    description: "Універсальна кофта, що поєднує тепло та чистий стиль у будь-яку пору.",
    hoverText: "Плавне поєднання м'якості та стриманого силуету для щоденних виходів.",
    price: 1550,
    category: "hoodies",
    inStock: true,
    addedAt: "2026-04-06",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Світшот Form",
    description: "Щільний трикотаж і зібрана форма для стриманого міського образу.",
    hoverText: "Практичний варіант для міжсезоння, який легко стилізувати щодня.",
    price: 1390,
    category: "hoodies",
    inStock: true,
    addedAt: "2026-01-29",
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Шопер Daily",
    description: "Містка сумка для ноутбука, форми та дрібниць, які потрібні щодня.",
    hoverText: "Функціональний аксесуар з простим виглядом, який не вибивається з образу.",
    price: 780,
    category: "bags",
    inStock: true,
    addedAt: "2026-03-30",
    imageUrl:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Сумка Transit",
    description: "Компактна сумка через плече для щоденних маршрутів і необхідних речей.",
    hoverText: "Зручний формат для міста, коли потрібен мінімум речей під рукою.",
    price: 1120,
    category: "bags",
    inStock: false,
    addedAt: "2026-02-06",
    imageUrl:
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Кросівки Pace",
    description: "Лаконічна пара для щоденного руху з м'якою посадкою та чистими лініями.",
    hoverText: "Підходять і до базових штанів, і до розслабленого міського образу.",
    price: 2450,
    category: "shoes",
    inStock: true,
    addedAt: "2026-04-01",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Кеди Street",
    description: "Проста силуетна пара, яка легко вписується у щоденний гардероб.",
    hoverText: "Стриманий дизайн без перевантаження деталями, щоб працювати на кожен день.",
    price: 2180,
    category: "shoes",
    inStock: false,
    addedAt: "2025-12-22",
    imageUrl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
  },
] as const;

type FilterId = (typeof filters)[number]["id"];
type SortId = (typeof sortOptions)[number]["id"];
type Product = (typeof products)[number];

function formatPrice(price: number) {
  return `₴${price.toLocaleString("uk-UA")}`;
}

function sortProducts(items: Product[], sortBy: SortId) {
  const sorted = [...items];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "oldest":
      return sorted.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  }
}

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [sortBy, setSortBy] = useState<SortId>("newest");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      if (activeFilter !== "all" && product.category !== activeFilter) {
        return false;
      }

      if (onlyInStock && !product.inStock) {
        return false;
      }

      return true;
    });

    return sortProducts(filtered, sortBy);
  }, [activeFilter, onlyInStock, sortBy]);

  return (
    <main className="min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text-base)]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10 pb-16">
        <header className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="text-lg font-semibold uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-strong)]"
          >
            Corewear
          </Link>
          <nav>
            <Link
              href="/"
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-strong)]"
            >
              Головна
            </Link>
          </nav>
        </header>

        <section className="mt-16">
          <p className="text-sm uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-faint)]">
            Колекція
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[var(--color-text-strong)] sm:text-5xl">
            Одяг, який працює з вашим життям.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            Знайдіть універсальні речі для повсякденного образу: комфортні, спокійні й водночас виразні.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {filters.map((filter) => {
              const isActive = filter.id === activeFilter;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    isActive
                      ? "border-[var(--color-border-active)] bg-[var(--color-bg-surface-strong)] text-[var(--color-text-strong)]"
                      : "border-[var(--color-border-base)] bg-[var(--color-bg-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-surface-hover)] hover:text-[var(--color-text-strong)]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-4">
              <p className="text-xs uppercase tracking-[var(--tracking-brand)] text-[var(--color-text-faint)]">
                Сортування
              </p>
              <div className="mt-3">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value as SortId)}
                  className="w-full rounded-2xl border border-[var(--color-border-base)] bg-[var(--color-bg-page)] px-4 py-3 text-sm text-[var(--color-text-strong)] outline-none transition focus:border-[var(--color-border-active)]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOnlyInStock((current) => !current)}
              className={`flex items-center justify-between gap-4 rounded-[var(--radius-card)] border p-4 text-left transition ${
                onlyInStock
                  ? "border-[var(--color-border-success)] bg-[var(--color-bg-success-soft)]"
                  : "border-[var(--color-border-base)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-surface-hover)]"
              }`}
            >
              <div>
                <p
                  className={`text-sm font-semibold ${
                    onlyInStock ? "text-[var(--color-text-success)]" : "text-[var(--color-text-strong)]"
                  }`}
                >
                  {onlyInStock ? "Тільки те, що в наявності" : "Усі товари"}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {onlyInStock
                    ? "Показуються лише товари в наявності з урахуванням фільтра й сортування."
                    : "Зараз видно і наявні, і відсутні товари. Натисніть, щоб лишити тільки те, що в наявності."}
                </p>
              </div>

              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg font-semibold ${
                  onlyInStock
                    ? "border-[var(--color-border-success)] bg-[var(--color-bg-success-soft)] text-[var(--color-text-success)]"
                    : "border-[var(--color-border-danger)] bg-[var(--color-bg-danger-soft)] text-[var(--color-text-danger)]"
                }`}
                aria-hidden="true"
              >
                {onlyInStock ? "✓" : "✕"}
              </span>
            </button>
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          {visibleProducts.map((product) => (
            <article
              key={product.title}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-card)] transition hover:border-[var(--color-border-base)]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-image)]">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-[var(--color-text-strong)]">{product.title}</h2>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      product.inStock
                        ? "border-[var(--color-border-success)] bg-[var(--color-bg-success-soft)] text-[var(--color-text-success)]"
                        : "border-[var(--color-border-danger)] bg-[var(--color-bg-danger-soft)] text-[var(--color-text-danger)]"
                    }`}
                  >
                    {product.inStock ? "В наявності" : "Немає в наявності"}
                  </span>
                </div>
                <p className="mt-3 text-[var(--color-text-muted)]">{product.description}</p>
                <div className="mt-6 flex items-center justify-between gap-4 text-sm text-[var(--color-text-soft)]">
                  <span className="text-lg font-semibold text-[var(--color-text-strong)]">
                    {formatPrice(product.price)}
                  </span>
                  <button className="rounded-full border border-[var(--color-border-base)] bg-[var(--color-bg-surface)] px-4 py-2 text-[var(--color-text-base)] transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-surface-hover)]">
                    Додати до кошика
                  </button>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-full bg-[var(--color-bg-overlay)] px-7 py-5 text-sm text-[var(--color-text-base)] transition duration-300 group-hover:translate-y-0">
                {product.hoverText}
              </div>
            </article>
          ))}
        </section>

        {visibleProducts.length === 0 ? (
          <section className="mt-8 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-6 text-sm text-[var(--color-text-muted)]">
            За поточними фільтрами немає товарів. Спробуйте іншу категорію, змініть сортування або вимкніть режим
            "тільки в наявності".
          </section>
        ) : null}

        <section className="mt-14 border-t border-[var(--color-border-subtle)] pt-8">
          <p className="text-sm text-[var(--color-text-faint)]">
            Кожен елемент колекції створений для комфорту, чистих ліній та тривалого використання.
          </p>
        </section>
      </div>
    </main>
  );
}
