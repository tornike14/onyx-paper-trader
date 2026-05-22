import Link from "next/link";
import LoginForm from "./components/LoginForm";

const LoginPage = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="text-text-mid text-sm">Log in to keep trading.</p>
    </div>
    <LoginForm />
    <p className="text-sm text-text-mid">
      No account?{" "}
      <Link href="/signup" className="text-brand hover:text-brand-hover">
        Sign up
      </Link>
    </p>
  </div>
);

export default LoginPage;
