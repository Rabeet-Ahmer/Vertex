import {
  Search,
  Bell,
  ArrowRight,
  Triangle,
  Star,
  BarChart3,
  Clock,
  BookOpen,
} from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export default function VertexHomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] font-sans">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-6 pt-8 pb-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="inline-flex w-8 h-8 rounded-lg bg-[var(--primary)] text-white items-center justify-center shadow-md">
            <Triangle width={18} height={18} strokeWidth={2.5} stroke="currentColor" fill="none" />
          </span>
          <span className="font-display text-xl tracking-tight text-[var(--neutral-900)]">
            Vertex
          </span>
        </a>
        <nav className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 text-sm font-medium text-[var(--neutral-700)]">
          <a href="#" className="hover:text-[var(--primary)] transition">Courses</a>
          <a href="#" className="hover:text-[var(--primary)] transition">My Learning</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Notifications" className="hidden sm:inline-flex w-9 h-9 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] items-center justify-center text-[var(--neutral-700)] transition">
            <Bell size={18} />
          </a>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden sm:inline-flex w-9 h-9 rounded-full bg-[var(--neutral-100)] hover:bg-[var(--neutral-200)] items-center justify-center text-[var(--neutral-700)] transition text-xs font-medium" aria-label="Sign In">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-[var(--primary-dark)] transition">Get Started</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-3xl text-center mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--secondary)] px-3 py-1 text-xs font-semibold text-[var(--primary-dark)] tracking-wide uppercase mb-6">
            Intelligent Learning
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-[var(--neutral-900)] mb-6">
            Search your learning<br />
            <span className="text-[var(--primary)]">in plain English.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--neutral-600)] font-sans leading-relaxed max-w-2xl mx-auto mb-8">
            Vertex understands what you want to learn and finds the exact lessons across all your courses.
          </p>
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] text-white px-7 py-3.5 text-base font-semibold shadow-sm hover:bg-[var(--primary-dark)] transition">
            Explore Courses <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Search bar */}
      <section className="mx-auto max-w-3xl px-6 pb-16 md:pb-24">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Ask anything about your learning..."
            className="w-full rounded-2xl border border-[var(--neutral-200)] bg-white pl-12 pr-14 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--neutral-400)] border border-[var(--neutral-200)] rounded px-1.5 py-0.5">
            ⌘ K
          </span>
        </div>
      </section>

      {/* All Courses */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-[var(--neutral-900)]">All Courses</h2>
          <a href="#" className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)] transition inline-flex items-center gap-1">
            View all courses <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <article className="rounded-3xl bg-white border border-[var(--neutral-200)] shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] relative flex items-center justify-center">
              <span className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-display shadow-lg shadow-black/20">
                N
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 text-[var(--neutral-900)]">Next.js for Production</h3>
              <p className="text-sm text-[var(--neutral-600)] font-sans mb-5 leading-relaxed">Build scalable, high-performance web applications with Next.js.</p>
              <div className="flex items-center gap-3 text-xs font-medium text-[var(--neutral-500)] font-sans">
                <span className="inline-flex items-center gap-1"><BarChart3 size={14} /> Intermediate</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><Clock size={14} /> 18h 24m</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><BookOpen size={14} /> 12 modules</span>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="rounded-3xl bg-white border border-[var(--neutral-200)] shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#3B82F0] to-[#1D4ED8] relative flex items-center justify-center">
              <span className="w-16 h-16 rounded-2xl bg-white text-[#3B82F0] flex items-center justify-center text-2xl font-display shadow-lg shadow-blue-900/20">
                🐳
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 text-[var(--neutral-900)]">Docker Essentials</h3>
              <p className="text-sm text-[var(--neutral-600)] font-sans mb-5 leading-relaxed">Containerize applications and streamline your development workflow.</p>
              <div className="flex items-center gap-3 text-xs font-medium text-[var(--neutral-500)] font-sans">
                <span className="inline-flex items-center gap-1"><BarChart3 size={14} /> Beginner</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><Clock size={14} /> 10h 12m</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><BookOpen size={14} /> 9 modules</span>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="rounded-3xl bg-white border border-[var(--neutral-200)] shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] relative flex items-center justify-center">
              <span className="w-16 h-16 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center text-2xl font-display shadow-lg shadow-blue-900/20">
                TS
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 text-[var(--neutral-900)]">TypeScript Deep Dive</h3>
              <p className="text-sm text-[var(--neutral-600)] font-sans mb-5 leading-relaxed">Go beyond the basics and write safer, more expressive code.</p>
              <div className="flex items-center gap-3 text-xs font-medium text-[var(--neutral-500)] font-sans">
                <span className="inline-flex items-center gap-1"><BarChart3 size={14} /> Intermediate</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><Clock size={14} /> 14h 36m</span>
                <span className="text-[var(--neutral-300)]">|</span>
                <span className="inline-flex items-center gap-1"><BookOpen size={14} /> 10 modules</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--secondary)] via-[#FFE4D0] to-[var(--secondary)] border border-[var(--neutral-200)] px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <Star size={18} className="text-[var(--primary)]" />
              <span className="text-sm font-bold text-[var(--primary)]">New every week</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl text-[var(--neutral-900)] leading-snug mb-2">New courses and lessons added every week.</h3>
          </div>
          <div className="relative z-10 flex items-end gap-2 md:gap-3 shrink-0">
            <div className="w-12 h-24 md:w-14 md:h-32 rounded-t-xl bg-gradient-to-t from-[var(--primary)] to-[var(--primary-dark)] opacity-90" />
            <div className="w-10 h-16 md:w-12 md:h-24 rounded-t-xl bg-gradient-to-t from-[var(--primary)] to-[var(--primary-dark)] opacity-60" />
            <div className="w-14 h-28 md:w-16 md:h-40 rounded-t-xl bg-gradient-to-t from-[var(--primary)] to-[var(--primary-dark)] opacity-100" />
            <div className="w-10 h-20 md:w-12 md:h-28 rounded-t-xl bg-gradient-to-t from-[var(--primary)] to-[var(--primary-dark)] opacity-50" />
          </div>
        </div>
      </section>
    </main>
  );
}
