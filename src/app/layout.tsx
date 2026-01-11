import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Explorer | Discover Amazing Products",
  description: "Explore and manage your favorite products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} text-gray-900 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">PE</span>
                </div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gradient">Product</span>
                  <span className="text-gray-900">Explorer</span>
                </h1>
              </div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {['Home', 'Categories', 'Favorites', 'About'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  ❤️
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  🛒
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  👤
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-12">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Product Explorer. Fake Store API data.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Made with ❤️ for the frontend assignment
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}