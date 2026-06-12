/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 * @property {string} addedAt
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number} originalPrice
 * @property {number} discount
 * @property {'Grade A'|'Grade B'|'Certified Refurbished'|'Like New'} grade
 * @property {string} condition
 * @property {string[]} images
 * @property {{ processor: string, ram: string, storage: string, graphics: string, display: string, batteryHealth: number, os: string, ports: string[], weight: string, dimensions: string }} specifications
 * @property {{ id: string, name: string, rating: number, verified: boolean, totalSales: number, responseTime: string }} seller
 * @property {number} rating
 * @property {number} reviewCount
 * @property {{ duration: string, type: string, coverage: string[] }} warranty
 * @property {{ free: boolean, days: string, cost?: number }} shipping
 * @property {boolean} inStock
 * @property {number} stockCount
 * @property {boolean} featured
 * @property {string} createdAt
 * @property {string} category
 * @property {string[]} tags
 * @property {string} description
 */

/**
 * @typedef {Object} Address
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {string} country
 */

/**
 * @typedef {Object} UserPreferences
 * @property {string} currency
 * @property {boolean} notifications
 * @property {boolean} newsletter
 * @property {'light'|'dark'} theme
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {boolean} isSeller
 * @property {boolean} verified
 * @property {string} joinedAt
 * @property {Address} [address]
 * @property {UserPreferences} preferences
 */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} userId
 * @property {string} userName
 * @property {string} [userAvatar]
 * @property {string} productId
 * @property {number} rating
 * @property {string} title
 * @property {string} content
 * @property {string[]} [images]
 * @property {boolean} verified
 * @property {number} helpful
 * @property {string} createdAt
 * @property {string[]} pros
 * @property {string[]} cons
 */

/**
 * @typedef {Object} FilterState
 * @property {string[]} brands
 * @property {[number, number]} priceRange
 * @property {string[]} grades
 * @property {string[]} processors
 * @property {string[]} ramSizes
 * @property {string[]} storageTypes
 * @property {number} minRating
 * @property {boolean} inStockOnly
 * @property {string[]} categories
 * @property {number} batteryHealth
 * @property {'featured'|'price-low'|'price-high'|'rating'|'newest'} sortBy
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {number} total
 * @property {'pending'|'confirmed'|'shipped'|'delivered'|'cancelled'} status
 * @property {Address} shippingAddress
 * @property {string} paymentMethod
 * @property {string} createdAt
 * @property {string} [trackingNumber]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} userId
 * @property {'order'|'promotion'|'system'} type
 * @property {string} title
 * @property {string} message
 * @property {boolean} read
 * @property {string} createdAt
 */

/**
 * @typedef {Object} AppState
 * @property {Product[]} products
 * @property {CartItem[]} cart
 * @property {User|null} user
 * @property {FilterState} filters
 * @property {string} searchQuery
 * @property {boolean} isLoading
 * @property {Order[]} orders
 * @property {Notification[]} notifications
 * @property {string[]} wishlist
 * @property {string[]} compareList
 * @property {number} currentPage
 * @property {number} itemsPerPage
 * @property {boolean} isAuthenticated
 */

/**
 * @typedef {Object} Laptop
 * @property {string} id
 * @property {string} title
 * @property {string} brand
 * @property {string} model
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {'Excellent'|'Good'|'Fair'} condition
 * @property {number} year
 * @property {string} processor
 * @property {string} ram
 * @property {string} storage
 * @property {string} graphics
 * @property {string} screenSize
 * @property {string[]} images
 * @property {string} description
 * @property {{ name: string, rating: number, reviews: number }} seller
 * @property {string} location
 * @property {string[]} features
 * @property {boolean} isVerified
 * @property {string} createdAt
 */

export const laptops = [
  {
    id: '1',
    title: 'MacBook Pro 13" M1 - Excellent Condition',
    brand: 'Apple',
    model: 'MacBook Pro 13"',
    price: 899,
    originalPrice: 1299,
    condition: 'Excellent',
    year: 2021,
    processor: 'Apple M1',
    ram: '8GB',
    storage: '256GB SSD',
    graphics: 'Apple M1 8-core GPU',
    screenSize: '13.3"',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Barely used MacBook Pro in excellent condition. Perfect for students and professionals. All original accessories included.',
    seller: { name: 'Sarah Johnson', rating: 4.9, reviews: 45 },
    location: 'San Francisco, CA',
    features: ['Touch Bar', 'Touch ID', 'Backlit Keyboard', 'Force Touch Trackpad'],
    isVerified: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Dell XPS 15 - Gaming Ready',
    brand: 'Dell',
    model: 'XPS 15',
    price: 1299,
    originalPrice: 1899,
    condition: 'Good',
    year: 2022,
    processor: 'Intel Core i7-12700H',
    ram: '16GB',
    storage: '512GB SSD',
    graphics: 'NVIDIA RTX 3050 Ti',
    screenSize: '15.6"',
    images: [
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4050297/pexels-photo-4050297.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Powerful laptop perfect for gaming and creative work. Minor wear on corners but fully functional.',
    seller: { name: 'Mike Chen', rating: 4.7, reviews: 32 },
    location: 'Austin, TX',
    features: ['4K Display', 'Thunderbolt 4', 'Wi-Fi 6E', 'Fingerprint Reader'],
    isVerified: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'ThinkPad X1 Carbon - Business Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon',
    price: 749,
    originalPrice: 1199,
    condition: 'Good',
    year: 2021,
    processor: 'Intel Core i5-1135G7',
    ram: '8GB',
    storage: '256GB SSD',
    graphics: 'Intel Iris Xe',
    screenSize: '14"',
    images: [
      'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Ultra-lightweight business laptop with excellent keyboard. Some minor scratches but great performance.',
    seller: { name: 'David Park', rating: 4.8, reviews: 28 },
    location: 'Seattle, WA',
    features: ['Carbon Fiber Body', 'TrackPoint', 'Rapid Charge', 'Dolby Atmos'],
    isVerified: false,
    createdAt: '2024-01-08'
  },
  {
    id: '4',
    title: 'HP Spectre x360 - 2-in-1 Convertible',
    brand: 'HP',
    model: 'Spectre x360',
    price: 999,
    originalPrice: 1399,
    condition: 'Excellent',
    year: 2022,
    processor: 'Intel Core i7-1255U',
    ram: '16GB',
    storage: '512GB SSD',
    graphics: 'Intel Iris Xe',
    screenSize: '13.5"',
    images: [
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Versatile 2-in-1 laptop with touchscreen. Includes HP Pen. Perfect for creative professionals.',
    seller: { name: 'Emma Rodriguez', rating: 4.9, reviews: 52 },
    location: 'Miami, FL',
    features: ['360° Hinge', 'Touchscreen', 'HP Pen Included', 'Bang & Olufsen Audio'],
    isVerified: true,
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    title: 'ASUS ROG Strix - Gaming Beast',
    brand: 'ASUS',
    model: 'ROG Strix G15',
    price: 1199,
    originalPrice: 1699,
    condition: 'Good',
    year: 2022,
    processor: 'AMD Ryzen 7 5800H',
    ram: '16GB',
    storage: '1TB SSD',
    graphics: 'NVIDIA RTX 3060',
    screenSize: '15.6"',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3765871/pexels-photo-3765871.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'High-performance gaming laptop with RGB lighting. Some wear on WASD keys but excellent gaming performance.',
    seller: { name: 'Alex Turner', rating: 4.6, reviews: 19 },
    location: 'Phoenix, AZ',
    features: ['144Hz Display', 'RGB Keyboard', 'Advanced Cooling', 'Aura Sync'],
    isVerified: true,
    createdAt: '2024-01-03'
  },
  {
    id: '6',
    title: 'Surface Laptop 4 - Sleek and Portable',
    brand: 'Microsoft',
    model: 'Surface Laptop 4',
    price: 849,
    originalPrice: 1299,
    condition: 'Excellent',
    year: 2021,
    processor: 'AMD Ryzen 5 4680U',
    ram: '8GB',
    storage: '256GB SSD',
    graphics: 'AMD Radeon Graphics',
    screenSize: '13.5"',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful laptop with premium build quality. Alcantara keyboard deck feels amazing.',
    seller: { name: 'Jessica Kim', rating: 4.8, reviews: 41 },
    location: 'Portland, OR',
    features: ['Alcantara Fabric', 'PixelSense Display', 'Omnisonic Speakers', 'Fast Charging'],
    isVerified: true,
    createdAt: '2024-01-01'
  }
];