'use client';
import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CourtDetails({ params }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHours, setSelectedHours] = useState(1);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleImageSet, setVisibleImageSet] = useState(0);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState('');

  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const courtId = unwrappedParams.id;

  // Mock court data - in real app, fetch based on courtId
  const court = {
    id: courtId,
    name: "Elite Futsal Arena",
    address: "123 Sports Street, Downtown District, Colombo 03",
    rating: 4.8,
    reviews: 156,
    price: "$85/hour",
    originalPrice: "$120/hour",
    discount: 29,
    images: [
      "/hero/5.jpg",
      "/hero/1.jpg", 
      "/hero/2.jpg",
      "/hero/4.jpg",
      "/hero/6.jpg",
      "/hero/fut.jpg"
    ],
    facilities: [
      {
        name: "Court Size",
        value: "40m x 20m",
        icon: "🏟️"
      },
      {
        name: "Lighting",
        value: "Professional LED",
        icon: "💡"
      },
      {
        name: "Shower Facilities",
        value: "Available",
        icon: "🚿"
      },
      {
        name: "Cafe",
        value: "On-site",
        icon: "☕"
      },
      {
        name: "Parking",
        value: "Free parking",
        icon: "🚗"
      },
      {
        name: "Equipment",
        value: "Available for rent",
        icon: "⚽"
      }
    ],
    description: "Premium futsal facility with state-of-the-art equipment and professional-grade turf. Perfect for competitive games and training sessions."
  };

  // Calculate which images to show
  const getVisibleImages = () => {
    const startIndex = visibleImageSet * 4;
    return court.images.slice(startIndex, startIndex + 4);
  };

  const totalImageSets = Math.ceil(court.images.length / 4);

  const handleNextSet = () => {
    if (visibleImageSet < totalImageSets - 1) {
      setVisibleImageSet(prev => prev + 1);
    }
  };

  const handlePrevSet = () => {
    if (visibleImageSet > 0) {
      setVisibleImageSet(prev => prev - 1);
    }
  };

  // Handle scroll events for arrow visibility
  useEffect(() => {
    const grid = document.getElementById('imageGrid');
    const upArrow = document.getElementById('upArrow');
    const downArrow = document.getElementById('downArrow');
    const imageCounter = document.getElementById('imageCounter');
    
    if (!grid) return;
    
    const handleScroll = () => {
      const scrollTop = grid.scrollTop;
      const scrollHeight = grid.scrollHeight;
      const clientHeight = grid.clientHeight;
      
      setScrollPosition(scrollTop);
      
      // Show/hide up arrow
      if (upArrow) {
        if (scrollTop > 0) {
          upArrow.style.opacity = '1';
        } else {
          upArrow.style.opacity = '0';
        }
      }
      
      // Show/hide down arrow
      if (downArrow) {
        if (scrollTop < scrollHeight - clientHeight - 1) {
          downArrow.style.opacity = '1';
        } else {
          downArrow.style.opacity = '0';
        }
      }
      
      // Update image counter
      if (imageCounter) {
        const visibleImages = Math.ceil(clientHeight / (grid.scrollHeight / court.images.length));
        const startImage = Math.floor(scrollTop / (grid.scrollHeight / court.images.length)) + 1;
        const endImage = Math.min(startImage + visibleImages - 1, court.images.length);
        imageCounter.textContent = `${startImage}-${endImage} of ${court.images.length}`;
      }
    };
    
    grid.addEventListener('scroll', handleScroll);
    
    // Initial call to set correct state
    handleScroll();
    
    return () => {
      grid.removeEventListener('scroll', handleScroll);
    };
  }, [court.images.length]);

  const timeSlots = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
  ];

  // Generate time ranges based on selected hours
  const generateTimeRanges = (hours) => {
    const ranges = [];
    
    // For each possible start time
    for (let i = 0; i <= timeSlots.length - hours; i++) {
      const startTime = timeSlots[i];
      const endTime = timeSlots[i + hours - 1];
      
      ranges.push({
        value: `${startTime}-${endTime}`,
        display: `${startTime} - ${endTime}`,
        start: startTime,
        end: endTime
      });
    }
    
    return ranges;
  };

  // Generate next 7 days
  const generateNext7Days = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const displayText = i === 0 ? 'Today' : 
                         i === 1 ? 'Tomorrow' : 
                         `${dayName}, ${monthName} ${dayNumber}`;
      
      dates.push({
        value: date.toISOString().split('T')[0],
        display: displayText
      });
    }
    
    return dates;
  };

  const availableDates = generateNext7Days();

  // Generate available dates for calendar
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const displayText = i === 0 ? 'Today' : 
                         i === 1 ? 'Tomorrow' : 
                         `${dayName}, ${monthName} ${dayNumber}`;
      
      dates.push({
        value: date.toISOString().split('T')[0],
        display: displayText,
        dayNumber: dayNumber,
        dayName: dayName,
        isToday: i === 0,
        isTomorrow: i === 1
      });
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();

  const handleCalendarDateSelect = (dateValue) => {
    setSelectedCalendarDate(dateValue);
    setSelectedDate(dateValue);
  };

  return (
    <div className="min-h-screen bg-custom-bg">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="p-4">
          <Link 
            href="/courts"
            className="inline-flex items-center text-primary-text hover:text-accent-brown transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Courts
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
          {/* Left Section - Image Grid (2/3 of screen) */}
          <div className="lg:col-span-2 px-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-0.5 h-[600px] overflow-y-auto scrollbar-hide" id="imageGrid">
                {court.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative overflow-hidden rounded-lg cursor-pointer h-[298px]"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowImageViewer(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${court.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              
              {/* Up Arrow - Show when scrolled down */}
              <button 
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full opacity-0 transition-opacity duration-300 hover:bg-opacity-90 z-10"
                id="upArrow"
                onClick={() => {
                  const grid = document.getElementById('imageGrid');
                  if (grid) {
                    grid.scrollTop -= 300;
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              
              {/* Down Arrow - Show when can scroll down */}
              <button 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white p-3 rounded-full opacity-100 transition-opacity duration-300 hover:bg-opacity-90 z-10"
                id="downArrow"
                onClick={() => {
                  const grid = document.getElementById('imageGrid');
                  if (grid) {
                    grid.scrollTop += 300;
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Image Counter */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs" id="imageCounter">
                1-4 of {court.images.length}
              </div>
            </div>
          </div>

          {/* Right Section - Product Details (1/3 of screen) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-4">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-primary-text mb-2">
                {court.name}
              </h1>

              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(court.rating) ? 'text-accent-yellow' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-secondary-text ml-2">{court.rating} ({court.reviews} reviews)</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start mb-6">
                <svg className="w-5 h-5 text-accent-brown mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-secondary-text">{court.address}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary-text">{court.price}</span>
                <span className="text-lg text-secondary-text line-through">{court.originalPrice}</span>
                <span className="bg-accent-yellow text-primary-text px-2 py-1 rounded-full text-sm font-semibold">
                  -{court.discount}%
                </span>
              </div>

              {/* Date Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
                />
              </div>

              {/* Duration and Time Slot - Single Line */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  {/* Duration Selector */}
                  <div>
                    <label className="block text-sm font-medium text-primary-text mb-2">
                      Duration
                    </label>
                    <select
                      value={selectedHours}
                      onChange={(e) => {
                        setSelectedHours(parseInt(e.target.value));
                        setSelectedTime(''); // Reset time when duration changes
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                    </select>
                  </div>

                  {/* Time Slot Selector */}
                  <div>
                    <label className="block text-sm font-medium text-primary-text mb-2">
                      Time Slot
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent"
                    >
                      <option value="">Choose time</option>
                      {generateTimeRanges(selectedHours).map((timeRange) => (
                        <option key={timeRange.value} value={timeRange.value}>
                          {timeRange.display}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <button 
                className="w-full bg-primary-text text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-brown transition-colors duration-200 mb-4"
                disabled={!selectedDate || !selectedTime}
              >
                Book Now
              </button>

              {/* Fit Guidance */}
              <p className="text-sm text-secondary-text mb-6">
                Perfect fit - stick to your usual booking time.
              </p>

              {/* Delivery Information */}
              <div className="border-t pt-4 mb-4">
                <div className="flex items-start mb-3">
                  <div className="w-4 h-4 bg-accent-yellow rounded mr-3 mt-0.5 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-primary-text text-sm">Free & fast booking</h4>
                    <p className="text-xs text-secondary-text">Bookings made before 23:30 are confirmed the same day. Enjoy instant confirmation on all bookings.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-4 h-4 text-accent-brown mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-primary-text text-sm">Easy cancellation</h4>
                    <p className="text-xs text-secondary-text">All bookings can be cancelled or rescheduled within 24 hours through our booking portal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-primary-text mb-4">Facility Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {court.facilities.map((facility, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mr-3">{facility.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-text text-sm">{facility.name}</h3>
                  <p className="text-secondary-text text-sm">{facility.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-accent-yellow/10 rounded-lg">
            <h3 className="font-semibold text-primary-text mb-2">About this court</h3>
            <p className="text-sm text-secondary-text leading-relaxed">
              {court.description}
            </p>
          </div>
        </div>
      </div>

      {/* Map and Calendar Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4">Location</h3>
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-600 font-medium">Interactive Map</p>
                  <p className="text-xs text-blue-500 mt-1">123 Sports Street, Downtown District</p>
                </div>
              </div>
              {/* Location Pin */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full border border-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-secondary-text">{court.address}</p>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-primary-text mb-4">Available Dates</h3>
            <div className="grid grid-cols-7 gap-2">
              {/* Calendar Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-secondary-text py-2">
                  {day}
                </div>
              ))}
              
              {/* Calendar Dates */}
              {calendarDates.slice(0, 14).map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleCalendarDateSelect(date.value)}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    selectedCalendarDate === date.value
                      ? 'bg-accent-yellow text-primary-text font-semibold'
                      : 'hover:bg-gray-100 text-primary-text'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{date.dayNumber}</div>
                    {date.isToday && <div className="text-xs text-accent-yellow font-bold">TODAY</div>}
                    {date.isTomorrow && <div className="text-xs text-blue-500 font-bold">TOMORROW</div>}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-xs text-secondary-text">
              <p>• Available dates are highlighted</p>
              <p>• Click a date to select it for booking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Viewer */}
      {showImageViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            <button 
              onClick={() => setCurrentImageIndex(prev => prev === 0 ? court.images.length - 1 : prev - 1)}
              className="absolute left-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button 
              onClick={() => setCurrentImageIndex(prev => prev === court.images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} of {court.images.length}
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowImageViewer(false)}
              className="absolute top-4 right-4 z-10 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={court.images[currentImageIndex]}
                alt={`${court.name} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>
           
            {/* Keyboard Navigation */}
            <div 
              className="absolute inset-0"
              onKeyDown={(e) => {
                if (e.key === 'Escape') setShowImageViewer(false);
                if (e.key === 'ArrowLeft') setCurrentImageIndex(prev => prev === 0 ? court.images.length - 1 : prev - 1);
                if (e.key === 'ArrowRight') setCurrentImageIndex(prev => prev === court.images.length - 1 ? 0 : prev + 1);
              }}
              tabIndex={0}
            />
          </div>
        </div>
      )}
    </div>
  );
} 