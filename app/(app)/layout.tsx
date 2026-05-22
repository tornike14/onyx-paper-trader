import { auth, signOut } from "@/auth";
import Nav from "@/components/ui/Nav";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const email = session?.user?.email ?? null;

  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/login" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav email={email} onSignOut={handleSignOut} />
      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-8">{children}</main>
    </div>
  );
};

export default AppLayout;
