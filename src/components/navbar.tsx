import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoWhite from "../assets/logo.svg";
import LogoOrange from "../assets/logo-orange.svg";
import CartIcon from "../assets/icons/cart.svg";
import UserIcon from "../assets/icons/user.svg";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [cartCount, setCartCount] = useState(0);

  // ===== SCROLL EFFECT =====
  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  // ===== AUTH LISTENER =====
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    updateAuth();
    window.addEventListener("auth-change", updateAuth);
    return () => window.removeEventListener("auth-change", updateAuth);
  }, []);

  // ===== CART LISTENER =====
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = cart.reduce(
        (sum: number, item: any) => sum + (item.qty || 0),
        0
      );
      setCartCount(totalQty);
    };

    updateCart();
    window.addEventListener("cart-change", updateCart);
    return () => window.removeEventListener("cart-change", updateCart);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-2"
        >
          <img
            src={scrolled ? LogoOrange : LogoWhite}
            className="h-8 w-8"
          />
          <span
            className={`text-lg font-semibold ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            Foody
          </span>
        </div>

        {/* RIGHT MENU */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              {/* SIGN IN */}
              <Link
                to="/auth"
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    : "border border-white/60 text-white hover:bg-white/20"
                }`}
              >
                Sign In
              </Link>

              {/* SIGN UP */}
              <Link
                to="/auth"
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* CART */}
              <button
                onClick={() => navigate("/cart")}
                className="relative"
              >
                <img src={CartIcon} className="h-6 w-6" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 rounded-full bg-red-600 px-1.5 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* PROFILE */}
              <Link to="/profile">
                <img
                  src={UserIcon}
                  className="h-8 w-8 rounded-full border"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
