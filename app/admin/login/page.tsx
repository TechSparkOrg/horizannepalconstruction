"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAdminStore } from "@/stores/admin-store";
import { AuthService } from "@/api/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const session = await AuthService.Login({ email, password });
      if (!session.access || !session.user) throw new Error("Invalid login response");

      useAdminStore.setState({
        isAuthenticated: true,
        user: session.user,
      });
      router.push("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-2xl">
        <div className="size-14 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto">
          <Lock className="size-7" />
        </div>
        <h1 className="mt-4 text-center font-display font-bold text-2xl text-brand-dark">
          Admin Login
        </h1>
        <p className="mt-1 text-center text-sm text-mid-gray">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-3 pr-10 rounded-md border border-light-gray bg-white text-brand-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mid-gray hover:text-brand-dark"
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[52px] rounded-md bg-brand-primary text-white font-semibold inline-flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
