import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaLeaf, FaHeart, FaShieldAlt, FaTruck, FaStar } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeroSection } from '../store/slices/heroSlice';
import { fetchCategories } from '../store/slices/categorySlice';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const hero = useSelector(state => state.hero.data);
  const heroLoading = useSelector(state => state.hero.loading);
  const heroError = useSelector(state => state.hero.error);
  const categoriesData = useSelector(state => state.category.data);
  const categoriesLoading = useSelector(state => state.category.loading);
  const categoriesError = useSelector(state => state.category.error);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/signin');
    }
  };

  // Fetch featured products from backend
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/products/featured');
        const data = await response.json();
        
        if (data.success) {
          setFeaturedProducts(data.data);
        } else {
          console.error('Failed to fetch featured products:', data.message);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    if (!hero && !heroLoading && !heroError) {
      dispatch(fetchHeroSection());
    }
  }, [hero, heroLoading, heroError, dispatch]);

  useEffect(() => {
    if (!categoriesData.length && !categoriesLoading && !categoriesError) {
      dispatch(fetchCategories());
    }
  }, [categoriesData, categoriesLoading, categoriesError, dispatch]);

  // Fallback categories if API fails
  const fallbackCategories = [
    { name: "Vitamins", icon: "💊", link: "/products?category=vitamins", color: "bg-cyan-100" },
    { name: "Minerals", icon: "⚡", link: "/products?category=minerals", color: "bg-cyan-100" },
    { name: "Protein", icon: "💪", link: "/products?category=protein", color: "bg-red-100" },
    { name: "Omega-3", icon: "🐟", link: "/products?category=omega3", color: "bg-yellow-100" },
    { name: "Probiotics", icon: "🦠", link: "/products?category=probiotics", color: "bg-purple-100" },
    { name: "Antioxidants", icon: "🛡️", link: "/products?category=antioxidants", color: "bg-pink-100" }
  ];

  // Use categories from API or fallback
  const displayCategories = categoriesData.length > 0 ? categoriesData : fallbackCategories;

  const benefits = [
    {
      icon: <FaLeaf className="text-3xl text-cyan-600" />,
      title: "Nature-Inspired Formulations",
      description: "Our upcoming range may include products made with naturally derived ingredients."
    },
    {
      icon: <FaHeart className="text-3xl text-red-600" />,
      title: "Wellness-Oriented",
      description: "We aim to offer formulations that align with general health and wellness goals."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-cyan-600" />,
      title: "Thoughtful Quality",
      description: "We strive to source from trusted partners and may incorporate quality checks as we grow."
    },
    {
      icon: <FaTruck className="text-3xl text-orange-600" />,
      title: "Hassle-Free Shipping",
      description: "We plan to offer fast and reliable delivery options, including free shipping on select orders."
    }
  ];
  

  // Helper to get the correct image URL
  const getImageUrl = (img) => {
    if (!img) return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop';
    if (img.startsWith('/uploads/')) return `http://localhost:5000${img}`;
    return img;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {heroLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gray-400 h-12 mb-6 rounded-lg animate-pulse"></div>
                <div className="bg-gray-400 h-8 mb-8 rounded-lg animate-pulse"></div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="bg-gray-400 h-12 w-32 rounded-lg animate-pulse"></div>
                  <div className="bg-gray-400 h-12 w-32 rounded-lg animate-pulse"></div>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gray-400 h-96 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ) : heroError ? (
            <div className="text-center">
              <div className="text-2xl font-bold mb-4">Server is down</div>
              <p className="text-cyan-100">Please try again later</p>
            </div>
          ) : hero ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="font-poppins text-4xl md:text-6xl font-bold mb-6">{hero.heading}</h1>
                <p className="text-xl mb-8 text-cyan-100">{hero.subheading}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {hero.buttons && hero.buttons.map((btn, idx) => (
                    <Link
                      key={idx}
                      to={btn.link}
                      className={
                        idx === 0
                          ? "bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                          : "border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-cyan-600 transition-colors inline-flex items-center justify-center"
                      }
                    >
                      {btn.text}
                      {idx === 0 && <FaArrowRight className="ml-2" />}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src={getImageUrl(hero.image)}
                  alt="Hero"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of health supplements organized by category
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 h-24 rounded-lg mb-3"></div>
                  <div className="bg-gray-200 h-4 rounded"></div>
                </div>
              ))}
            </div>
          ) : categoriesError ? (
            <div className="text-center">
              <p className="text-gray-600">Failed to load categories. Using default categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {displayCategories.map((category, index) => (
                <Link
                  key={category._id || index}
                  to={category.link}
                  className={`${category.color} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular and highly-rated health supplements
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={getImageUrl(product.mainImage)}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.floor(product.rating?.average || 0) ? "text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({product.rating?.count || 0})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-cyan-600">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <Link
                        to={`/product/${product._id}`}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cyan-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
            >
              View All Products
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AstraPharma?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the highest quality health supplements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-xl mb-8 text-cyan-100">
          Join health-focused individuals across the country who choose AstraPharma as their trusted partner in wellness and nutrition.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Today
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
