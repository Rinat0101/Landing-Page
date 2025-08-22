import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-5/6 bg-[#0f0f0f] mx-auto rounded-t-4xl px-6 md:px-12 py-10 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo & Social */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/images/logo.svg" alt="ProCoding logo" width={32} height={32} />
            <span className="font-semibold text-white text-lg">ProCoding</span>
          </div>
          <p className="mb-4 text-white/80">Our social media</p>
          <div className="flex gap-3">
            <a href="#"><Image src="/images/fb_icon.svg" alt="Facebook" width={30} height={30} /></a>
            <a href="#"><Image src="/images/twitter_icon.svg" alt="Twitter" width={30} height={30} /></a>
            <a href="#"><Image src="/images/linkedin_icon.svg" alt="LinkedIn" width={30} height={30} /></a>
            <a href="#"><Image src="/images/instagram_icon.svg" alt="Instagram" width={30} height={30} /></a>
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="font-semibold mb-2">Documents</h3>
          <ul className="text-white/70 space-y-1 text-sm">
            <li><a href="#">User Agreement</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookies Policy</a></li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="font-semibold mb-2">Our Address</h3>
          <div className="flex items-start gap-2 text-white/70 text-sm">
            <Image src="/images/location_icon.svg" alt="Location" width={18} height={18} />
            <p>14 Pushkina St., Apt 27,<br />Yekaterinburg, 620014</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <Image src="/images/email_icon.svg" alt="Email" width={18} height={18} />
            <span>pochta@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Image src="/images/telegram_icon.svg" alt="Telegram" width={18} height={18} />
            <span>@daurfast</span>
          </div>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-[#0a0a0a] text-white/70 px-4 py-2 rounded-xl border border-white/20 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-[#a855f7] hover:bg-[#9333ea] text-white font-semibold py-2 rounded-full transition duration-200 text-sm"
          >
            Submit Request
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-white/50 text-sm text-center mt-10">
        © Coost 2025 | All rights reserved
      </div>
    </footer>
  );
}