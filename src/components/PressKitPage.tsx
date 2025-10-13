import { Download, Palette, Image } from 'lucide-react';

export default function PressKitPage() {
  const brandColors = [
    { name: 'Cyan', hex: '#70ffdf', description: 'Primary accent' },
    { name: 'Magenta', hex: '#fd46f0', description: 'Secondary accent' },
    { name: 'Blue', hex: '#045ded', description: 'Deep blue' },
    { name: 'Navy', hex: '#1d269b', description: 'Dark blue' },
    { name: 'Purple', hex: '#9d4dff', description: 'Accent purple' },
    { name: 'Black', hex: '#000000', description: 'Background' },
  ];

  const logos = [
    { name: 'Circle Logo (Black)', src: '/coptr-black-circle-logo.png', bg: 'bg-white' },
    { name: 'Circle Logo (White)', src: '/coptr-white-circle-logo.png', bg: 'bg-black' },
    { name: 'Text Logo (Black)', src: '/coptr-black-text-logo.png', bg: 'bg-white' },
    { name: 'Text Logo (White)', src: '/coptr-white-text-logo.png', bg: 'bg-black' },
  ];

  const photos = [
    { name: 'Profile Photo', src: '/coptr-profile-image.JPG' },
    { name: 'Performance Photo', src: '/coptr-dj-performance-photo.JPG' },
    { name: 'Side Profile', src: '/coptr-sideview.JPG' },
    { name: 'Portrait with Sunglasses', src: '/coptr-sunglasses.JPG' },
    { name: 'Secondary Profile', src: '/coptr-secondary-profile.JPG' },
    { name: 'Performance with Sunglasses', src: '/coptr-performance-sunglasses.JPG' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#9d4dff] via-[#70ffdf] to-[#fd46f0] bg-clip-text text-transparent">
            Press Kit
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Official branding materials, logos, and press information for Coptr
          </p>
        </div>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="text-[#70ffdf]" size={32} />
            <h2 className="text-3xl font-bold text-white">Brand Colors</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brandColors.map((color, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#70ffdf]/50 transition-all duration-300 hover:scale-105"
              >
                <div
                  className="w-full aspect-square rounded-lg mb-4 shadow-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <h3 className="text-lg font-bold text-white mb-1">{color.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{color.description}</p>
                <code className="text-xs text-[#70ffdf] font-mono bg-white/5 px-2 py-1 rounded">
                  {color.hex}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Image className="text-[#fd46f0]" size={32} />
            <h2 className="text-3xl font-bold text-white">Logos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#fd46f0]/50 transition-all duration-300 hover:scale-105"
              >
                <div className={`${logo.bg} p-8 flex items-center justify-center aspect-square`}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white text-center">{logo.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Download className="text-[#9d4dff]" size={32} />
            <h2 className="text-3xl font-bold text-white">Press Photos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#9d4dff]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white text-center">{photo.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Artist Biography</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-gray-300 leading-relaxed mb-6">
              Emerging from vibrant Miami, Coptr is the EDM project of producer and DJ Paul Gerlach. His signature sound is an intense sonic journey of Melodic Dubstep and Brostep, blending in energetic Bass House and Drum and Bass. With a highly technical, melodic complexity reminiscent of Virtual Riot and the arcade-inspired energy of Barely Alive, Coptr crafts tracks designed to offer a euphoric escape for a wide audience.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Coptr's sonic vision is directly influenced by his career as a Coast Guard helicopter pilot. The scientific yet artistic precision, broad range of operations, and the dynamic energy of Miami as seen from above are woven into every beat, evoking constant climb and descent in a meticulous soundscape. This connection to the essence of flight ensures an always-energetic, commanding presence in his music.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Driven by a genuine passion for the scene, Coptr's aspirations are rooted in the thriving electronic music community of Pensacola, FL, particularly inspired by Future Astronaut Records. Having witnessed their ground-up efforts in building the local EDM scene and experiencing the electrifying energy of their shows firsthand, Coptr aims to debut his live presence on their stage. He has just launched his debut release "Hot Start" on all platforms, with an upcoming release schedule finalized and underway. He is also cultivating custom VJ loops and social media content designed to visually capture the energetic motion of his sound, establishing a distinct presence within the scene.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
          <div className="bg-gradient-to-br from-[#1d269b]/20 to-[#045ded]/20 rounded-2xl p-8 border border-[#70ffdf]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#70ffdf] mb-2">Email</h3>
                <a
                  href="mailto:paul.f.gerlach@gmail.com"
                  className="text-white hover:text-[#70ffdf] transition-colors"
                >
                  paul.f.gerlach@gmail.com
                </a>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#70ffdf] mb-2">Phone</h3>
                <a
                  href="tel:+16093324347"
                  className="text-white hover:text-[#70ffdf] transition-colors"
                >
                  (609) 332-4347
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            For high-resolution assets and additional press materials, please contact directly
          </p>
          <a
            href="mailto:paul.f.gerlach@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#70ffdf] to-[#045ded] text-black font-bold rounded-full hover:shadow-xl hover:shadow-[#70ffdf]/50 transition-all duration-300 transform hover:scale-105"
          >
            <Download size={20} />
            <span>REQUEST PRESS KIT</span>
          </a>
        </div>
      </div>
    </div>
  );
}
