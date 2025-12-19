import React from 'react';

const TrustStrip = () => {
    // Placeholder logos using text for now, in a real app these would be SVGs
    // Using a "grayscale" style for subtlety
    const brands = [
        { name: "YouTube Creator Studio", opacity: "opacity-40" },
        { name: "TikTok Business", opacity: "opacity-40" },
        { name: "Adobe Premiere", opacity: "opacity-30" },
        { name: "DaVinci Resolve", opacity: "opacity-30" },
        { name: "Frame.io", opacity: "opacity-40" }
    ];

    return (
        <div className="w-full bg-white border-b border-gray-50 pb-12 pt-4">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-widest">
                    Plataformas y herramientas que dominan nuestros expertos
                </p>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale">
                    {brands.map((brand, index) => (
                        <div key={index} className={`font-bold text-xl md:text-2xl text-gray-400 ${brand.opacity} hover:opacity-80 transition-opacity cursor-default`}>
                            {brand.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustStrip;
