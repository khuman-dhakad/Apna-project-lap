import { useState } from 'react';
import { Truck, MapPin, Clock, Package, Search, CheckCircle, AlertTriangle } from 'lucide-react';

const ShippingInfo = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [activeTab, setActiveTab] = useState('rates');

  const shippingOptions = [
    {
      name: 'Standard Shipping',
      time: '5-7 Business Days',
      cost: 'FREE on orders $75+',
      description: 'Reliable delivery for most orders',hvghcfgxvjhjvcg
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Express Shipping',
      time: '2-3 Business Days',
      cost: '$15.99',
      description: 'Faster delivery when you need it sooner',
      icon: Truck,
      color: 'bg-orange-500',
    },
    {
      name: 'Overnight Shipping',
      time: '1 Business Day',
      cost: '$29.99',
      description: 'Next business day delivery',
      icon: Clock,
      color: 'bg-red-500',
    },
  ];

  const deliveryZones = [
    { zone: 'Zone 1 (Local)', states: 'CA, NV, OR, WA', time: '1-2 days', cost: '$5.99' },
    { zone: 'Zone 2 (Regional)', states: 'AZ, CO, ID, MT, UT, WY', time: '2-3 days', cost: '$8.99' },
    { zone: 'Zone 3 (National)', states: 'Continental US', time: '3-5 days', cost: '$12.99' },
    { zone: 'Zone 4 (Extended)', states: 'AK, HI, PR', time: '5-7 days', cost: '$24.99' },
  ];

  const trackingSteps = [
    { status: 'Order Placed', description: 'Your order has been received and is being processed', completed: true },
    { status: 'Processing', description: 'We are preparing your items for shipment', completed: true },
    { status: 'Shipped', description: 'Your package is on its way to you', completed: true },
    { status: 'Out for Delivery', description: 'Your package is out for delivery today', completed: false },
    { status: 'Delivered', description: 'Package has been delivered successfully', completed: false },
  ];

  const handleTrackingSubmit = (e) => {
    e.preventDefault();
    // Simulate tracking lookup
    console.log('Tracking:', trackingNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <p className="text-lg text-gray-600">
          Fast, reliable shipping with real-time tracking for all your laptop orders
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'rates'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Shipping Rates
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'tracking'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Track Package
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'delivery'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Delivery Info
          </button>
        </div>
      </div>

      {activeTab === 'rates' && (
        <div className="space-y-8">
          {/* Shipping Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className={`${option.color} text-white p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{option.cost}</p>
                  <p className="text-gray-600 mb-3">{option.time}</p>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              );
            })}
          </div>

          {/* Delivery Zones */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Zones & Rates</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Zone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Coverage</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Delivery Time</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Standard Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{zone.zone}</td>
                      <td className="py-3 px-4 text-gray-600">{zone.states}</td>
                      <td className="py-3 px-4 text-gray-600">{zone.time}</td>
                      <td className="py-3 px-4 font-medium text-blue-600">{zone.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Special Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Free Shipping Offer</h3>
              <p className="text-green-700 mb-4">Get free standard shipping on all orders over $75</p>
              <div className="flex items-center text-sm text-green-600">
                <CheckCircle size={16} className="mr-2" />
                <span>No coupon code required</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Business Accounts</h3>
              <p className="text-blue-700 mb-4">Special shipping rates for business customers</p>
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle size={16} className="mr-2" />
                <span>Contact us for custom rates</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="space-y-8">
          {/* Tracking Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Your Package</h2>
            <form onSubmit={handleTrackingSubmit} className="max-w-md">
              <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Tracking Number
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g., TL1234567890"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Search size={18} />
                  <span>Track</span>
                </button>
              </div>
            </form>
          </div>

          {/* Sample Tracking Results */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Tracking: TL1234567890</h3>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                In Transit
              </span>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-600 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-blue-900">Currently in San Francisco, CA</h4>
                  <p className="text-blue-700 text-sm">Expected delivery: Tomorrow by 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    step.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {step.completed && <CheckCircle className="text-white w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.status}
                    </h4>
                    <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                  {index === 2 && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div className="space-y-8">
          {/* Delivery Guidelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Requirements</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Signature Required</h4>
                    <p className="text-gray-600 text-sm">High-value items require adult signature (21+)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Safe Delivery</h4>
                    <p className="text-gray-600 text-sm">Packages left in secure locations if no one is home</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Delivery Notifications</h4>
                    <p className="text-gray-600 text-sm">SMS and email alerts for delivery updates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Issues</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Package Not Delivered</h4>
                    <p className="text-gray-600 text-sm">Contact us within 24 hours of expected delivery</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Damaged Package</h4>
                    <p className="text-gray-600 text-sm">Take photos and refuse delivery if severely damaged</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-yellow-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Wrong Address</h4>
                    <p className="text-gray-600 text-sm">Address changes possible before shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* International Shipping */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">International Shipping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Canada</h4>
                <p className="text-sm text-gray-600 mb-1">7-10 business days</p>
                <p className="text-sm font-medium text-blue-600">Starting at $25</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Europe</h4>
                <p className="text-sm text-gray-600 mb-1">10-14 business days</p>
                <p className="text-sm font-medium text-blue-600">Starting at $45</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Asia Pacific</h4>
                <p className="text-sm text-gray-600 mb-1">12-16 business days</p>
                <p className="text-sm font-medium text-blue-600">Starting at $55</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> International orders may be subject to customs duties and taxes. 
                These fees are the responsibility of the recipient.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
