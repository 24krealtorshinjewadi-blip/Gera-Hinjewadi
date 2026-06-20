'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme, Theme } from './ThemeProvider';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-900/30 border border-slate-800/40 backdrop-blur-sm" />
    );
  }

  const options = [
    { value: 'light' as Theme, label: 'Light Theme', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark Theme', icon: Moon },
    { value: 'system' as Theme, label: 'System Preference', icon: Laptop },
  ];

  const handleSelect = (val: Theme) => {
    setTheme(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };



  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id="theme-menu-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Change theme, current: ${theme}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/40 border border-slate-800/40 hover:border-gold-500/40 backdrop-blur-sm shadow-md text-slate-300 hover:text-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="h-[18px] w-[18px] text-gold-400" />
          ) : (
            <Sun className="h-[18px] w-[18px] text-amber-500" />
          )}
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            role="menu"
            aria-labelledby="theme-menu-button"
            className="absolute right-0 mt-2.5 w-48 rounded-xl bg-slate-900/90 border border-slate-800/60 backdrop-blur-lg shadow-2xl p-1.5 z-50 outline-none"
          >
            <div className="py-1" role="none">
              {options.map((opt) => {
                const OptIcon = opt.icon;
                const isSelected = theme === opt.value;

                return (
                  <button
                    key={opt.value}
                    role="menuitem"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-semibold tracking-wide transition-all duration-200 outline-none cursor-pointer ${
                      isSelected
                        ? 'bg-gold-500 text-slate-950 shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <OptIcon className="h-4 w-4" />
                      <span>{opt.label}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
