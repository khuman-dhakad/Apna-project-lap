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
    seller: {
      name: 'Sarah Johnson',
      rating: 4.9,
      reviews: 45
    },
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
    seller: {
      name: 'Mike Chen',
      rating: 4.7,
      reviews: 32
    },
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
    seller: {
      name: 'David Park',
      rating: 4.8,
      reviews: 28
    },
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
    seller: {
      name: 'Emma Rodriguez',
      rating: 4.9,
      reviews: 52
    },
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
    seller: {
      name: 'Alex Turner',
      rating: 4.6,
      reviews: 19
    },
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
    seller: {
      name: 'Jessica Kim',
      rating: 4.8,
      reviews: 41
    },
    location: 'Portland, OR',
    features: ['Alcantara Fabric', 'PixelSense Display', 'Omnisonic Speakers', 'Fast Charging'],
    isVerified: true,
    createdAt: '2024-01-01'
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    isSeller: false,
    verified: true,
    joinedAt: '2023-01-15',
    preferences: {
      currency: 'USD',
      notifications: true,
      newsletter: true,
      theme: 'light'
    }
  },
  {
    id: 'user2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    isSeller: true,
    verified: true,
    joinedAt: '2022-08-20',
    preferences: {
      currency: 'USD',
      notifications: true,
      newsletter: false,
      theme: 'light'
    }
  }
];

export const mockProducts = [
  {
    id: '1',
    name: 'MacBook Pro 13" M1 (2021)',
    brand: 'Apple',
    model: 'MacBook Pro',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    grade: 'Grade A',
    condition: 'Excellent condition with minimal signs of use. Original packaging included.',
    description: 'This MacBook Pro features the revolutionary M1 chip for incredible performance and all-day battery life. Perfect for professionals and creatives who need reliable, powerful computing on the go.',
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Apple M1 Chip (8-core CPU)',
      ram: '8GB',
      storage: '256GB SSD',
      graphics: 'Apple M1 GPU (8-core)',
      display: '13.3" Retina (2560x1600)',
      batteryHealth: 92,
      os: 'macOS Monterey',
      ports: ['2x Thunderbolt 3', '3.5mm headphone jack'],
      weight: '3.0 lbs',
      dimensions: '11.97 x 8.36 x 0.61 inches'
    },
    seller: {
      id: 'seller1',
      name: 'TechRefurb Pro',
      rating: 4.8,
      verified: true,
      totalSales: 1247,
      responseTime: '< 2 hours'
    },
    rating: 4.7,
    reviewCount: 124,
    warranty: {
      duration: '6 months',
      type: 'Full coverage',
      coverage: ['Hardware defects', 'Battery replacement', 'Screen repair']
    },
    shipping: {
      free: true,
      days: '2-3 days'
    },
    inStock: true,
    stockCount: 3,
    featured: true,
    createdAt: '2024-01-15',
    category: 'Ultrabook',
    tags: ['M1', 'Retina', 'Professional', 'Creative']
  },
  {
    id: '2',
    name: 'ThinkPad X1 Carbon Gen 9',
    brand: 'Lenovo',
    model: 'ThinkPad X1 Carbon',
    price: 749,
    originalPrice: 1199,
    discount: 38,
    grade: 'Certified Refurbished',
    condition: 'Professionally refurbished with new battery and thorough testing.',
    description: 'The ultimate business laptop with legendary ThinkPad durability, security features, and the iconic keyboard that professionals love.',
    images: [
      'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Intel Core i7-1165G7',
      ram: '16GB',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe Graphics',
      display: '14" WQHD (2560x1440)',
      batteryHealth: 100,
      os: 'Windows 11 Pro',
      ports: ['2x Thunderbolt 4', '2x USB-A 3.2', 'HDMI 2.0', '3.5mm audio'],
      weight: '2.49 lbs',
      dimensions: '12.38 x 8.76 x 0.59 inches'
    },
    seller: {
      id: 'seller2',
      name: 'Enterprise Refurb',
      rating: 4.9,
      verified: true,
      totalSales: 2156,
      responseTime: '< 1 hour'
    },
    rating: 4.6,
    reviewCount: 89,
    warranty: {
      duration: '12 months',
      type: 'Manufacturer warranty',
      coverage: ['Full hardware coverage', 'On-site service', 'Accidental damage']
    },
    shipping: {
      free: true,
      days: '1-2 days'
    },
    inStock: true,
    stockCount: 7,
    featured: true,
    createdAt: '2024-01-12',
    category: 'Business',
    tags: ['ThinkPad', 'Business', 'Security', 'Durable']
  },
  {
    id: '3',
    name: 'Dell XPS 13 (9310)',
    brand: 'Dell',
    model: 'XPS 13',
    price: 599,
    originalPrice: 999,
    discount: 40,
    grade: 'Grade B',
    condition: 'Good condition with light wear on corners. Fully functional.',
    description: 'Compact powerhouse with stunning InfinityEdge display and premium build quality. Perfect for students and professionals.',
    images: [
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Intel Core i5-1135G7',
      ram: '8GB',
      storage: '256GB SSD',
      graphics: 'Intel Iris Xe Graphics',
      display: '13.4" FHD+ (1920x1200)',
      batteryHealth: 85,
      os: 'Windows 11 Home',
      ports: ['2x Thunderbolt 4', '1x USB-C 3.2', '3.5mm headphone/mic'],
      weight: '2.64 lbs',
      dimensions: '11.64 x 7.82 x 0.58 inches'
    },
    seller: {
      id: 'seller3',
      name: 'Laptop Solutions',
      rating: 4.5,
      verified: true,
      totalSales: 892,
      responseTime: '< 4 hours'
    },
    rating: 4.4,
    reviewCount: 67,
    warranty: {
      duration: '3 months',
      type: 'Limited warranty',
      coverage: ['Hardware defects', 'Basic support']
    },
    shipping: {
      free: false,
      days: '3-5 days',
      cost: 15
    },
    inStock: true,
    stockCount: 2,
    featured: false,
    createdAt: '2024-01-10',
    category: 'Ultrabook',
    tags: ['Compact', 'Student', 'Portable']
  },
  {
    id: '4',
    name: 'HP EliteBook 840 G8',
    brand: 'HP',
    model: 'EliteBook 840',
    price: 679,
    originalPrice: 1099,
    discount: 38,
    grade: 'Like New',
    condition: 'Pristine condition, barely used. Includes original accessories.',
    description: 'Enterprise-grade laptop with advanced security features and exceptional build quality for business professionals.',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Intel Core i5-1135G7',
      ram: '16GB',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe Graphics',
      display: '14" FHD (1920x1080)',
      batteryHealth: 96,
      os: 'Windows 11 Pro',
      ports: ['2x USB-A 3.2', '2x USB-C', 'HDMI 1.4', 'RJ45', '3.5mm audio'],
      weight: '3.17 lbs',
      dimensions: '12.71 x 8.46 x 0.71 inches'
    },
    seller: {
      id: 'seller1',
      name: 'TechRefurb Pro',
      rating: 4.8,
      verified: true,
      totalSales: 1247,
      responseTime: '< 2 hours'
    },
    rating: 4.8,
    reviewCount: 45,
    warranty: {
      duration: '9 months',
      type: 'Extended warranty',
      coverage: ['Full hardware coverage', 'Software support', 'Remote assistance']
    },
    shipping: {
      free: true,
      days: '2-3 days'
    },
    inStock: true,
    stockCount: 5,
    featured: true,
    createdAt: '2024-01-08',
    category: 'Business',
    tags: ['Enterprise', 'Security', 'Professional']
  },
  {
    id: '5',
    name: 'Surface Laptop 4',
    brand: 'Microsoft',
    model: 'Surface Laptop 4',
    price: 549,
    originalPrice: 899,
    discount: 39,
    grade: 'Grade A',
    condition: 'Excellent condition with original charger and documentation.',
    description: 'Sleek and powerful laptop with premium Alcantara keyboard and vibrant PixelSense touchscreen display.',
    images: [
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'AMD Ryzen 5 4680U',
      ram: '8GB',
      storage: '256GB SSD',
      graphics: 'AMD Radeon Graphics',
      display: '13.5" PixelSense (2256x1504)',
      batteryHealth: 88,
      os: 'Windows 11 Home',
      ports: ['1x USB-A 3.1', '1x USB-C', 'Surface Connect', '3.5mm headphone'],
      weight: '2.79 lbs',
      dimensions: '12.1 x 8.8 x 0.57 inches'
    },
    seller: {
      id: 'seller2',
      name: 'Enterprise Refurb',
      rating: 4.9,
      verified: true,
      totalSales: 2156,
      responseTime: '< 1 hour'
    },
    rating: 4.5,
    reviewCount: 78,
    warranty: {
      duration: '6 months',
      type: 'Full coverage',
      coverage: ['Hardware defects', 'Screen replacement', 'Battery service']
    },
    shipping: {
      free: true,
      days: '1-2 days'
    },
    inStock: true,
    stockCount: 4,
    featured: false,
    createdAt: '2024-01-05',
    category: 'Creative',
    tags: ['Touchscreen', 'Creative', 'Premium']
  },
  {
    id: '6',
    name: 'ASUS ZenBook 14',
    brand: 'ASUS',
    model: 'ZenBook 14',
    price: 499,
    originalPrice: 799,
    discount: 38,
    grade: 'Grade B',
    condition: 'Good working condition with minor scratches on lid.',
    description: 'Compact and lightweight laptop with excellent performance for everyday computing and light creative work.',
    images: [
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Intel Core i5-1135G7',
      ram: '8GB',
      storage: '512GB SSD',
      graphics: 'Intel Iris Xe Graphics',
      display: '14" FHD (1920x1080)',
      batteryHealth: 82,
      os: 'Windows 11 Home',
      ports: ['1x USB-A 3.2', '2x USB-C', 'HDMI 1.4', 'MicroSD', '3.5mm audio'],
      weight: '3.17 lbs',
      dimensions: '12.65 x 8.15 x 0.65 inches'
    },
    seller: {
      id: 'seller3',
      name: 'Laptop Solutions',
      rating: 4.5,
      verified: true,
      totalSales: 892,
      responseTime: '< 4 hours'
    },
    rating: 4.2,
    reviewCount: 34,
    warranty: {
      duration: '3 months',
      type: 'Limited warranty',
      coverage: ['Hardware defects', 'Basic support']
    },
    shipping: {
      free: false,
      days: '3-5 days',
      cost: 12
    },
    inStock: false,
    stockCount: 0,
    featured: false,
    createdAt: '2024-01-03',
    category: 'Ultrabook',
    tags: ['Lightweight', 'Budget', 'Everyday']
  },
  {
    id: '7',
    name: 'MacBook Air M2 (2022)',
    brand: 'Apple',
    model: 'MacBook Air',
    price: 1099,
    originalPrice: 1399,
    discount: 21,
    grade: 'Like New',
    condition: 'Pristine condition with original packaging and all accessories.',
    description: 'The latest MacBook Air with M2 chip delivers incredible performance in an ultra-thin design with all-day battery life.',
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'Apple M2 Chip (8-core CPU)',
      ram: '8GB',
      storage: '256GB SSD',
      graphics: 'Apple M2 GPU (8-core)',
      display: '13.6" Liquid Retina (2560x1664)',
      batteryHealth: 98,
      os: 'macOS Ventura',
      ports: ['2x Thunderbolt 4', '3.5mm headphone jack', 'MagSafe 3'],
      weight: '2.7 lbs',
      dimensions: '11.97 x 8.46 x 0.44 inches'
    },
    seller: {
      id: 'seller1',
      name: 'TechRefurb Pro',
      rating: 4.8,
      verified: true,
      totalSales: 1247,
      responseTime: '< 2 hours'
    },
    rating: 4.9,
    reviewCount: 156,
    warranty: {
      duration: '12 months',
      type: 'AppleCare equivalent',
      coverage: ['Hardware defects', 'Battery replacement', 'Accidental damage']
    },
    shipping: {
      free: true,
      days: '1-2 days'
    },
    inStock: true,
    stockCount: 2,
    featured: true,
    createdAt: '2024-01-20',
    category: 'Ultrabook',
    tags: ['M2', 'Latest', 'Premium', 'Ultra-thin']
  },
  {
    id: '8',
    name: 'Gaming Laptop - ASUS ROG Strix',
    brand: 'ASUS',
    model: 'ROG Strix G15',
    price: 899,
    originalPrice: 1299,
    discount: 31,
    grade: 'Grade A',
    condition: 'Excellent gaming condition with RGB lighting fully functional.',
    description: 'High-performance gaming laptop with dedicated graphics and advanced cooling system for intense gaming sessions.',
    images: [
      'https://images.pexels.com/photos/577210/pexels-photo-577210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    specifications: {
      processor: 'AMD Ryzen 7 5800H',
      ram: '16GB',
      storage: '512GB SSD',
      graphics: 'NVIDIA RTX 3060 6GB',
      display: '15.6" FHD 144Hz (1920x1080)',
      batteryHealth: 89,
      os: 'Windows 11 Home',
      ports: ['3x USB-A 3.2', '1x USB-C', 'HDMI 2.0', 'RJ45', '3.5mm audio'],
      weight: '5.07 lbs',
      dimensions: '14.2 x 10.8 x 1.07 inches'
    },
    seller: {
      id: 'seller2',
      name: 'Enterprise Refurb',
      rating: 4.9,
      verified: true,
      totalSales: 2156,
      responseTime: '< 1 hour'
    },
    rating: 4.6,
    reviewCount: 92,
    warranty: {
      duration: '6 months',
      type: 'Gaming warranty',
      coverage: ['Hardware defects', 'GPU coverage', 'Cooling system']
    },
    shipping: {
      free: true,
      days: '2-3 days'
    },
    inStock: true,
    stockCount: 3,
    featured: true,
    createdAt: '2024-01-18',
    category: 'Gaming',
    tags: ['Gaming', 'RTX', 'High-performance', 'RGB']
  }
];

export const mockReviews = [
  {
    id: 'review1',
    userId: 'user1',
    userName: 'John Doe',
    userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    productId: '1',
    rating: 5,
    title: 'Excellent MacBook Pro!',
    content: 'This MacBook Pro exceeded my expectations. The M1 chip is incredibly fast and the battery life is amazing. Perfect for my development work.',
    images: [],
    verified: true,
    helpful: 23,
    createdAt: '2024-01-20',
    pros: ['Fast M1 chip', 'Great battery life', 'Excellent condition'],
    cons: ['Price could be lower']
  },
  {
    id: 'review2',
    userId: 'user2',
    userName: 'Sarah Wilson',
    userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    productId: '2',
    rating: 4,
    title: 'Great business laptop',
    content: 'The ThinkPad is perfect for business use. Keyboard is fantastic and build quality is solid. Minor wear but functions perfectly.',
    images: [],
    verified: true,
    helpful: 15,
    createdAt: '2024-01-18',
    pros: ['Great keyboard', 'Solid build', 'Good performance'],
    cons: ['Slightly heavy', 'Fan can be noisy']
  }
];

export const mockOrders = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        addedAt: '2024-01-15'
      }
    ],
    total: 899,
    status: 'delivered',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: '2024-01-15',
    trackingNumber: 'TRK123456789'
  }
];

export const mockNotifications = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your MacBook Pro has been delivered successfully!',
    read: false,
    createdAt: '2024-01-20'
  },
  {
    id: 'notif2',
    userId: 'user1',
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 20% off on your next purchase. Limited time offer!',
    read: false,
    createdAt: '2024-01-19'
  }
];