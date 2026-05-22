import Link from "next/link";
import type { EventGroup } from "../types";
import { eventSlug, formatDateCode } from "../helpers";
import MoneylineButton from "./MoneylineButton";

const EventCard = ({ group }: { group: EventGroup }) => {
  const slug = eventSlug(group.eventName);
  return (
    <article className="rounded-card border border-border bg-bg-elevated/30 overflow-hidden flex flex-col">
      <header className="px-4 pt-4 pb-3 space-y-1">
        <h2 className="text-sm font-semibold text-text-high truncate">
          {group.eventName}
        </h2>
        <div className="flex items-center justify-between text-[11px] text-text-dim">
          <span>{formatDateCode(group.dateCode)}</span>
          {group.venue ? <span className="truncate ml-2">{group.venue}</span> : null}
        </div>
      </header>

      <div className="px-4 pb-3 space-y-2">
        <MoneylineButton team={group.awayTeam} market={group.awayMoneyline} slug={slug} />
        <MoneylineButton team={group.homeTeam} market={group.homeMoneyline} slug={slug} />
      </div>

      <footer className="mt-auto px-4 py-2.5 border-t border-border flex items-center justify-between">
        <span className="text-[11px] text-text-dim">{group.markets.length} markets</span>
        <Link
          href={`/markets/${slug}`}
          className="text-[11px] text-brand hover:text-brand-hover font-medium"
        >
          View all &rarr;
        </Link>
      </footer>
    </article>
  );
};

export default EventCard;
