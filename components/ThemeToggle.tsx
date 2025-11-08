import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
    theme: string;
    toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            data-hoverable
            className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-surface-2 border border-border transition-colors duration-300 focus:outline-none"
            aria-label="Toggle theme"
        >
            <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                className="w-6 h-6"
            >
                {theme === 'dark' ? (
                    <MoonIcon className="text-accent"/>
                ) : (
                    <SunIcon className="text-accent"/>
                )}
            </motion.div>
        </button>
    );
};
