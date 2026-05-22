import Link from "next/link";
import Wordmark from "./Wordmark";

type Props = {
  email: string | null;
  onSignOut?: () => Promise<void>;
};

const Nav = ({ email, onSignOut }: Props) => (
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
        <form action={onSignOut} className="flex items-center gap-3 text-sm">
          <span className="text-text-dim hidden sm:inline">{email}</span>
          <button
            type="submit"
            className="text-text-mid hover:text-text-high transition"
          >
            Sign out
          </button>
        </form>
      ) : null}
    </div>
  </header>
);

export default Nav;
