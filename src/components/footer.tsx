import FoodyOrange from "../assets/logo-orange.svg";
import Facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/instagram.svg";
import Linkedin from "../assets/icons/linkedin.svg";
import Tiktok from "../assets/icons/tiktok.svg";

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-12 text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <img src={FoodyOrange} className="h-8 w-8" />
            <span className="text-lg font-semibold text-white">Foody</span>
          </div>

          <p className="mt-4 max-w-[320px] text-sm leading-relaxed">
            Enjoy homemade flavors & chef's signature dishes,
            freshly prepared every day. Order online or visit our
            nearest branch.
          </p>

          <div className="mt-4 flex gap-4">
            <img src={Facebook} className="h-4 w-4" />
            <img src={Instagram} className="h-4 w-4" />
            <img src={Linkedin} className="h-4 w-4" />
            <img src={Tiktok} className="h-4 w-4" />
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">
            Explore
          </h4>
          <ul className="space-y-2 text-sm">
            <li>All Food</li>
            <li>Nearby</li>
            <li>Discount</li>
            <li>Best Seller</li>
            <li>Delivery</li>
            <li>Lunch</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">
            Help
          </h4>
          <ul className="space-y-2 text-sm">
            <li>How to Order</li>
            <li>Payment Methods</li>
            <li>Track My Order</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
