"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  // Ultra-smooth, professional transitions
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    // Updated Background: Deep Midnight Blue Palette
    <main className="min-h-screen bg-[#040816] bg-[radial-gradient(circle_at_50%_50%,#0a1435_0%,#040816_100%)] py-12 px-4 flex justify-center items-center font-sans relative overflow-hidden">
      
      {/* Background Decorative Orbs: Deep Blue & Cyan Glows */}
      <div className="absolute top-[-10%] right-[5%] w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-900/10 blur-[110px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10"
      >
        
        {/* Header Section: Clean White & Blue Accents */}
        <header className="mb-12 p-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-extralight text-white tracking-tighter">
              Astro<span className="font-bold text-blue-400">Portal</span>
            </h1>
            <p className="text-blue-200/30 mt-2 text-lg font-light tracking-[0.2em] uppercase italic">
              Centralized Directory Sync
            </p>
          </div>
          <div className="h-24 w-24 bg-blue-500/5 backdrop-blur-[50px] rounded-full border border-blue-400/20 flex items-center justify-center text-5xl shadow-2xl ring-1 ring-blue-400/30 transition-all hover:scale-110">
             👨‍🚀
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 1. ACTIVE DIRECTORY - Deep Blue Glass */}
          <motion.section variants={itemVariants} className="lg:col-span-7 group">
            <div className="h-full bg-white/[0.02] backdrop-blur-[60px] border border-blue-500/10 rounded-[50px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10 flex flex-col transition-all hover:bg-blue-500/[0.03]">
              
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-3xl font-light text-white tracking-tight">Active Directory</h2>
                  <div className="h-1 w-10 bg-blue-500/40 mt-2 rounded-full" />
                </div>
                <button className="px-6 py-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-100/70 text-[11px] font-bold rounded-full transition-all tracking-[0.2em] uppercase border border-blue-400/20 backdrop-blur-md">
                  View Records
                </button>
              </div>

              {/* Data Content Box with Midnight Background */}
              <div className="flex-grow bg-[#050a1d]/60 rounded-[35px] border border-blue-400/10 p-8 shadow-inner overflow-hidden backdrop-blur-md">
                <UsersList />
              </div>
            </div>
          </motion.section>

          {/* Right Column Sidebar */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* 2. SEARCH USER SECTION: High Contrast Midnight Blue Glass */}
            <motion.section 
              variants={itemVariants} 
              className="relative overflow-hidden bg-blue-900/[0.05] backdrop-blur-[100px] border border-blue-400/20 rounded-[45px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] ring-1 ring-blue-400/20"
            >
              {/* Blue Glow Polish */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent pointer-events-none" />
              
              <h3 className="relative z-10 text-xl font-light text-white mb-8 flex items-center gap-4">
                <span className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-lg border border-blue-400/20 shadow-lg">🔍</span> 
                Search Identity
              </h3>

              {/* Nested Frosted Container */}
              <div className="relative z-10 p-6 bg-[#04091a]/80 rounded-[30px] border border-blue-400/10 shadow-2xl backdrop-blur-md">
                <UserSearch />
              </div>
            </motion.section>

            {/* 3. UPDATE USER SECTION: Muted Indigo Blue */}
            <motion.section variants={itemVariants} className="bg-blue-950/[0.05] backdrop-blur-xl border border-blue-400/5 rounded-[40px] p-10 transition-all hover:border-blue-400/20">
              <h3 className="text-md font-bold text-blue-300/40 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-blue-900/20 border border-blue-800/20 flex items-center justify-center text-sm">📝</span> 
                Modifications
              </h3>
              <p className="text-blue-100/20 text-xs italic leading-relaxed tracking-wide">
                Initialize update sequence by selecting a node from the directory...
              </p>
            </motion.section>

            {/* 4. DELETE USER SECTION: Danger Zone (Deep Red-Blue contrast) */}
            <motion.section 
              variants={itemVariants} 
              className="bg-red-950/[0.03] backdrop-blur-md border border-red-900/20 rounded-[40px] p-10 group transition-all duration-500 hover:bg-red-900/[0.08]"
            >
              <h3 className="text-md font-bold text-red-500/40 mb-6 flex items-center gap-4">
                <span className="w-10 h-10 rounded-2xl bg-red-900/20 border border-red-900/30 flex items-center justify-center text-sm">🗑️</span> 
                Terminal Actions
              </h3>
              <button className="w-full py-5 bg-transparent group-hover:bg-red-600/70 group-hover:text-white text-red-600/40 border border-red-600/20 rounded-2xl font-black transition-all duration-700 text-[10px] tracking-[0.4em] uppercase shadow-lg">
                Purge Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="mt-16 flex justify-between items-center px-8 text-[10px] text-blue-200/10 font-bold tracking-[0.5em] uppercase border-t border-blue-900/20 pt-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_#60a5fa]" />
            System Secure
          </div>
          <div>EST 2026 • ASTRO CORP</div>
        </footer>
      </motion.div>
    </main>
  );
}