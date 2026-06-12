import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Star, ShoppingCart, Heart, Share2, Shield, Truck, RotateCcw, 
  CheckCircle, Battery, Cpu, HardDrive, MemoryStick,
  ChevronLeft, ChevronRight, Plus, Minus, MessageCircle, Award,
  Clock, MapPin, Phone, ArrowLeft
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
// import { db } from "../firebaseconfig";
// import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = state.products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setIsWishlisted(state.wishlist.includes(id));
      } else {
        navigate('/products');
      }
    }
  }, [id, state.products, navigate, state.wishlist]);

  useEffect(() => {
    const fetchListings = async () => {
      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setListings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchListings();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
    setIsWishlisted(!isWishlisted);
  };

  const getGradeBadge = (grade) => {
    const badges = {
      'Like New': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Grade A': 'bg-blue-100 text-blue-800 border-blue-200',
      'Certified Refurbished': 'bg-purple-100 text-purple-800 border-purple-200',
      'Grade B': 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return badges[grade] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getBatteryColor = (health) => {
    if (health >= 90) return 'text-emerald-600';
    if (health >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const relatedProducts = state.products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-emerald-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-emerald-600">Laptops</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                    disabled={selectedImageIndex === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(Math.min(product.images.length - 1, selectedImageIndex + 1))}
                    disabled={selectedImageIndex === product.images.length - 1}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${getGradeBadge(product.grade)}`}>
                  {product.grade}
                </span>
                {product.featured && (
                  <span className="bg-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === selectedImageIndex ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.condition}</p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
              <div className="flex items-center space-x-1">
                {product.seller.verified && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                <span className="text-gray-700">{product.seller.name}</span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.discount > 0 && (
                <p className="text-emerald-600 font-medium">
                  You save ${product.originalPrice - product.price} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Key Specs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">CPU:</span>
                  <span className="font-medium">{product.specifications.processor.split(' ').slice(0, 3).join(' ')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MemoryStick className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">RAM:</span>
                  <span className="font-medium">{product.specifications.ram}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Storage:</span>
                  <span className="font-medium">{product.specifications.storage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className={`h-4 w-4 ${getBatteryColor(product.specifications.batteryHealth)}`} />
                  <span className="text-gray-600">Battery:</span>
                  <span className={`font-medium ${getBatteryColor(product.specifications.batteryHealth)}`}>
                    {product.specifications.batteryHealth}%
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <>
                  <span className="h-5 w-5 bg-red-500 rounded-full"></span>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Actions */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 rounded-l-lg"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="p-2 hover:bg-gray-100 rounded-r-lg"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`p-3 border-2 rounded-lg transition-colors duration-200 ${
                      isWishlisted
                        ? 'border-red-500 text-red-500 bg-red-50'
                        : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 border-2 border-gray-300 text-gray-600 hover:border-emerald-500 hover:text-emerald-500 rounded-lg transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">{product.warranty.duration}</p>
                <p className="text-xs text-gray-600">Warranty</p>
              </div>
              <div className="text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {product.shipping.free ? 'Free' : `$${product.shipping.cost}`}
                </p>
                <p className="text-xs text-gray-600">Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">30 Days</p>
                <p className="text-xs text-gray-600">Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl shadow-lg">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'seller', label: 'Seller Info' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Condition Details</h3>
                  <p className="text-gray-700">{product.condition}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Laptop computer</li>
                    <li>Original or compatible power adapter</li>
                    <li>Power cord</li>
                    <li>Warranty documentation</li>
                    {product.grade === 'Like New' && <li>Original packaging (when available)</li>}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Processor:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.processor}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Memory (RAM):</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.ram}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Storage:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.storage}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Graphics:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.graphics}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Operating System:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.os}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Display:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.display}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Weight:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.weight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Dimensions:</dt>
                      <dd className="font-medium text-gray-900">{product.specifications.dimensions}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Battery Health:</dt>
                      <dd className={`font-medium ${getBatteryColor(product.specifications.batteryHealth)}`}>
                        {product.specifications.batteryHealth}%
                      </dd>
                    </div>
                  </dl>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-6">Connectivity</h3>
                  <div className="space-y-2">
                    {product.specifications.ports.map((port, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{port}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Review Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-5 gap-2 text-sm">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span>{rating}</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">John D.</span>
                        <span className="text-green-600 text-sm">Verified Purchase</span>
                      </div>
                      <span className="text-gray-500 text-sm">2 weeks ago</span>
                    </div>
                    <h4 className="font-medium mb-2">Excellent laptop for the price!</h4>
                    <p className="text-gray-700">
                      This laptop exceeded my expectations. The condition was exactly as described, 
                      and it performs wonderfully for my daily work tasks. Great value for money!
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4].map(star => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-green-600 text-sm">Verified Purchase</span>
                      </div>
                      <span className="text-gray-500 text-sm">1 month ago</span>
                    </div>
                    <h4 className="font-medium mb-2">Good laptop, minor cosmetic issues</h4>
                    <p className="text-gray-700">
                      The laptop works great and the battery life is impressive. There are some minor 
                      scratches on the lid, but nothing that affects functionality.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seller' && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Award className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{product.seller.name}</h3>
                      {product.seller.verified && (
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.seller.rating} rating</span>
                      </div>
                      <span>{product.seller.totalSales} sales</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Responds in {product.seller.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Seller Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>Ships from California, USA</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-gray-500" />
                        <span>Verified business seller</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span>Top-rated seller</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Contact Seller</h4>
                    <div className="space-y-2">
                      <button className="flex items-center space-x-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                        <MessageCircle className="h-4 w-4" />
                        <span>Send Message</span>
                      </button>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>1-800-SELLER</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Return Policy</h4>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    <p>
                      30-day return policy. Items must be returned in original condition. 
                      Buyer pays return shipping unless item is not as described.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">${relatedProduct.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;