"use client";

import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { items, init } = useCartService();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToProfile = () => {
    router.push("/profile");
  };

  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <section className="announcments">
        <div className="news">
          <p>PRODUCTS COMING SOON</p>
        </div>
      </section>
      <Image
        id="brand"
        src="/icons/logo2.png"
        alt="logo"
        width={100}
        height={50}
      />
      <nav>
        <ul>
          <li>
            {session && session.user ? (
              <div>
                <div>
                  <button className="h-btn" type="button" onClick={goToProfile}>
                    Profile
                  </button>
                </div>
              </div>
            ) : (
              <button className="h-btn" type="button" onClick={() => signIn()}>
                Sign In
              </button>
            )}
          </li>
          <li>
            <a href="/#products">Products</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          <li>
            <Link href="/cart">
              Cart
              {/* Uncomment and use if you have cart items */}
              {/* mounted && items.length !== 0 && (
								<div>
									{items.reduce((a, b) => a + b.qty, 0)}
								</div>
							) */}
            </Link>
          </li>
        </ul>
      </nav>
      <div
        id="hamburger-icon"
        className={menuOpen ? "open" : ""}
        onClick={toggleMenu}
      >
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3" />
        <ul className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {session && session.user ? (
            <li>
              <a href="/profile">Profile</a>
            </li>
          ) : (
            <li>
              <a href="/signin">Sign In</a>
            </li>
          )}
          <li>
            <a href="/#products">Products</a>
          </li>
          <li>
            <a href="/#about">About</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
