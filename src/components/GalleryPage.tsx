export default function GalleryPage() {
  const images = [
    {
      src: '/coptr-profile-image.JPG',
      alt: 'Coptr Profile',
      title: 'Profile',
    },
    {
      src: '/coptr-dj-performance-photo.JPG',
      alt: 'Coptr DJ Performance',
      title: 'Live Performance',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#fd46f0] via-[#9d4dff] to-[#70ffdf] bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Behind the decks and beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#70ffdf]/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#70ffdf]/20"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  {image.title}
                </h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#70ffdf] to-[#fd46f0] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-[#1d269b]/20 to-[#045ded]/20 rounded-2xl p-8 border border-[#70ffdf]/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#70ffdf]">
            Professional Photos
          </h2>
          <p className="text-gray-400 mb-6">
            High-resolution press photos available for download in the Press Kit section
          </p>
          <a
            href="#presskit"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#70ffdf] to-[#045ded] text-black font-bold rounded-full hover:shadow-xl hover:shadow-[#70ffdf]/50 transition-all duration-300 transform hover:scale-105"
          >
            View Press Kit
          </a>
        </div>
      </div>
    </div>
  );
}
