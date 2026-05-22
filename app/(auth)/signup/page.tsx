import Link from "next/link";
import SignupForm from "./components/SignupForm";

const SignupPage = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-text-mid text-sm">
        Start with{" "}
        <span className="text-text-high font-medium">$1,000</span> in paper money.
      </p>
    </div>
    <SignupForm />
    <p className="text-sm text-text-mid">
      Already have an account?{" "}
      <Link href="/login" className="text-brand hover:text-brand-hover">
        Log in
      </Link>
    </p>
  </div>
);

export default SignupPage;
