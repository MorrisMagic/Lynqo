import React from "react";
import {
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaDiscord,
  FaArrowRight,
  FaFire,
  FaStar,
  FaCrown,
  FaTrophy,
  FaChartLine,
  FaRocket,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  // Trending content data
  const trendingContent = [
    {
      title: "Minimalist Bio Designs",
      type: "Design",
      creator: "@minimalistjane",
      likes: "2.4k",
      image: "bg-gradient-to-r from-cyan-400 to-blue-500",
    },
    {
      title: "Gaming Setup Links",
      type: "Gaming",
      creator: "@gameproalex",
      likes: "1.8k",
      image: "bg-gradient-to-r from-purple-400 to-pink-500",
    },
    {
      title: "Fashion Portfolio",
      type: "Fashion",
      creator: "@styledbyemma",
      likes: "3.1k",
      image: "bg-gradient-to-r from-amber-400 to-orange-500",
    },
    {
      title: "Music Producer Kit",
      type: "Music",
      creator: "@beatsbyliam",
      likes: "4.2k",
      image: "bg-gradient-to-r from-green-400 to-teal-500",
    },
  ];

  // Featured creators
  const featuredCreators = [
    {
      name: "Alex Chen",
      username: "@creativealex",
      followers: "128K",
      category: "Design & Art",
      avatar: "bg-gradient-to-r from-purple-400 to-pink-500",
    },
    {
      name: "Maya Rodriguez",
      username: "@mayarizz",
      followers: "94K",
      category: "Fashion",
      avatar: "bg-gradient-to-r from-cyan-400 to-blue-500",
    },
    {
      name: "Jordan Lee",
      username: "@jordanlee",
      followers: "217K",
      category: "Tech",
      avatar: "bg-gradient-to-r from-amber-400 to-orange-500",
    },
    {
      name: "Taylor Kim",
      username: "@taykimm",
      followers: "183K",
      category: "Lifestyle",
      avatar: "bg-gradient-to-r from-green-400 to-teal-500",
    },
  ];

  // Stats and achievements
  const statsData = [
    {
      metric: "Page Views",
      value: "12.4M",
      change: "+24%",
      icon: <FaChartLine />,
    },
    {
      metric: "Connections",
      value: "3.8M",
      change: "+18%",
      icon: <FaRocket />,
    },
    {
      metric: "Avg. Engagement",
      value: "9.2%",
      change: "+7%",
      icon: <FaFire />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 flex flex-col">
      {/* Header (unchanged) */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Lynqo
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                Discover
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors font-medium"
              >
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to={"/auth/signup"}>
                <button className="text-gray-600 hover:text-purple-600 font-medium hidden md:block">
                  Sign In
                </button>
              </Link>
              <Link to={"/auth/login"}>
                <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-5 rounded-full font-medium hover:shadow-lg transition-all hover:from-purple-700 hover:to-blue-600">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section (unchanged) */}
        <section className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Your Links.
              <span className="block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                One Bio.
              </span>
              <span className="block">Endless Possibilities.</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Share all your important links in one place. Beautiful,
              customizable, and designed to convert.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-full font-medium hover:shadow-lg transition-all flex items-center justify-center">
                Create Your Page <FaArrowRight className="ml-2" />
              </button>
              <button className="bg-white text-gray-800 py-3 px-6 rounded-full font-medium border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all">
                See Examples
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-b from-purple-100 to-blue-100 rounded-3xl shadow-2xl flex flex-col items-center p-6 border-4 border-white">
                {/* Mock phone content */}
                <div className="w-16 h-1 bg-gray-300 rounded-full mb-4"></div>
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 mb-4 mt-2 border-4 border-white shadow-md"></div>
                <h3 className="font-bold text-lg text-gray-800">@username</h3>
                <p className="text-gray-600 text-sm text-center my-3">
                  Digital creator | Tech enthusiast
                </p>
                <div className="w-full space-y-3 mt-4">
                  <div className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"></div>
                  <div className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"></div>
                  <div className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"></div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </section>

        {/* Social Proof (unchanged) */}
        <section className="bg-white rounded-3xl shadow-sm p-6 mb-16 border border-gray-100">
          <p className="text-gray-500 text-center mb-4">
            Trusted by creators worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-2xl font-bold text-gray-700">1M+</div>
            <div className="text-2xl font-bold text-gray-700">200K+</div>
            <div className="text-2xl font-bold text-gray-700">95%</div>
            <div className="text-2xl font-bold text-gray-700">4.9/5</div>
          </div>
        </section>

        {/* Trending Content Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaFire className="text-orange-500 mr-2" />
              Trending Content
            </h3>
            <button className="text-purple-600 font-medium flex items-center">
              View all <FaArrowRight className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trendingContent.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-32 ${item.image} relative`}>
                  <div className="absolute top-3 left-3 bg-black/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                    {item.type}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm mb-3">
                    by {item.creator}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm flex items-center">
                      <FaStar className="text-yellow-400 mr-1" /> {item.likes}
                    </span>
                    <button className="text-xs bg-purple-50 text-purple-600 hover:bg-purple-100 px-3 py-1 rounded-full transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Creators Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaCrown className="text-yellow-500 mr-2" />
              Featured Creators
            </h3>
            <button className="text-purple-600 font-medium flex items-center">
              View all <FaArrowRight className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCreators.map((creator, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 text-center border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 ${creator.avatar}`}
                ></div>
                <h4 className="font-bold text-gray-800">{creator.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{creator.username}</p>
                <p className="text-gray-600 text-xs bg-gray-100 inline-block px-2 py-1 rounded-full mb-3">
                  {creator.category}
                </p>
                <p className="text-gray-700 font-medium">
                  {creator.followers} followers
                </p>
                <button className="mt-4 w-full bg-purple-50 text-purple-600 hover:bg-purple-100 py-2 rounded-lg text-sm font-medium transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Stats & Achievements Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaTrophy className="text-purple-500 mr-2" />
              Stats & Achievements
            </h3>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="flex items-center justify-center text-sm mb-1">
                    {stat.icon}
                    <span className="ml-2">{stat.metric}</span>
                  </div>
                  <div className="text-green-300 text-xs font-medium">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-purple-200 mb-4">
                Join creators who are growing their audience with Lynqo
              </p>
              <button className="bg-white text-purple-600 hover:bg-gray-100 font-medium py-2 px-6 rounded-full transition-colors">
                Start Your Journey
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (unchanged) */}
      <footer className="bg-gradient-to-r from-purple-900 to-blue-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-purple-600 font-bold">L</span>
                </div>
                <h3 className="text-xl font-bold">Lynqo</h3>
              </div>
              <p className="text-purple-200 mb-4">
                One link to share everything you create, curate, and sell from
                your Instagram, TikTok, Twitter, YouTube and more.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <FaInstagram className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <FaTiktok className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <FaDiscord className="text-xl" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    Docs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 mb-4 md:mb-0">
              © {new Date().getFullYear()} wooshdotes. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-purple-200 hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
