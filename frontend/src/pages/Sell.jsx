import { useState } from 'react';
import { Upload, Camera, X, DollarSign, Check, ChevronLeft, ChevronRight } from 'lucide-react';
// import { db } from "../firebaseconfig";
// import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Sell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: '',
    condition: '',
    price: '',
    originalPrice: '',
    processor: '',
    ram: '',
    storage: '',
    graphics: '',
    screenSize: '',
    description: '',
    location: '',
    features: [],
    images: []
  });

  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureAdd = (feature) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
    }
  };

  const handleFeatureRemove = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (files) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert('Please select only image files');
        return false;
      }
      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target?.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return !!(formData.title && formData.brand && formData.model && formData.year && formData.condition && formData.location);
      case 2:
        return !!(formData.processor && formData.ram && formData.storage && formData.screenSize);
      case 3:
        return !!(formData.price && formData.description && formData.images.length >= 3);
      case 4:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert('Please fill in all required fields before proceeding.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(4)) {
      alert('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "listings"), {
        ...formData,
        createdAt: Timestamp.now(),
        status: 'active'
      });
      alert('Laptop listing submitted successfully!');
      // Reset form
      setFormData({
        title: '',
        brand: '',
        model: '',
        year: '',
        condition: '',
        price: '',
        originalPrice: '',
        processor: '',
        ram: '',
        storage: '',
        graphics: '',
        screenSize: '',
        description: '',
        location: '',
        features: [],
        images: []
      });
      setCurrentStep(1);
    } catch (error) {
      alert('Error submitting listing: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commonFeatures = [
    'Backlit Keyboard', 'Touchscreen', 'Fingerprint Reader', 'Webcam',
    'Bluetooth', 'Wi-Fi 6', 'USB-C', 'HDMI Port', 'SD Card Reader',
    'Thunderbolt', 'Fast Charging', 'Gaming Ready', 'Business Grade'
  ];

  const stepTitles = ['Basic Info', 'Specifications', 'Details & Photos', 'Review & Publish'];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Sell Your Laptop</h1>
          <p className="text-gray-600 text-sm sm:text-base">List your laptop and reach thousands of potential buyers</p>
        </div>

        {/* Progress Steps - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          {/* Desktop Progress */}
          <div className="hidden md:flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                <div className={`text-sm font-medium ml-2 transition-all ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepTitles[step - 1]}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-0.5 mx-4 transition-all ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
              <span className="text-sm font-medium text-blue-600">{stepTitles[currentStep - 1]}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 sm:mb-6">Basic Information</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., MacBook Pro 13' M1 - Excellent Condition"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand *
                    </label>
                    <select
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Brand</option>
                      <option value="Apple">Apple</option>
                      <option value="Dell">Dell</option>
                      <option value="HP">HP</option>
                      <option value="Lenovo">Lenovo</option>
                      <option value="ASUS">ASUS</option>
                      <option value="Acer">Acer</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Model *
                    </label>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="e.g., MacBook Pro 13'"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year *
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition *
                    </label>
                    <select
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Condition</option>
                      <option value="Excellent">Excellent - Like new, no visible wear</option>
                      <option value="Good">Good - Minor signs of use</option>
                      <option value="Fair">Fair - Noticeable wear but fully functional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., San Francisco, CA"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 sm:mb-6">Technical Specifications</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processor *
                    </label>
                    <input
                      type="text"
                      name="processor"
                      value={formData.processor}
                      onChange={handleInputChange}
                      placeholder="e.g., Apple M1, Intel Core i7-1165G7"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RAM *
                    </label>
                    <select
                      name="ram"
                      value={formData.ram}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select RAM</option>
                      <option value="4GB">4GB</option>
                      <option value="8GB">8GB</option>
                      <option value="16GB">16GB</option>
                      <option value="32GB">32GB</option>
                      <option value="64GB">64GB</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Storage *
                    </label>
                    <input
                      type="text"
                      name="storage"
                      value={formData.storage}
                      onChange={handleInputChange}
                      placeholder="e.g., 256GB SSD, 1TB HDD"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Graphics Card
                    </label>
                    <input
                      type="text"
                      name="graphics"
                      value={formData.graphics}
                      onChange={handleInputChange}
                      placeholder="e.g., Apple M1 GPU, NVIDIA RTX 3060"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Screen Size *
                    </label>
                    <select
                      name="screenSize"
                      value={formData.screenSize}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    >
                      <option value="">Select Screen Size</option>
                      <option value="11.6\">11.6</option>
                      <option value="13.3\">13.3</option>
                      <option value="14\">14</option>
                      <option value="15.6\">15.6</option>
                      <option value="16\">16</option>
                      <option value="17.3\">17.3</option>
                    </select>
                  </div>
                </div>

                {/* Features Selection */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Features (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {commonFeatures.map(feature => (
                      <label key={feature} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.features.includes(feature)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleFeatureAdd(feature);
                            } else {
                              handleFeatureRemove(feature);
                            }
                          }}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Details & Photos */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 sm:mb-6">Details & Photos</h2>
                
                {/* Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price * <DollarSign className="inline h-4 w-4" />
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="999"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Price (Optional)
                    </label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="1299"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe the condition, usage history, and any other relevant details..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photos * (Upload at least 3 photos)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      Drag and drop photos here, or click to select
                    </p>
                    <p className="text-xs text-gray-500 mb-4">Max 5MB per image</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block text-sm sm:text-base"
                    >
                      <Camera className="h-4 w-4 inline mr-2" />
                      Choose Photos
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 sm:h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {formData.images.length} photo(s) uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Publish */}
            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 sm:mb-6">Review Your Listing</h2>
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Title:</span> {formData.title}</p>
                        <p><span className="font-medium">Brand:</span> {formData.brand}</p>
                        <p><span className="font-medium">Model:</span> {formData.model}</p>
                        <p><span className="font-medium">Year:</span> {formData.year}</p>
                        <p><span className="font-medium">Condition:</span> {formData.condition}</p>
                        <p><span className="font-medium">Location:</span> {formData.location}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Processor:</span> {formData.processor}</p>
                        <p><span className="font-medium">RAM:</span> {formData.ram}</p>
                        <p><span className="font-medium">Storage:</span> {formData.storage}</p>
                        <p><span className="font-medium">Graphics:</span> {formData.graphics || 'Not specified'}</p>
                        <p><span className="font-medium">Screen Size:</span> {formData.screenSize}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-lg font-semibold mb-4">Pricing & Description</h3>
                      <p className="text-2xl font-bold text-green-600 mb-2">${formData.price}</p>
                      {formData.originalPrice && (
                        <p className="text-sm text-gray-500 mb-4">
                          Original Price: <span className="line-through">${formData.originalPrice}</span>
                        </p>
                      )}
                      <p className="text-sm text-gray-700 leading-relaxed">{formData.description}</p>
                    </div>
                    {formData.features.length > 0 && (
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map(feature => (
                            <span key={feature} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {formData.images.length > 0 && (
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4">Photos ({formData.images.length})</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                          {formData.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-16 sm:h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Before you publish:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Make sure all information is accurate</li>
                    <li>• Upload high-quality photos from multiple angles</li>
                    <li>• Set a competitive price based on market research</li>
                    <li>• Be honest about the condition and any defects</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm sm:text-base transition-all"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 sm:px-8 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;