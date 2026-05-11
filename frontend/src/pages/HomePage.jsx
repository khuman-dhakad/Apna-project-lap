import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Truck, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import ProductCard from '../components/ProductCard';

// import { db } from "../firebaseconfig";
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// const [listings, setListings] = useState([]);

// useEffect(() => {
//   const fetchListings = async () => {
//     const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
//     const snapshot = await getDocs(q);
//     setListings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };
//   fetchListings();
// }, []);
// {listings.map(listing => (
//   <div key={listing.id}>
//     <h2>{listing.title}</h2>
//     <p>{listing.brand} - {listing.model}</p>
//     {/* aur jo info dikhani ho */}
//   </div>
// ))}

const HomePage = () => {
  const { state } = useApp();
  
  const featuredProducts = state.products.filter(product => product.featured).slice(0, 6);
  const dealProducts = state.products.filter(product => product.discount > 30).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 transform rotate-12 scale-150"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Premium
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Refurbished Laptops
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Discover expertly refurbished laptops that combine quality, sustainability, and incredible value. 
                Every device is thoroughly tested and comes with our quality guarantee.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link 
                  to="/products"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <Link 
                  to="/about"
                  className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                    <p className="text-sm text-gray-600">Rigorously tested</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Sellers</h3>
                    <p className="text-sm text-gray-600">Verified partners</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 justify-center lg:justify-start">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Shipping</h3>
                    <p className="text-sm text-gray-600">Free delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium refurbished laptop"
                  className="w-full h-auto rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">50K+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-teal-600 mb-2">99%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">12M</div>
                <div className="text-gray-600">Warranty Claims</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Laptops
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hand-picked premium refurbished laptops with exceptional value and verified quality
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link 
                to="/products"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>View All Laptops</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Special Deals */}
      {dealProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Special Deals
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Limited time offers on premium refurbished laptops with savings up to 40%
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {dealProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link 
                to="/deals"
                className="inline-flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>View All Deals</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ReLaptop Haven?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another marketplace. We're your trusted partner in finding quality refurbished technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Every laptop undergoes rigorous testing and comes with detailed condition reports.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Sellers</h3>
              <p className="text-gray-600">All our sellers are verified professionals with proven track records.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with transparent condition grading and no hidden fees.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Our tech experts are here to help you find the perfect laptop for your needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sustainable Technology for a Better Future
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                By choosing refurbished laptops, you're not just saving money – you're helping reduce electronic waste 
                and supporting a circular economy. Every refurbished laptop prevents unnecessary manufacturing and 
                keeps valuable materials in use.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-600 w-2 h-2 rounded-full"></div>
                  <span className="text-gray-700">Reduce electronic waste by up to 80%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-600 w-2 h-2 rounded-full"></div>
                  <span className="text-gray-700">Save thousands of gallons of water per device</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-600 w-2 h-2 rounded-full"></div>
                  <span className="text-gray-700">Lower carbon footprint compared to new devices</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sustainable technology"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="h-6 w-6" />
                  <span className="font-semibold">Eco-Friendly Choice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Browse our complete collection of expertly refurbished laptops with advanced filtering options
          </p>
          <Link 
            to="/products"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Browse All Laptops</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
