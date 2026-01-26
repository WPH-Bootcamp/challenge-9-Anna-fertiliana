import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

import heroImg from "../assets/hero.svg";
import foodyLogo from "../assets/Logo.svg";

/* icons */
import searchIcon from "../assets/icons/search.svg";
import AllRestaurant from "../assets/icons/all.svg";
import Nearby from "../assets/icons/nearby.svg";
import Discount from "../assets/icons/discount.svg";
import BestSeller from "../assets/icons/best-seller.svg";
import Delivery from "../assets/icons/delivery.svg";
import Lunch from "../assets/icons/lunch.svg";
import BurgerKing from "../assets/icons/burger-king.svg";
import Star from "../assets/icons/star.svg";


export default function Home() {
  const navigate = useNavigate();

  const categories = [
    { label: "All Restaurant", icon: AllRestaurant },
    { label: "Nearby", icon: Nearby },
    { label: "Discount", icon: Discount },
    { label: "Best Seller", icon: BestSeller },
    { label: "Delivery", icon: Delivery },
    { label: "Lunch", icon: Lunch },
  ];

  const token = localStorage.getItem("token");

  return (
    <>
    <Navbar />
    <div className="w-full">
      {/* ===== HERO / LANDING ===== */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Background */}
        <img
          src={heroImg}
          alt="Burger background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col text-white">
          {/* Hero Center */}
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
              Explore Culinary Experiences
            </h1>

            <p className="mt-4 max-w-xl text-sm text-gray-200 md:text-base">
              Search and refine your choice to discover the perfect restaurant.
            </p>

            {/* Search */}
            <div className="mt-8 flex w-full max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg">
              <img
                src={searchIcon}
                alt="Search"
                className="h-4 w-4 opacity-60"
              />
              <input
                type="text"
                placeholder="Search restaurants, food and drink"
                className="w-full bg-transparent text-sm text-black outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY SECTION ===== */}
      <section className="bg-white px-6 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4 sm:grid-cols-6">
          {categories.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="h-7 w-7"
                />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RECOMMENDED ===== */}
        <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recommended</h2>
            <button className="text-sm text-red-500 hover:underline">
                See All
            </button>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                key={i}
                onClick={() => navigate("/restaurant/293")}
                className="flex cursor-pointer gap-3 rounded-xl border p-3 shadow-sm transition hover:shadow-md"
                >
                <img
                    src={BurgerKing}
                    alt="Burger King"
                    className="h-12 w-12 rounded-lg"
                />

                <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                    Burger King
                    </span>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                    <img src={Star} alt="rating" className="h-3 w-3" />
                    <span>3.9</span>
                    </div>

                    <span className="text-xs text-gray-400">
                    Bekasi
                    </span>
                </div>
                </div>
            ))}
            </div>

            <div className="mt-8 flex justify-center">
            <button className="rounded-full border px-6 py-2 text-sm hover:bg-gray-100">
                Show More
            </button>
            </div>
        </div>
        </section>
      <Footer />
      </div>
      </>
  );
}
