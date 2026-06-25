import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, MapPin, Heart, Share2, MessageCircle, ArrowLeft, Check, X } from 'lucide-react';
import { laptops } from '../data/mockData';
import { useCart } from '../contexts/AppContext';

const laptopToProduct = (laptop) => {
  return {
    id: laptop.id,
    name: laptop.title, 
    brand: laptop.brand,
    model: laptop.model,
    price: laptop.price,
    originalPrice: laptop.originalPrice ?? laptop.price,
    discount: laptop.originalPrice ? Math.round(((laptop.originalPrice - laptop.price) / laptop.originalPrice) * 100) : 0,
    grade: 'Like New',
    condition: laptop.condition,
    images: laptop.images,
    specifications: {
      processor: laptop.processor,
      ram: laptop.ram,
      storage: laptop.storage,
      graphics: laptop.graphics,
      display: laptop.screenSize,
      batteryHealth: 100,
      os: 'Windows',
      ports: [],
      weight: '',
      dimensions: ''
    },
    seller: {
      id: '',
      name: laptop.seller.name,
      rating: laptop.seller.rating,
      verified: laptop.isVerified,
      totalSales: 0,
      responseTime: ''
    },
    rating: laptop.seller.rating,
    reviewCount: laptop.seller.reviews,
    warranty: {
      duration: '',
      type: '',
      coverage: []
    },
    shipping: {
      free: true,
      days: '',
    },
    inStock: true,
    stockCount: 1,
    featured: false,
    createdAt: laptop.createdAt,
    category: '',
    tags: [],
    description: laptop.description,
  };
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const laptop = laptops.find(l => l.id === id);

  if (!laptop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Laptop not found</h1>
          <button
            onClick={() => navigate('/browse')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      product: laptopToProduct(laptop),
      addedAt: new Date().toISOString()
    });
  };

  const savings = laptop.originalPrice ? laptop.originalPrice - laptop.price : 0;
  const savingsPercentage = laptop.originalPrice ? Math.round((savings / laptop.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
              <img
                src={laptop.images[selectedImage]}
                alt={laptop.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {laptop.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${laptop.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{laptop.title}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    laptop.condition === 'Excellent'
                      ? 'bg-green-100 text-green-800'
                      : laptop.condition === 'Good'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {laptop.condition}
                  </span>
                  {laptop.isVerified && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Verified Seller
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(laptop.seller.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {laptop.seller.rating} ({laptop.seller.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-gray-900">${laptop.price}</span>
                {laptop.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${laptop.originalPrice}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <div className="text-green-600 font-semibold">
                  You save ${savings} ({savingsPercentage}% off)
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{laptop.location}</span>
            </div>

            {/* Specs Quick View */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm text-gray-600">Processor</span>
                <p className="font-semibold">{laptop.processor}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">RAM</span>
                <p className="font-semibold">{laptop.ram}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Storage</span>
                <p className="font-semibold">{laptop.storage}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Screen Size</span>
                <p className="font-semibold">{laptop.screenSize}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Seller
              </button>
            </div>

            {/* Seller Info */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{laptop.seller.name}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(laptop.seller.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {laptop.seller.rating} ({laptop.seller.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description and Specs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{laptop.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Hardware</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand</span>
                      <span className="font-medium">{laptop.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{laptop.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year</span>
                      <span className="font-medium">{laptop.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processor</span>
                      <span className="font-medium">{laptop.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM</span>
                      <span className="font-medium">{laptop.ram}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Storage</span>
                      <span className="font-medium">{laptop.storage}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Display & Graphics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Screen Size</span>
                      <span className="font-medium">{laptop.screenSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Graphics</span>
                      <span className="font-medium">{laptop.graphics}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laptop.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Safety Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Meet in a public place for pickup
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Test the laptop before purchasing
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check seller's verification status
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use secure payment methods
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Seller</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Hi, I'm interested in your laptop..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;