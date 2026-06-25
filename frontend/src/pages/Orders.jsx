import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, MessageCircle } from 'lucide-react';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      laptop: {
        title: 'MacBook Pro 13" M1 - Excellent Condition',
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=300',
        price: 899
      },
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-18',
      seller: 'Sarah Johnson',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      laptop: {
        title: 'Dell XPS 15 - Gaming Ready',
        image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=300',
        price: 1299
      },
      status: 'shipped',
      orderDate: '2024-01-20',
      estimatedDelivery: '2024-01-25',
      seller: 'Mike Chen',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      laptop: {
        title: 'ThinkPad X1 Carbon - Business Laptop',
        image: 'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=300',
        price: 749
      },
      status: 'processing',
      orderDate: '2024-01-22',
      estimatedDelivery: '2024-01-28',
      seller: 'David Park'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your laptop purchases</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'all', label: 'All Orders', count: orders.length },
                { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
                { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
                { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'all'
                  ? "You haven't placed any orders yet."
                  : `No orders with status "${activeTab}".`
                }
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Order #{order.id}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Ordered on {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <img
                    src={order.laptop.image}
                    alt={order.laptop.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {order.laptop.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Sold by {order.seller}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ${order.laptop.price}
                    </p>
                  </div>

                  <div className="text-right">
                    {order.status === 'delivered' && order.deliveryDate && (
                      <p className="text-sm text-green-600 font-medium mb-2">
                        Delivered on {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                    )}
                    {order.status === 'shipped' && order.estimatedDelivery && (
                      <p className="text-sm text-blue-600 font-medium mb-2">
                        Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                    {order.status === 'processing' && order.estimatedDelivery && (
                      <p className="text-sm text-yellow-600 font-medium mb-2">
                        Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-500 mb-3">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}

                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <MessageCircle className="h-4 w-4" />
                        <span>Contact Seller</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Progress */}
                {order.status !== 'delivered' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center space-x-2 ${
                        ['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          ['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm font-medium">Order Confirmed</span>
                      </div>

                      <div className={`flex items-center space-x-2 ${
                        ['shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          ['shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm font-medium">Shipped</span>
                      </div>

                      <div className={`flex items-center space-x-2 ${
                        order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <span className="text-sm font-medium">Delivered</span>
                      </div>
                    </div>

                    <div className="flex mt-2">
                      <div className={`flex-1 h-1 rounded-full ${
                        ['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className={`flex-1 h-1 rounded-full ml-2 ${
                        ['shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div className={`flex-1 h-1 rounded-full ml-2 ${
                        order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;