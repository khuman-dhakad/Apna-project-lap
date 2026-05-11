import { MessageCircle, RotateCcw, Truck, Shield, Phone, Mail, Clock, Users } from 'lucide-react';

const HelpHome = ({ onSectionChange }) => {
  const quickActions = [
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Get in touch with our expert support team',
      icon: MessageCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'returns',
      title: 'Return & Refund',
      description: 'Easy returns within 30 days',
      icon: RotateCcw,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'shipping',
      title: 'Track Your Order',
      description: 'Real-time shipping updates',
      icon: Truck,
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      id: 'warranty',
      title: 'Warranty Claims',
      description: 'Register your product and file claims',
      icon: Shield,
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Clock, label: 'Avg Response Time', value: '< 2hrs' },
    { icon: Phone, label: 'Support Availability', value: '24/7' },
    { icon: Mail, label: 'Tickets Resolved', value: '98%' },
  ];

  const popularTopics = [
    'How to check laptop specifications',
    'Warranty registration process',
    'Return policy for damaged items',
    'Shipping costs and delivery times',
    'Technical support for hardware issues',
    'Software installation assistance',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          How can we help you today?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find answers to your questions, get support, and make the most of your laptop experience
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSectionChange(action.id)}
              className={`${action.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
            >
              <Icon size={32} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Why Choose Our Support
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popular Topics */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Help Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularTopics.map((topic, index) => (
            <button
              key={index}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <span className="text-gray-700 hover:text-blue-700">{topic}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpHome;
