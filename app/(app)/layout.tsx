import { eq } from "drizzle-orm";
import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { balances } from "@/lib/db/schema";
import Nav from "@/components/ui/Nav";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const email = session?.user?.email ?? null;

  let balance: number | null = null;
  if (session?.user?.id) {
    const [row] = await db
      .select({ available: balances.available })
      .from(balances)
      .where(eq(balances.userId, session.user.id));
    if (row) balance = Number(row.available);
  }

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav email={email} balance={balance} onSignOut={handleSignOut} />
      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
