import { fetchArticles } from '@/lib/api';
import { ArticleCard } from '@/components/ArticleCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cpu, Search, Mail, Github, Twitter, Linkedin, ChevronDown, TrendingUp, BookOpen, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const articles = await fetchArticles();
  const featuredArticles = articles.slice(0, 3);
  const latestArticles = articles.slice(3, 7);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-10 bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Cpu size={24} />
              <span className="text-xl font-bold">AI News Hub</span>
            </Link>
            <nav className="hidden lg:flex space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                  <span>Categories</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1" role="menu">
                    {['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Robotics'].map((category) => (
                      <Link
                        key={category}
                        href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                        role="menuitem"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/latest" className="hover:text-blue-400 transition-colors">Latest</Link>
              <Link href="/opinion" className="hover:text-blue-400 transition-colors">Opinion</Link>
              <Link href="/events" className="hover:text-blue-400 transition-colors">Events</Link>
              <Link href="/about" className="hover:text-blue-400 transition-colors">About</Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Input type="search" placeholder="Search..." className="w-full md:w-auto" />
              <Button size="icon" variant="ghost">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles[0] && (
              <ArticleCard article={featuredArticles[0]} variant="featured" />
            )}
            <div className="grid grid-rows-2 gap-6">
              {featuredArticles.slice(1, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Link href="/latest" className="text-blue-400 hover:underline flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About AI News Hub</h3>
              <p className="mb-4">Your trusted source for the latest advancements in artificial intelligence and machine learning.</p>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="hover:text-blue-400 transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Machine Learning</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Natural Language Processing</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Computer Vision</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Robotics</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">AI Ethics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/latest" className="hover:text-blue-400 transition-colors">Latest News</Link></li>
                <li><Link href="/opinion" className="hover:text-blue-400 transition-colors">Opinion Pieces</Link></li>
                <li><Link href="/events" className="hover:text-blue-400 transition-colors">Events</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>contact@ainewshub.com</span>
                </li>
                <li>123 AI Street, Tech City</li>
                <li>AI Country, 12345</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} AI News Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}