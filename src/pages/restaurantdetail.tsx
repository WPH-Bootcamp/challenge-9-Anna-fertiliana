import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantDetail } from "../services/restaurant";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

import MainImg from "../assets/burger-main.svg";
import Img1 from "../assets/burger-1.svg";
import Img2 from "../assets/burger-3.svg";
import Img3 from "../assets/burger-4.svg";
import BurgerKing from "../assets/icons/burger-king.svg";
import ShareIcon from "../assets/icons/share.svg";
import StarIcon from "../assets/icons/star.svg";

export default function RestaurantDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantDetail(id!),
    enabled: !!id,
  });

  if (!id) return <p className="p-6">Restaurant tidak ditemukan</p>;
  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error || !data) return <p className="p-6">Error loading data</p>;

  const restaurant = data;
  const menus = restaurant.menus ?? [];
  const reviews = restaurant.reviews ?? [];

  function addToCart(menu: any) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === menu.id);

    if (existing) existing.qty += 1;
    else cart.push({ ...menu, qty: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-change"));
  }

  return (
    <div className="w-full bg-white">
      <Navbar variant="solid" />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        {/* ===== GALLERY ===== */}
        <div className="grid h-[320px] grid-cols-4 grid-rows-3 gap-4">
          <img src={MainImg} className="col-span-2 row-span-3 rounded-xl object-cover w-full h-full" />
          <img src={Img1} className="col-span-2 row-span-2 rounded-xl object-cover w-full h-full" />
          <img src={Img2} className="rounded-xl object-cover w-full h-full" />
          <img src={Img3} className="rounded-xl object-cover w-full h-full" />
        </div>

        {/* ===== INFO ===== */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={BurgerKing} className="h-12 w-12 rounded-full" />
            <div>
              <h2 className="text-base font-semibold">{restaurant.name}</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                <img src={StarIcon} className="h-4 w-4" />
                <span>{restaurant.averageRating ?? "-"}</span>
                <span>{restaurant.place ?? "-"}</span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-100">
            <img src={ShareIcon} className="h-4 w-4" />
            Share
          </button>
        </div>

        {/* ===== MENU ===== */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {menus.map((menu: any) => (
            <div key={menu.id} className="rounded-xl border p-3 hover:shadow-md">
              <img src={menu.image} className="h-32 w-full rounded-lg object-cover" />
              <h3 className="mt-2 text-sm font-semibold">{menu.foodName}</h3>
              <p className="text-xs text-gray-500">
                Rp{menu.price?.toLocaleString("id-ID")}
              </p>
              <button
                onClick={() => addToCart(menu)}
                className="mt-3 w-full rounded-full bg-red-600 py-1.5 text-sm text-white"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        {/* ===== REVIEWS ===== */}
        <section className="mt-16 border-t pt-10">
          <div className="mx-auto max-w-6xl px-2">
            <div className="mb-6 flex items-center gap-2">
              <h3 className="text-lg font-semibold">Review</h3>
              <span className="text-sm text-gray-500">
                {reviews.length} Ulasan
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reviews.slice(0, 6).map((review: any) => (
                <div key={review.id} className="rounded-xl border p-4 shadow-sm">
                  <div className="mb-2 flex items-center gap-3">
                    <img
                      src={
                        review.user?.avatar ||
                        `https://ui-avatars.com/api/?name=${review.user?.name ?? "User"}`
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        {review.user?.name ?? "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={StarIcon}
                        className={`h-4 w-4 ${
                          i < review.star ? "opacity-100" : "opacity-30"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
