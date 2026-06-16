import React, { useState } from 'react';
import { Shield, FileText, PenTool as Tools, Clock, CheckCircle, AlertCircle, Calendar, Award } from 'lucide-react';

const Warranty = () => {
  const [activeTab, setActiveTab] = useState('coverage');
  const [registrationForm, setRegistrationForm] = useState({
    orderNumber: '',
    serialNumber: '',
    purchaseDate: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const warrantyTypes = [
    {
      name: 'Standard Warranty',
      duration: '1 Year',
      coverage: 'Manufacturing defects and hardware failures',
      color: 'bg-blue-500',
      icon: Shield,
      features: [
        'Hardware defect coverage',
        'Free repair or replacement',
        'Technical support included',
        'Parts and labor covered'
      ],
    },
    {
      name: 'Extended Protection',
      duration: '2-3 Years',
      coverage: 'Comprehensive coverage including accidental damage',
      color: 'bg-green-500',
      icon: Award,
      features: [
        'Accidental damage protection',
        'Liquid spill coverage',
        'Drop and impact protection',
        'Battery replacement included'
      ],
    },
    {
      name: 'Premium Care',
      duration: 'Up to 4 Years',
      coverage: 'Ultimate protection with priority service',
      color: 'bg-purple-500',
      icon: Tools,
      features: [
        'On-site repair service',
        'Priority technical support',
        'Loaner device available',
        'Software support included'
      ],
    },
  ];

  const commonIssues = [
    {
      issue: 'Screen/Display Problems',
      covered: true,
      description: 'Dead pixels, backlight issues, screen cracks (manufacturing defects)',
    },
    {
      issue: 'Keyboard/Trackpad Issues',
      covered: true,
      description: 'Key sticking, trackpad not responding (not physical damage)',
    },
    {
      issue: 'Battery Problems',
      covered: true,
      description: 'Battery not holding charge, power issues (within warranty period)',
    },
    {
      issue: 'Hard Drive Failure',
      covered: true,
      description: 'Hardware failure of storage devices (data recovery not included)',
    },
    {
      issue: 'Physical Damage',
      covered: false,
      description: 'Drops, spills, physical abuse (requires extended protection plan)',
    },
    {
      issue: 'Software Issues',
      covered: false,
      description: 'Operating system problems, virus/malware (not hardware related)',
    },
  ];

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    console.log('Registration submitted:', registrationForm);
  };

  const handleRegistrationChange = (e) => {
    setRegistrationForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Warranty & Protection</h1>
        <p className="text-lg text-gray-600">
          Comprehensive warranty coverage and protection plans for your laptop investment
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('coverage')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'coverage'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Coverage Details
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'register'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Register Product
          </button>
          <button
            onClick={() => setActiveTab('claim')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'claim'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            File Claim
          </button>
        </div>
      </div>

      {activeTab === 'coverage' && (
        <div className="space-y-8">
          {/* Warranty Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warrantyTypes.map((warranty, index) => {
              const Icon = warranty.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className={`${warranty.color} text-white p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{warranty.name}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{warranty.duration}</p>
                  <p className="text-gray-600 mb-4 text-sm">{warranty.coverage}</p>

                  <div className="space-y-2">
                    {warranty.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coverage Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Covered vs. Not Covered</h2>
            <div className="space-y-4">
              {commonIssues.map((item, index) => (
                <div key={index} className={`p-4 border rounded-lg ${
                  item.covered
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    {item.covered ? (
                      <CheckCircle className="text-green-500 mt-1" size={20} />
                    ) : (
                      <AlertCircle className="text-red-500 mt-1" size={20} />
                    )}
                    <div className="flex-1">
                      <h4 className={`font-medium mb-1 ${
                        item.covered ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {item.issue}
                      </h4>
                      <p className={`text-sm ${
                        item.covered ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.covered
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.covered ? 'Covered' : 'Not Covered'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warranty Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Warranty Period
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700"><strong>Starts:</strong> Date of original purchase</p>
                <p className="text-gray-700"><strong>Duration:</strong> 12 months standard coverage</p>
                <p className="text-gray-700"><strong>Extension:</strong> Additional protection plans available</p>
                <p className="text-gray-700"><strong>Transfer:</strong> Non-transferable to new owners</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="mr-2" size={20} />
                Important Notes
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700">• Register within 30 days for full coverage</p>
                <p className="text-gray-700">• Keep original receipt as proof of purchase</p>
                <p className="text-gray-700">• Unauthorized repairs void warranty</p>
                <p className="text-gray-700">• Data backup not included in service</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'register' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Register Your Product</h2>
            <p className="text-gray-600 mb-8">
              Register your laptop to activate warranty coverage and receive important updates.
            </p>

            <form onSubmit={handleRegistrationSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    required
                    value={registrationForm.orderNumber}
                    onChange={handleRegistrationChange}
                    placeholder="TL-2024-001234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Serial Number *
                  </label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    required
                    value={registrationForm.serialNumber}
                    onChange={handleRegistrationChange}
                    placeholder="Found on bottom of laptop"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date *
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  required
                  value={registrationForm.purchaseDate}
                  onChange={handleRegistrationChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={registrationForm.firstName}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={registrationForm.lastName}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={registrationForm.email}
                  onChange={handleRegistrationChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Registration Benefits</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Faster warranty claim processing</li>
                  <li>• Product recall notifications</li>
                  <li>• Software update alerts</li>
                  <li>• Exclusive customer support</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar size={18} />
                <span>Register Product</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'claim' && (
        <div className="space-y-8">
          {/* Claim Process */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How to File a Warranty Claim</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Gather Information',
                  description: 'Order number, serial number, and problem description',
                },
                {
                  step: 2,
                  title: 'Contact Support',
                  description: 'Reach out via phone, email, or online form',
                },
                {
                  step: 3,
                  title: 'Troubleshooting',
                  description: 'Work with our technicians to diagnose the issue',
                },
                {
                  step: 4,
                  title: 'Resolution',
                  description: 'Repair, replacement, or refund based on issue',
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Claim Form */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Start Your Warranty Claim</h3>
            <p className="text-gray-600 mb-6">
              Ready to file a warranty claim? Our support team will guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Start Online Claim
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Call Support: (555) 123-4567
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Warranty Claim FAQ</h3>
            <div className="space-y-4">
              {[
                {
                  question: 'How long does a warranty claim take?',
                  answer: 'Most claims are processed within 3-5 business days. Complex issues may take longer.',
                },
                {
                  question: 'Will I get the same model as a replacement?',
                  answer: "We try to provide the same model. If unavailable, we'll offer a comparable or better model.",
                },
                {
                  question: 'Do I need to pay for shipping?',
                  answer: 'No, we provide prepaid shipping labels for all warranty claims.',
                },
                {
                  question: 'What if my laptop is out of warranty?',
                  answer: 'We offer repair services at competitive rates. Extended warranties may also be available.',
                },
              ].map((faq, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warranty;