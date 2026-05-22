import Nav from "@/components/ui/Nav";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Nav email={null} />
    <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-8">{children}</main>
  </div>
);

export default AppLayout;
