"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { SparklesIcon } from "./icons";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              BG Changer
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-300 hover:text-white transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
