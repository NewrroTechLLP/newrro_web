import Link from "next/link";
import { Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Mission", href: "/mission" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Courses", href: "/courses" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Community", href: "/community" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/NR.png"
                alt="NEWRRO Logo"
                className="text-xl sm:text-2xl font-bold text-purple-500"
                width={100} // You can adjust the size of the logo as per your need
                height={50}
              />
            </Link>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Transforming the future through innovative AI solutions and education.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/newrro_tech?igsh=MXA3dGJkazhlMjVucw%3D%3D" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="https://www.linkedin.com/company/newrro/?originalSubdomain=in" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-3 gap-8">
            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-500 transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-500 transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-purple-500 transition-colors text-sm sm:text-base"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} NEWRRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
