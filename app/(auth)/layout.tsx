import Wordmark from "@/components/ui/Wordmark";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <header>
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center">
        <Wordmark />
      </div>
    </header>
    <main className="flex-1 flex items-start justify-center px-6 pt-12">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  </div>
);

export default AuthLayout;
