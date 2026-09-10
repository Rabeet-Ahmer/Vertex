import React from "react";
import {
  Search,
  Bookmark,
  Bell,
  User,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Menu,
  ArrowRight,
  Triangle,
  CheckCircle2,
  Lock,
  Sparkles,
  CircleDot,
} from "lucide-react";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-backgroundr(--foreground)] font-(--font-body)">
      {/* Header — logo + nav icons + primary CTA like design */}
      <header className="mx-auto max-w-6xl px-6 pt-8 pb-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="inline-block w-8 h-8 rounded-lg bg-primary text-white items-center justify-center shadow-md">
            <Triangle
              width={18}
              height={18}
              strokeWidth={2.5}
              stroke="currentColor"
              fill="none"
            />
          </span>
          <span className="font-(--font-display) text-xl tracking-tight text-neutral-900">
            Vertex
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700">
          <a href="#" className="hover:text-primary transition">
            Courses
          </a>
          <a href="#" className="hover:text-primary transition">
            Instructors
          </a>
          <a href="#" className="hover:text-primary transition">
            Search
          </a>
          <a href="#" className="hover:text-primary transition">
            My Learning
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="#"
              aria-label="Search"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700on"
            >
              <Search size={18} />
            </a>
            <a
              href="#"
              aria-label="Bookmark"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition"
            >
              <Bookmark size={18} />
            </a>
            <a
              href="#"
              aria-label="Notifications"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition"
            >
              <Bell size={18} />
            </a>
            <a
              href="#"
              aria-label="Account"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition"
            >
              <User size={18} />
            </a>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-primary-dark transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary-dark tracking-wide uppercase mb-6">
            Design System
          </div>
          <h1 className="font-(--font-display) text-5xl md:text-7xl leading-[0.95] tracking-tight text-neutral-900 mb-6">
            Vertex <br />
            <span className="text-primary">Design System</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
            A unified design language for Vertex. Clean, modern, and focused on
            learning. Built for clarity, consistency, and scale.
          </p>
          <div className="mt-5 text-sm text-neutral-500">
            VERSION 1.0 — MAY 2025
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-(--font-display) text-3xl text-neutral-900 mb-8">
          Colors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[
            { name: "Primary", hex: "#E8672D", bg: "bg-[var(--primary)]" },
            { name: "Secondary", hex: "#FCEBDD", bg: "bg-[var(--secondary)]" },
            {
              name: "Neutral 900",
              hex: "#0A0A0A",
              bg: "bg-[var(--neutral-900)]",
            },
            {
              name: "Neutral 700",
              hex: "#404040",
              bg: "bg-[var(--neutral-700)]",
            },
            {
              name: "Neutral 200",
              hex: "#E5E5E5",
              bg: "bg-[var(--neutral-200)]",
            },
            {
              name: "Neutral 100",
              hex: "#F2F2F0",
              bg: "bg-[var(--neutral-100)]",
            },
            {
              name: "Neutral 50",
              hex: "#FAFAF7",
              bg: "bg-[var(--neutral-50)]",
            },
            { name: "White", hex: "#FFFFFF", bg: "bg-white" },
            {
              name: "Background",
              hex: "#F5F5F0",
              bg: "bg-[var(--background)]",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm flex flex-col gap-3"
            >
              <div
                className={`h-16 rounded-xl ${c.bg} ring-1 ring-inset ring-black/5`}
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                  {c.name}
                </div>
                <div className="text-sm font-mono text-neutral-800">
                  {c.hex}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-(--font-display)-3xl text-text-neutral-900">
          Typography
        </h2>
        <div className="flex flex-wrap gap-8 md:gap-12 items-start">
          <div>
            <h3 className="font-(--font-display) text-[10rem] md:text-[12rem] leading-[0.8] tracking-tight text-neutral-900">
              Ag
            </h3>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-3">
              Playfair Display — Display
            </div>
          </div>
          <div className="max-w-md pt-4 md:pt-6">
            <p className="text-sm text-[var(--neutral-600)] mb-2">
              Hero 48 / Display 32 / Heading 1 24 / Heading 2 20 / Heading 3 16
            </p>
            <p className="text-sm text-[var(--neutral-600)]">
              Body 16 / Small 12 / Caption 11 / Label 10
            </p>
            <div className="mt-6 space-y-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-1">
                  Heading 1
                </div>
                <h4 className="font-[var(--font-display)] text-2xl font-bold text-[var(--neutral-900)]">
                  Clean, modern, focused
                </h4>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-1">
                  Body
                </div>
                <p className="text-base text-[var(--neutral-700)]">
                  A unified design language built for clarity and scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Spacing
        </h2>
        <div className="flex flex-wrap gap-3">
          {[4, 8, 12, 16, 24, 32, 40, 48, 64].map((s) => (
            <div
              key={s}
              className="flex items-end gap-3 bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm"
            >
              <div
                className="bg-[var(--primary)] rounded-sm"
                style={{ width: s, height: s }}
              />
              <div>
                <div className="text-xs font-bold text-[var(--neutral-500)]">
                  {s}px
                </div>
                <div className="text-xs text-[var(--neutral-400)]">spacing</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radius & Shadows */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Radius & Shadows
        </h2>
        <div className="flex flex-wrap gap-6">
          {[4, 8, 12, 16, 24, 32].map((r) => (
            <div
              key={r}
              className="flex items-center gap-3 bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm"
            >
              <div
                className="bg-[var(--primary)] rounded-lg"
                style={{ width: r, height: r, borderRadius: r / 4 }}
              />
              <span className="text-xs font-bold text-[var(--neutral-600)]">
                {r}px
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 text-xs text-[var(--neutral-500)]">
          Shadows: 2 / 4 / 8 / 16
        </div>
      </section>

      {/* Icons */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Icons
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {[
            { name: "Search", Icon: Search },
            { name: "Bookmark", Icon: Bookmark },
            { name: "Bell", Icon: Bell },
            { name: "User", Icon: User },
            { name: "Check", Icon: Check },
            { name: "X", Icon: X },
            { name: "ChevronRight", Icon: ChevronRight },
            { name: "ChevronLeft", Icon: ChevronLeft },
            { name: "Menu", Icon: Menu },
            { name: "ArrowRight", Icon: ArrowRight },
            { name: "Triangle", Icon: Triangle },
            { name: "CheckCircle2", Icon: CheckCircle2 },
            { name: "Lock", Icon: Lock },
            { name: "Sparkles", Icon: Sparkles },
            { name: "CircleDot", Icon: CircleDot },
          ].map(({ name, Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--primary)]">
                <Icon size={20} strokeWidth={2} />
              </div>
              <span className="text-xs font-semibold text-[var(--neutral-600)]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-6">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5 min-w-[280px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)]">
              Primary
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <a
                  href="#"
                  className="rounded-full bg-[var(--primary)] text-white px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-[var(--primary-dark)] transition"
                >
                  SM
                </a>
                <a
                  href="#"
                  className="rounded-full bg-[var(--primary)] text-white px-6 py-3 text-sm font-semibold shadow-sm hover:bg-[var(--primary-dark)] transition"
                >
                  MD
                </a>
                <a
                  href="#"
                  className="rounded-full bg-[var(--primary)] text-white px-7 py-3.5 text-base font-semibold shadow-sm hover:bg-[var(--primary-dark)] transition"
                >
                  LG
                </a>
              </div>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="rounded-full bg-[var(--primary)] text-white px-6 py-2.5 text-sm font-semibold shadow-sm opacity-70 hover:opacity-100 transition"
                >
                  Hover
                </a>
                <a
                  href="#"
                  className="rounded-full bg-neutral-200 text-neutral-400 px-6 py-2.5 text-sm font-semibold cursor-not-allowed"
                >
                  Disabled
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5 min-w-[280px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)]">
              Secondary
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <a
                  href="#"
                  className="rounded-full border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-2 text-sm font-semibold"
                >
                  SM
                </a>
                <a
                  href="#"
                  className="rounded-full border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-2.5 text-sm font-semibold"
                >
                  MD
                </a>
                <a
                  href="#"
                  className="rounded-full border-2 border-[var(--primary)] text-[var(--primary)] px-7 py-3 text-base font-semibold"
                >
                  LG
                </a>
              </div>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="rounded-full border-2 border-[var(--primary)] text-[var(--primary)] px-6 py-2.5 text-sm font-semibold bg-[var(--secondary)]"
                >
                  Active
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5 min-w-[280px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)]">
              Ghost
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2">
                <a
                  href="#"
                  className="rounded-full text-[var(--neutral-700)] px-4 py-2 text-sm font-semibold hover:text-[var(--primary)] transition"
                >
                  Text
                </a>
                <a
                  href="#"
                  className="rounded-full text-[var(--primary)] px-4 py-2 text-sm font-bold hover:underline transition"
                >
                  Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges / Tags */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Badges & Tags
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            "Primary",
            "Success",
            "Warning",
            "Error",
            "Neutral",
            "New",
            "In Progress",
            "Completed",
            "Locked",
            "Updated",
          ].map((b) => (
            <span
              key={b}
              className={`rounded-full px-3 py-1 text-xs font-bold border ${b === "Primary" ? "bg-[var(--primary)] text-white border-[var(--primary)]" : b === "Success" ? "bg-green-50 text-green-700 border-green-200" : b === "Warning" ? "bg-amber-50 text-amber-700 border-amber-200" : b === "Error" ? "bg-red-50 text-red-700 border-red-200" : b === "New" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-neutral-100 text-[var(--neutral-700)] border-neutral-200"}`}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm max-w-xl">
          <h3 className="text-sm font-bold mb-4">Progress</h3>
          <div className="h-3 rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-[var(--primary)] to-[#F57A4E] rounded-full" />
          </div>
          <div className="flex items-center justify-between text-xs text-[var(--neutral-500)] mt-2">
            <span>Module 5 — 65%</span>
            <span>3 of 8 lessons</span>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Cards
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md transition">
            <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] relative">
              <span className="absolute top-3 left-3 rounded-full bg-white/20 backdrop-blur text-white px-2.5 py-0.5 text-xs font-bold">
                Course
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-[var(--font-display)] text-xl font-bold mb-2">
                Data Fetching & Caching
              </h3>
              <p className="text-sm text-[var(--neutral-600)] mb-4">
                Learn to fetch, cache, and sync data with modern patterns.
              </p>
              <div className="flex items-center gap-3 text-xs text-[var(--neutral-500)] font-medium">
                <span>Module 5</span>
                <span>·</span>
                <span>8 lessons</span>
                <span>·</span>
                <span>2h 30m</span>
              </div>
            </div>
          </article>
          <article className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-[var(--font-display)] text-xl font-bold mb-3">
              In this lesson
            </h3>
            <ul className="space-y-2 text-sm text-[var(--neutral-700)]">
              {[
                "Fetch strategies",
                "Cache invalidation",
                "Background sync",
                "Optimistic updates",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl bg-[var(--neutral-900)] text-white p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-[var(--font-display)] text-xl font-bold mb-3">
              Pro Tip
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Use stale-while-revalidate to keep UI fast without sacrificing
              freshness. Combine with a short max-age header for balance.
            </p>
          </article>
        </div>
      </section>

      {/* Inputs */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Inputs
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label
              htmlFor="search"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-2"
            >
              Search
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search topics..."
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
              />
              <Search
                className="absolute left-3 top-3 text-[var(--neutral-500)]"
                size={18}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-2"
            >
              Text
            </label>
            <input
              id="text"
              type="text"
              placeholder="Name"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            />
          </div>
          <div>
            <label
              htmlFor="select"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-2"
            >
              Select
            </label>
            <select
              id="select"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)]"
            >
              <option>All categories</option>
              <option>Data</option>
              <option>UI</option>
              <option>Engineering</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="switch"
              className="block text-xs font-bold uppercase tracking-widest text-[var(--neutral-500)] mb-2"
            >
              Switch
            </label>
            <label
              htmlFor="switch"
              className="inline-flex items-center gap-3 text-sm text-[var(--neutral-700)] cursor-pointer"
            >
              <input
                id="switch"
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded-md border-2 border-neutral-300 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              Include archived
            </label>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-8">
          Status Indicators
        </h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {["In Progress", "Completed", "Locked", "New", "Updated"].map((b) => (
            <span
              key={b}
              className="rounded-full bg-neutral-100 border border-neutral-200 px-3 py-1 text-xs font-bold text-[var(--neutral-700)]"
            >
              {b}
            </span>
          ))}
        </div>
        <div className="rounded-3xl bg-white border border-neutral-200 p-6 shadow-sm max-w-xl">
          <h3 className="text-sm font-bold mb-4">Progress</h3>
          <div className="h-3 rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-[var(--primary)] to-[#F57A4E] rounded-full" />
          </div>
          <div className="flex items-center justify-between text-xs text-[var(--neutral-500)] mt-2">
            <span>Module 5 — 65%</span>
            <span>3 of 8 lessons</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-neutral-200">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--neutral-900)] mb-6">
          Navigation
        </h2>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--neutral-500)]">
            <li>
              <a href="#" className="hover:text-[var(--primary)] transition">
                Home
              </a>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary)] transition">
                Catalog
              </a>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li className="text-[var(--neutral-900)] font-semibold">
              Data Fetching
            </li>
          </ol>
        </nav>

        {/* Pagination */}
        <div className="flex items-center gap-2 mb-10">
          <a
            href="#"
            className="rounded-full px-3 py-2 text-sm font-semibold bg-neutral-100 text-[var(--neutral-700)] hover:bg-neutral-200 transition flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Prev
          </a>
          {[1, 2, 3].map((n) => (
            <a
              key={n}
              href="#"
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${n === 2 ? "bg-[var(--primary)] text-white shadow-sm" : "bg-neutral-100 text-[var(--neutral-700)] hover:bg-neutral-200"}`}
            >
              {n}
            </a>
          ))}
          <a
            href="#"
            className="rounded-full px-3 py-2 text-sm font-semibold bg-neutral-100 text-[var(--neutral-700)] hover:bg-neutral-200 transition flex items-center gap-1"
          >
            Next <ChevronRight size={16} />
          </a>
        </div>

        {/* Bottom nav with icon links */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { label: "Home", href: "#", active: false },
            { label: "Catalog", href: "#", active: false },
            { label: "Course", href: "#", active: false },
            { label: "Lesson", href: "#", active: true },
            { label: "Instructor", href: "#", active: false },
            { label: "Search", href: "#", active: false },
          ].map((nav) => (
            <a
              key={nav.label}
              href={nav.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${nav.active ? "bg-[var(--primary)] text-white shadow-sm" : "bg-neutral-100 text-[var(--neutral-700)] hover:bg-neutral-200"}`}
            >
              {nav.label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="rounded-3xl bg-[var(--neutral-900)] text-white p-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-3">
              <span className="inline-block w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center shadow-md">
                <Triangle
                  width={18}
                  height={18}
                  strokeWidth={2.5}
                  stroke="currentColor"
                  fill="none"
                />
              </span>
              <span className="font-[var(--font-display)] text-xl font-bold">
                Vertex
              </span>
            </a>
            <p className="text-neutral-400 text-sm">
              A learning platform built for clarity.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-neutral-300">
            {["Privacy", "Terms", "Contact"].map((f) => (
              <a key={f} href="#" className="hover:text-white transition">
                {f}
              </a>
            ))}
          </div>
        </footer>
      </section>
    </main>
  );
}
