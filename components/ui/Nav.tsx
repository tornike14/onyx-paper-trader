import Link from "next/link";
import Wordmark from "./Wordmark";
import { formatUsd } from "@/lib/money";

type Props = {
  email: string | null;
  balance: number | null;
  onSignOut?: () => Promise<void>;
};

const Nav = ({ email, balance, onSignOut }: Props) => (
  <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-10">
    <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Wordmark />
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/markets"
            className="text-text-mid hover:text-text-high transition"
          >
            Markets
          </Link>
          <Link
            href="/portfolio"
            className="text-text-mid hover:text-text-high transition"
          >
            Portfolio
          </Link>
        </nav>
      </div>
      {email && onSignOut ? (
        <div className="flex items-center gap-3 text-sm">
          {balance !== null ? (
            <Link
              href="/portfolio"
              className="inline-flex items-center px-3 h-8 rounded-pill border border-border bg-bg-elevated font-mono text-text-high hover:border-brand transition"
            >
              {formatUsd(balance)}
            </Link>
          ) : null}
          <span className="text-text-dim hidden sm:inline">{email}</span>
          <form action={onSignOut}>
            <button
              type="submit"
              className="text-text-mid hover:text-text-high transition"
            >
              Sign out
            </button>
          </form>
        </div>
      ) : null}
    </div>
  </header>
);

export default Nav;
