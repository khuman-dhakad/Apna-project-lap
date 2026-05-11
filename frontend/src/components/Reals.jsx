import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Music, ChevronUp, ChevronDown, UserPlus, Play, Pause, Info, Shuffle, X, Send, UserMinus, Copy, Flag, UserX, Download } from 'lucide-react';

const Reals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [reels, setReels] = useState([
    {
      id: '1',
      user: {
        id: '1',
        username: 'tech_lover_raj',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      laptop: {
        brand: 'MacBook Pro',
        model: '16-inch M3 Max',
        price: '₹3,99,900',
        processor: 'Apple M3 Max chip',
        ram: '36GB Unified Memory',
        storage: '1TB SSD',
        graphics: '40-core GPU',
        display: '16.2-inch Liquid Retina XDR',
        image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2'
      },
      song: {
        title: 'Coding Vibes',
        artist: 'Lo-Fi Hip Hop',
        duration: '3:42',
        cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
      },
      caption: 'New MacBook Pro setup! Perfect for video editing 🔥 #MacBookPro #TechSetup #VideoEditing',
      likes: 15420,
      comments: 892,
      shares: 234,
      isLiked: false,
      isSaved: false,
      isFollowing: false,
      timeAgo: '2h',
      commentsList: [
        {
          id: '1',
          user: { id: '101', username: 'dev_priya', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', verified: false },
          text: 'Amazing setup! 🔥 Kitna cost aaya total?',
          timeAgo: '1h',
          likes: 23,
          isLiked: false
        },
        {
          id: '2',
          user: { id: '102', username: 'coder_sam', avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', verified: true },
          text: 'M3 Max is beast! Perfect for 4K editing',
          timeAgo: '45m',
          likes: 15,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      user: {
        id: '2',
        username: 'gaming_geek_priya',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: false
      },
      laptop: {
        brand: 'ASUS ROG',
        model: 'Strix G15 Gaming',
        price: '₹1,25,990',
        processor: 'AMD Ryzen 7 6800H',
        ram: '16GB DDR5',
        storage: '1TB NVMe SSD',
        graphics: 'NVIDIA RTX 3060',
        display: '15.6" FHD 144Hz',
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2'
      },
      song: {
        title: 'Game On',
        artist: 'Electronic Beats',
        duration: '4:15',
        cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
      },
      caption: 'Ultimate gaming setup! RTX 3060 चला रहा है सब कुछ smooth 🎮 #Gaming #ASUS #RTX3060',
      likes: 8765,
      comments: 456,
      shares: 123,
      isLiked: false,
      isSaved: false,
      isFollowing: false,
      timeAgo: '5h',
      commentsList: [
        {
          id: '3',
          user: { id: '103', username: 'gamer_boy', avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', verified: false },
          text: 'RTX 3060 mein kya FPS milta hai Cyberpunk mein?',
          timeAgo: '2h',
          likes: 8,
          isLiked: false
        }
      ]
    },
    {
      id: '3',
      user: {
        id: '3',
        username: 'designer_arjun',
        avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      laptop: {
        brand: 'Dell XPS',
        model: '13 Plus OLED',
        price: '₹1,89,990',
        processor: 'Intel Core i7-1360P',
        ram: '32GB LPDDR5',
        storage: '1TB PCIe SSD',
        graphics: 'Intel Iris Xe',
        display: '13.4" 3.5K OLED Touch',
        image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2'
      },
      song: {
        title: 'Creative Flow',
        artist: 'Ambient Sounds',
        duration: '5:28',
        cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
      },
      caption: 'Dell XPS with OLED display! Colors are just amazing for design work ✨ #DellXPS #OLED #Design',
      likes: 12330,
      comments: 678,
      shares: 289,
      isLiked: false,
      isSaved: false,
      isFollowing: false,
      timeAgo: '1d',
      commentsList: []
    },
    {
      id: '4',
      user: {
        id: '4',
        username: 'coder_neha',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: false
      },
      laptop: {
        brand: 'Lenovo ThinkPad',
        model: 'X1 Carbon Gen 11',
        price: '₹2,15,490',
        processor: 'Intel Core i7-1365U',
        ram: '32GB LPDDR5',
        storage: '1TB SSD',
        graphics: 'Intel Iris Xe',
        display: '14" WUXGA IPS',
        image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2'
      },
      song: {
        title: 'Focus Mode',
        artist: 'Study Beats',
        duration: '6:12',
        cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
      },
      caption: 'ThinkPad reliability! Perfect for coding marathons 💻 #ThinkPad #Coding #Productivity',
      likes: 9876,
      comments: 534,
      shares: 156,
      isLiked: false,
      isSaved: false,
      isFollowing: false,
      timeAgo: '2d',
      commentsList: []
    },
    {
      id: '5',
      user: {
        id: '5',
        username: 'content_creator_sam',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        verified: true
      },
      laptop: {
        brand: 'HP Spectre',
        model: 'x360 14 OLED',
        price: '₹1,68,999',
        processor: 'Intel Core i7-1355U',
        ram: '16GB LPDDR5',
        storage: '1TB PCIe SSD',
        graphics: 'Intel Iris Xe',
        display: '13.5" 3K2K OLED Touch',
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800&h=1200&dpr=2'
      },
      song: {
        title: 'Creative Energy',
        artist: 'Upbeat Mix',
        duration: '4:33',
        cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2'
      },
      caption: 'HP Spectre x360! Best 2-in-1 for content creation 🎨 #HPSpectre #ContentCreation #2in1',
      likes: 11245,
      comments: 723,
      shares: 198,
      isLiked: false,
      isSaved: false,
      isFollowing: false,
      timeAgo: '3d',
      commentsList: []
    }
  ]);

  const [showDetails, setShowDetails] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const [startY, setStartY] = useState(null);
  const [lastScroll, setLastScroll] = useState(0);
  const containerRef = useRef(null);

  // Touch swipe (mobile)
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (startY === null) return;
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && currentIndex < reels.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    setStartY(null);
  };

  // Trackpad/mouse wheel (desktop/laptop)
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScroll < 400) return;
    setLastScroll(now);

    if (e.deltaY > 30 && currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < -30 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScroll = (direction) => {
    if (direction === 'down' && currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (direction === 'up' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLike = (id) => {
    setReels(prevReels =>
      prevReels.map(reel => {
        if (reel.id === id) {
          const newLiked = !reel.isLiked;
          return {
            ...reel,
            isLiked: newLiked,
            likes: newLiked ? reel.likes + 1 : reel.likes - 1
          };
        }
        return reel;
      })
    );
  };

  const handleSave = (id) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === id ? { ...reel, isSaved: !reel.isSaved } : reel
      )
    );
  };

  const handleFollow = (id) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === id ? { ...reel, isFollowing: !reel.isFollowing } : reel
      )
    );
  };

  const handleShare = (reel) => {
    const shareText = `Check out this amazing ${reel.laptop.brand} ${reel.laptop.model} setup by @${reel.user.username}! ${reel.caption}`;

    if (navigator.share) {
      navigator.share({
        title: `${reel.user.username}'s laptop reel`,
        text: shareText,
        url: window.location.href
      }).then(() => {
        setShareMessage('Shared successfully! 🎉');
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      }).catch(() => {
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        setShareMessage('Link copied to clipboard! 📋');
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
      });
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      setShareMessage('Link copied to clipboard! 📋');
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    }
  };

  const handleRemix = (reel) => {
    setShareMessage(`Remix feature coming soon! 🎵 You'll be able to create your own version with ${reel.song.title}`);
    setShowShareSuccess(true);
    setTimeout(() => setShowShareSuccess(false), 3000);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const currentReel = reels[currentIndex];
      const newCommentObj = {
        id: Date.now().toString(),
        user: {
          id: 'current_user',
          username: 'you',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          verified: false
        },
        text: newComment,
        timeAgo: 'now',
        likes: 0,
        isLiked: false
      };

      setReels(prevReels =>
        prevReels.map(reel =>
          reel.id === currentReel.id
            ? {
                ...reel,
                commentsList: [newCommentObj, ...reel.commentsList],
                comments: reel.comments + 1
              }
            : reel
        )
      );
      setNewComment('');
    }
  };

  const handleCommentLike = (reelId, commentId) => {
    setReels(prevReels =>
      prevReels.map(reel =>
        reel.id === reelId
          ? {
              ...reel,
              commentsList: reel.commentsList.map(comment =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: !comment.isLiked,
                      likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
                    }
                  : comment
              )
            }
          : reel
      )
    );
  };

  const toggleDetails = (id) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMusic = (id) => {
    setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showComments || showMoreOptions) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleScroll('up');
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleScroll('down');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length, showComments, showMoreOptions]);

  const currentReel = reels[currentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Main Container */}
      <div className="w-full h-full max-w-md mx-auto relative">
        <div
          ref={containerRef}
          className="w-full h-full max-w-md mx-auto relative touch-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
            transform: `translateY(-${currentIndex * 100}vh)`,
            willChange: 'transform'
          }}
        >
          {reels.map((reel) => (
            <div key={reel.id} className="relative w-full h-screen flex-shrink-0 bg-black overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${reel.laptop.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60" />
              </div>

              {/* Navigation Hints - Desktop Only */}
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10 hidden lg:flex">
                {currentIndex > 0 && (
                  <button
                    onClick={() => handleScroll('up')}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronUp size={20} />
                  </button>
                )}
                {currentIndex < reels.length - 1 && (
                  <button
                    onClick={() => handleScroll('down')}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <ChevronDown size={20} />
                  </button>
                )}
              </div>

              {/* Music Info */}
              <div className="absolute top-3 left-3 right-3 z-20">
                <div className="flex items-center justify-between bg-black/40 backdrop-blur-sm rounded-full px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <img
                        src={reel.song.cover}
                        alt={reel.song.title}
                        className={`w-8 h-8 rounded-full border border-white/50 ${isPlaying[reel.id] ? 'animate-spin' : ''}`}
                      />
                      <button
                        onClick={() => toggleMusic(reel.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
                      >
                        {isPlaying[reel.id] ? <Pause size={12} /> : <Play size={12} />}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{reel.song.title}</p>
                      <p className="text-white/70 text-xs truncate">{reel.song.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Music size={12} className="text-white/70" />
                    <span className="text-white/70 text-xs">{reel.song.duration}</span>
                  </div>
                </div>
              </div>

              {/* User Info and Caption */}
              <div className="absolute bottom-16 left-3 right-16 z-20">
                <div className="space-y-3">
                  {/* User Profile */}
                  <div className="flex items-center gap-2">
                    <img
                      src={reel.user.avatar}
                      alt={reel.user.username}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-white font-semibold text-sm">{reel.user.username}</span>
                        {reel.user.verified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-xs">✓</div>
                        )}
                        <span className="text-white/60 text-xs">• {reel.timeAgo}</span>
                      </div>
                      <button
                        onClick={() => handleFollow(reel.id)}
                        className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full mt-1 transition-all duration-300 hover:scale-105 ${
                          reel.isFollowing
                            ? 'bg-gray-600 hover:bg-gray-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {reel.isFollowing ? <UserMinus size={10} /> : <UserPlus size={10} />}
                        {reel.isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-white text-sm leading-relaxed">{reel.caption}</p>

                  {/* Laptop Info Toggle */}
                  <button
                    onClick={() => toggleDetails(reel.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Info size={12} />
                    <span className="text-xs font-medium">
                      {showDetails[reel.id] ? 'Hide Details' : 'Laptop Details'}
                    </span>
                  </button>

                  {/* Laptop Details */}
                  {showDetails[reel.id] && (
                    <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 space-y-2 animate-in slide-in-from-bottom-4 duration-300">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-bold text-sm">{reel.laptop.brand}</h3>
                        <span className="text-green-400 font-bold text-sm">{reel.laptop.price}</span>
                      </div>
                      <p className="text-white/80 text-xs">{reel.laptop.model}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/60">Processor:</span>
                          <p className="text-white text-xs">{reel.laptop.processor}</p>
                        </div>
                        <div>
                          <span className="text-white/60">RAM:</span>
                          <p className="text-white text-xs">{reel.laptop.ram}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Storage:</span>
                          <p className="text-white text-xs">{reel.laptop.storage}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Graphics:</span>
                          <p className="text-white text-xs">{reel.laptop.graphics}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-white/60">Display:</span>
                        <p className="text-white text-xs">{reel.laptop.display}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-16 right-2 z-20 flex flex-col gap-3">
                {/* Like Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleLike(reel.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                      reel.isLiked
                        ? 'bg-red-500/80 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={24} className={reel.isLiked ? 'fill-current' : ''} />
                  </button>
                  <span className="text-white text-xs mt-1 font-medium">
                    {formatCount(reel.likes)}
                  </span>
                </div>

                {/* Comment Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setShowComments(true)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <MessageCircle size={24} />
                  </button>
                  <span className="text-white text-xs mt-1 font-medium">
                    {formatCount(reel.comments)}
                  </span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleShare(reel)}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  >
                    <Share size={24} />
                  </button>
                  <span className="text-white text-xs mt-1 font-medium">
                    {formatCount(reel.shares)}
                  </span>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleSave(reel.id)}
                  className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                    reel.isSaved
                      ? 'bg-yellow-500/80 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Bookmark size={24} className={reel.isSaved ? 'fill-current' : ''} />
                </button>

                {/* Remix Button */}
                <button
                  onClick={() => handleRemix(reel)}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <Shuffle size={24} />
                </button>

                {/* More Options */}
                <button
                  onClick={() => setShowMoreOptions(true)}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <MoreHorizontal size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl max-h-[80vh] flex flex-col">
            {/* Comments Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Comments</h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentReel.commentsList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No comments yet</p>
                  <p className="text-sm">Be the first to comment!</p>
                </div>
              ) : (
                currentReel.commentsList.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-sm">{comment.user.username}</span>
                        {comment.user.verified && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">✓</div>
                        )}
                        <span className="text-gray-500 text-xs">• {comment.timeAgo}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => handleCommentLike(currentReel.id, comment.id)}
                          className={`flex items-center gap-1 text-xs ${comment.isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                        >
                          <Heart size={12} className={comment.isLiked ? 'fill-current' : ''} />
                          {comment.likes > 0 && <span>{comment.likes}</span>}
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Options Modal */}
      {showMoreOptions && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="w-full max-w-md mx-auto bg-white rounded-t-3xl">
            <div className="p-4">
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    handleShare(currentReel);
                    setShowMoreOptions(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Copy size={20} />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => {
                    setShareMessage('Download feature coming soon! 📱');
                    setShowShareSuccess(true);
                    setShowMoreOptions(false);
                    setTimeout(() => setShowShareSuccess(false), 2000);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download size={20} />
                  <span>Save to Device</span>
                </button>
                <button
                  onClick={() => {
                    setShareMessage("Report submitted! 🚨 We'll review this content.");
                    setShowShareSuccess(true);
                    setShowMoreOptions(false);
                    setTimeout(() => setShowShareSuccess(false), 2000);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                >
                  <Flag size={20} />
                  <span>Report</span>
                </button>
                <button
                  onClick={() => {
                    setShareMessage("User blocked! 🚫 You won't see their content anymore.");
                    setShowShareSuccess(true);
                    setShowMoreOptions(false);
                    setTimeout(() => setShowShareSuccess(false), 2000);
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                >
                  <UserX size={20} />
                  <span>Block User</span>
                </button>
                <button
                  onClick={() => setShowMoreOptions(false)}
                  className="w-full flex items-center justify-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors mt-4 border-t"
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Success Message */}
      {showShareSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-top-4 duration-300">
          {shareMessage}
        </div>
      )}

      {/* Instructions for Desktop */}
      <div className="hidden lg:block absolute bottom-4 left-4 z-30">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
          <p className="text-white/70 text-xs">Use ↑↓ arrow keys to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default Reals;
