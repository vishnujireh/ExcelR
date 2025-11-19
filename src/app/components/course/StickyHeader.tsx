"use client";
import React, { useEffect, useState } from 'react';

interface NavigationItem {
    id: number;
    label: string;
    anchor: string;
    class?: string;
    onclick?: string;
}

interface StickyHeaderProps {
    navigation: NavigationItem[];
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ navigation }) => {
    const [activeSection, setActiveSection] = useState<number>(1);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Make header sticky after scrolling 100px
            setIsSticky(window.scrollY > 100);

            // Find the current section in view
            const sections = navigation.map(nav => {
                const element = document.querySelector(nav.anchor);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return {
                        id: nav.id,
                        top: rect.top,
                    };
                }
                return null;
            }).filter(Boolean);

            // Find the first section that's currently in view
            const currentSection = sections.find(section => 
                section && section.top >= 0 && section.top <= window.innerHeight / 2
            );

            if (currentSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigation]);

    const scrollToSection = (anchor: string, id: number) => {
        const element = document.querySelector(anchor);
        if (element) {
            const yOffset = -100; // Offset to account for sticky header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className={`w-full bg-white transition-all duration-300 ${
            isSticky ? 'fixed top-0 left-0 shadow-md z-40' : ''
        }`}>
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-start space-x-8 py-4 overflow-x-auto">
                    {navigation.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.anchor, item.id)}
                            className={`whitespace-nowrap text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                                activeSection === item.id
                                    ? 'bg-blue-50 text-[#0071BC]'
                                    : 'text-gray-600 hover:text-[#0071BC]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default StickyHeader;