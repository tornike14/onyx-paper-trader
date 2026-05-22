import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Wordmark from "@/components/ui/Wordmark";

const Home = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/markets");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
          <Wordmark />
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="h-9 px-4 inline-flex items-center rounded-btn text-sm text-text-mid hover:text-text-high transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="h-9 px-4 inline-flex items-center rounded-btn bg-brand text-white text-sm font-medium hover:bg-brand-hover transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center px-6 py-16">
        <div className="mx-auto max-w-5xl w-full grid gap-16 md:gap-20 md:grid-cols-[1.3fr_1fr] items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
              Trade prediction markets without the
              <span className="text-brand"> risk.</span>
            </h1>
            <p className="text-text-mid text-lg md:text-xl leading-relaxed max-w-xl">
              Practice on live odds with{" "}
              <span className="text-text-high font-medium">$1,000</span> of paper
              money. Buy YES or NO on real markets, track your P&L, and learn how
              prices move, all without putting a dollar down.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                href="/signup"
                className="h-11 px-5 inline-flex items-center rounded-btn bg-brand text-white font-medium text-sm hover:bg-brand-hover transition"
              >
                Get $1,000 to trade
              </Link>
              <Link
                href="/login"
                className="h-11 px-5 inline-flex items-center rounded-btn border border-border text-text-high font-medium text-sm hover:border-border-strong transition"
              >
                I already have an account
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative rounded-card border border-border bg-bg-elevated p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-text-dim">
                  Illinois vs Houston
                </span>
                <span className="text-xs text-text-dim">Mar 24</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-btn border border-border p-3">
                  <div className="text-sm text-text-high mb-2">Illinois</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-mid">YES</span>
                    <span className="text-text-high font-mono">20¢</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-text-mid">NO</span>
                    <span className="text-text-high font-mono">80¢</span>
                  </div>
                </div>
                <div className="rounded-btn border border-brand/40 bg-brand/5 p-3">
                  <div className="text-sm text-text-high mb-2">Houston</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-mid">YES</span>
                    <span className="text-brand font-mono">80¢</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-text-mid">NO</span>
                    <span className="text-text-high font-mono">20¢</span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-text-dim">Balance</span>
                <span className="text-text-high font-mono">$1,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center text-xs text-text-dim">
          Powered by Onyx Predictions dev API. Markets settle on real outcomes.
        </div>
      </footer>
    </div>
  );
};

export default Home;
