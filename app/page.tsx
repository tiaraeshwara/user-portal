"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[#0d0b14] bg-[radial-gradient(circle_at_50%_50%,#1a1429_0%,#0d0b14_100%)] py-12 px-4 flex justify-center items-center font-sans relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-5%] right-[5%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/10 blur-[140px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10"
      >
        
        {/* Header Section */}
        <header className="mb-12 p-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-6xl font-extralight text-white tracking-tighter">
              Astro<span className="font-bold text-white/90">Portal</span>
            </h1>
            <p className="text-white/30 mt-2 text-lg font-light tracking-[0.2em] uppercase italic">
              Centralized Directory Sync
            </p>
          </div>
          <div className="h-24 w-24 bg-white/5 backdrop-blur-[50px] rounded-full border border-white/10 flex items-center justify-center text-5xl shadow-2xl ring-1 ring-white/20">
             👨‍🚀
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 1. VIEW ALL USERS - Frosted Glass Style */}
          <motion.section variants={itemVariants} className="lg:col-span-7">
            <div className="h-full bg-white/[0.03] backdrop-blur-[60px] border border-white/10 rounded-[5px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/10 flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-light text-white tracking-tight">Active Directory</h2>
                <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 text-[11px] font-bold rounded-full transition-all tracking-widest uppercase border border-white/10">
                  View Records
                </button>
              </div>
              <div className="flex-grow bg-black/30 rounded-[35px] border border-white/5 p-8 shadow-inner">
                <UsersList />
              </div>
            </div>
          </motion.section>

          {/* Right Column Sidebar */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* 2. SEARCH USER SECTION - REFINED GLASSMORPHISM (Matching Reference) */}
            <motion.section 
              variants={itemVariants} 
              className="relative overflow-hidden bg-white/[0.08] backdrop-blur-[100px] border border-white/20 rounded-[45px] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/20"
            >
              {/* Inner Glow Polish */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              
              <h3 className="relative z-10 text-xl font-light text-white mb-8 flex items-center gap-4">
                <span className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg border border-white/20">🔍</span> 
                Search Identity
              </h3>

              {/* The search component is wrapped in a frosted container */}
              <div className="relative z-10 p-6 bg-black/10 rounded-[30px] border border-white/5 shadow-inner">
                <UserSearch />
              </div>
            </motion.section>

            {/* 3. UPDATE USER SECTION */}
            <motion.section variants={itemVariants} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[40px] p-10">
              <h3 className="text-md font-bold text-blue-400/40 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm">📝</span> 
                Modifications
              </h3>
              <p className="text-white/20 text-xs italic tracking-wide">
                Initialize update sequence by selecting a node from the directory...
              </p>
            </motion.section>

            {/* 4. DELETE USER SECTION */}
            <motion.section 
              variants={itemVariants} 
              className="bg-red-500/[0.02] backdrop-blur-md border border-red-500/10 rounded-[40px] p-10 group transition-all"
            >
              <h3 className="text-md font-bold text-red-500/40 mb-6 flex items-center gap-4">
                <span className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-sm">🗑️</span> 
                Danger Zone
              </h3>
              <button className="w-full py-5 bg-transparent group-hover:bg-red-600/80 group-hover:text-white text-red-500/40 border border-red-500/20 rounded-2xl font-black transition-all text-[10px] tracking-[0.4em] uppercase">
                Purge Record
              </button>
            </motion.section>

          </div>
        </div>

        <footer className="mt-16 flex justify-between items-center px-8 text-[10px] text-white/10 font-bold tracking-[0.5em] uppercase border-t border-white/5 pt-8">
          <div>Status: Encrypted</div>
          <div>ASTRO CORP • 2026</div>
        </footer>
      </motion.div>
    </main>
  );
}