import Link from "next/link";
import Wordmark from "./Wordmark";

const Nav = ({ email }: { email: string | null }) => (
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
      {email ? (
        <span className="text-text-dim text-sm hidden sm:inline">{email}</span>
      ) : null}
    </div>
  </header>
);

export default Nav;
