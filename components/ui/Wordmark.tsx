import Link from "next/link";

const Wordmark = () => (
  <Link
    href="/markets"
    className="font-semibold text-text-high tracking-[0.18em] text-sm select-none"
  >
    TORNIKY<span className="text-brand">X</span> ODDS
  </Link>
);

export default Wordmark;
