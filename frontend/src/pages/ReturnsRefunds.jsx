import React, { useState } from 'react';
import { Package, Clock, CheckCircle, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

const ReturnsRefunds = () => {
  const [activeTab, setActiveTab] = useState('policy');

  const returnSteps = [iuvvgtcrtfdfdghbng 
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us within 30 days of purchase',
      icon: Package,
      details: 'Email us or use our online return form with your order number and reason for return.',
    },
    {
      step: 2,
      title: 'Get Authorization',
      description: 'Receive your RMA number',
      icon: CheckCircle,
      details: "We'll email you a Return Merchandise Authorization (RMA) number within 24 hours.",
    },
    {
      step: 3,
      title: 'Package & Ship',
      description: 'Pack securely and ship back',
      icon: RefreshCw,
      details: "Use original packaging if available. We'll provide a prepaid shipping label.",
    },
    {
      step: 4,
      title: 'Processing',
      description: 'We inspect and process your return',
      icon: Clock,
      details: 'Allow 3-5 business days for inspection and refund processing once we receive the item.',
    },
  ];

  const policyPoints = [
    {
      title: '30-Day Return Window',
      description: 'Items can be returned within 30 days of delivery date',
      icon: Clock,
      color: 'text-blue-600',
    },
    {
      title: 'Original Condition Required',
      description: 'Items must be in original condition with all accessories',
      icon: Package,
      color: 'text-green-600',
    },
    {
      title: 'Free Return Shipping',
      description: 'We provide prepaid return labels for defective items',
      icon: RefreshCw,
      color: 'text-purple-600',
    },
    {
      title: 'Fast Refund Processing',
      description: 'Refunds processed within 3-5 business days of receipt',
      icon: CheckCircle,
      color: 'text-orange-600',
    },
  ];

  const nonReturnableItems = [
    'Customized or personalized laptops',
    'Items damaged by misuse or normal wear',
    'Software licenses (once activated)',
    'Items returned without original packaging',
  ];

  const refundMethods = [
    'Original payment method (credit/debit card)',
    'Store credit (with 10% bonus)',
    'Bank transfer (for large purchases)',
    'PayPal (if original payment was via PayPal)',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
        <p className="text-lg text-gray-600">
          Easy returns and fast refunds. Your satisfaction is our priority.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'policy'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Return Policy
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'process'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Return Process
          </button>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'status'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Check Status
          </button>
        </div>
      </div>

      {activeTab === 'policy' && (
        <div className="space-y-8">
          {/* Policy Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <Icon className={`${point.color} mb-4`} size={32} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600 text-sm">{point.description}</p>
                </div>
              );
            })}
          </div>

          {/* Detailed Policy */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Can Be Returned</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">New, Unopened Items</h4>
                    <p className="text-gray-600 text-sm">Full refund within 30 days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Defective Products</h4>
                    <p className="text-gray-600 text-sm">Free return shipping included</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Wrong Item Received</h4>
                    <p className="text-gray-600 text-sm">We'll cover all return costs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-gray-900">Opened Items (Restocking Fee)</h4>
                    <p className="text-gray-600 text-sm">15% restocking fee may apply</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Non-Returnable Items</h2>
              <div className="space-y-4">
                {nonReturnableItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle className="text-red-500 mt-1" size={20} />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Important Note</h4>
                <p className="text-yellow-700 text-sm">
                  Restocking fees may apply to opened electronics. Contact us before returning to confirm eligibility.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Methods */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {refundMethods.map((method, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p className="text-gray-700 text-sm">{method}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'process' && (
        <div className="space-y-8">
          {/* Return Process Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How to Return Your Item</h2>
            <div className="space-y-8">
              {returnSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === returnSteps.length - 1;
                return (
                  <div key={step.step} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold">
                          <Icon size={20} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Step {step.step}: {step.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        <p className="text-sm text-gray-500">{step.details}</p>
                      </div>
                    </div>
                    {!isLast && (
                      <div className="absolute left-6 top-16 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Return Form */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Start Your Return</h3>
            <p className="text-gray-600 mb-6">
              Ready to return an item? Fill out our quick form to get started.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2">
              <span>Initiate Return</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="space-y-8">
          {/* Status Checker */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Return Status</h2>
            <div className="max-w-md">
              <label htmlFor="rma" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your RMA Number
              </label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  id="rma"
                  placeholder="e.g., RMA-2024-001234"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Check Status
                </button>
              </div>
            </div>
          </div>

          {/* Sample Status Display */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Sample Return Status</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="text-green-500" size={24} />
                <div>
                  <h4 className="font-medium text-gray-900">Return Approved</h4>
                  <p className="text-sm text-gray-600">RMA #RMA-2024-001234 • Approved on Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Package className="text-blue-500" size={24} />
                <div>
                  <h4 className="font-medium text-gray-900">Item Received</h4>
                  <p className="text-sm text-gray-600">Received at our facility on Jan 18, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="text-yellow-500" size={24} />
                <div>
                  <h4 className="font-medium text-gray-900">Processing Refund</h4>
                  <p className="text-sm text-gray-600">Refund will be processed within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnsRefunds;