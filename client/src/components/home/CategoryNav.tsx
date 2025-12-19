import React from 'react';
import { Link } from 'wouter';
import {
    Youtube,
    Video,
    Building2,
    Heart,
    Music,
    Megaphone
} from 'lucide-react';

const categories = [
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'reels', label: 'TikTok / Reels', icon: Video },
    { id: 'corporate', label: 'Corporativo', icon: Building2 },
    { id: 'wedding', label: 'Bodas', icon: Heart },
    { id: 'music', label: 'Musical', icon: Music },
    { id: 'commercial', label: 'Comercial', icon: Megaphone },
];

const CategoryNav = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-50">
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-bold mb-8 text-center md:text-left">Explora por categoría</h3>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/search?professionalType=${cat.id}`}>
                            <div className="flex flex-col items-center justify-center min-w-[120px] h-[100px] rounded-xl border border-gray-100 bg-white hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
                                <cat.icon className="w-8 h-8 mb-3 text-gray-400 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-foreground">{cat.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryNav;
