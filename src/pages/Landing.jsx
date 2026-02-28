import { useNavigate } from "react-router-dom";
import { Lock, Clock, Share2, Sparkles } from "lucide-react";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group flex flex-col items-center gap-4 rounded-2xl border border-gray-800 bg-gray-900/60 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/30 hover:shadow-[0_0_30px_rgba(255,200,100,0.08)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">
        {description}
      </p>
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">

      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,200,100,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(255,150,50,0.08)_0%,transparent_40%)]" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400/15">
            <Clock className="h-5 w-5 text-yellow-400" />
          </div>
          <span className="font-serif text-xl font-bold">
            TimeCapsule
          </span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="rounded-lg px-5 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
        >
          Sign In
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/60 px-4 py-1.5 text-xs font-medium text-yellow-400 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Preserve what matters most
          </div>

          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Seal Your Memories In Time
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            Create digital time capsules to safeguard your most cherished
            moments. Lock them away and unlock them when the time is right.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/signup")}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-8 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:brightness-110"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/login")}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-gray-700 bg-transparent px-8 text-sm font-semibold transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400/5"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Features */}
        <section className="mx-auto mt-28 grid w-full max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
          <FeatureCard
            icon={Lock}
            title="Secure & Private"
            description="Your memories are encrypted and only accessible to you until the unlock date arrives."
          />
          <FeatureCard
            icon={Clock}
            title="Time-Locked"
            description="Set a future date to unlock your capsule. Anticipation makes the reveal even sweeter."
          />
          <FeatureCard
            icon={Share2}
            title="Share With Loved Ones"
            description="Invite friends and family to contribute to or receive your time capsules."
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center px-6 py-6">
        <p className="text-xs text-gray-500">
          TimeCapsule — Preserve today, rediscover tomorrow.
        </p>
      </footer>
    </div>
  );
}

export default Landing;