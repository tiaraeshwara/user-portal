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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-[#050b18] bg-[radial-gradient(circle_at_20%_20%,#0a1a35_0%,#050b18_100%)] py-10 px-6 flex justify-center items-center font-sans relative overflow-hidden">
      
      {/* Background Neon Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl relative z-10"
      >
        
        {/* 1. TOP NAV BAR (Sleek Header) */}
        <header className="mb-8 p-6 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[30px] flex justify-between items-center shadow-2xl ring-1 ring-white/5">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter text-white">
              Astro<span className="text-cyan-400">Portal</span>
            </h1>
            <p className="text-cyan-200/40 text-xs font-medium uppercase tracking-[0.3em]">Centralized Directory Sync</p>
          </div>
          <div className="h-14 w-14 bg-cyan-500/10 rounded-2xl border border-cyan-400/30 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,211,238,0.2)]">
             👨‍🚀
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* 2. MAIN DIRECTORY PANEL (Cyber-Glass) */}
          <motion.section variants={itemVariants} className="lg:col-span-7 h-full">
            <div className="h-full bg-white/[0.03] backdrop-blur-2xl border border-cyan-400/20 rounded-[40px] p-8 shadow-2xl relative group overflow-hidden">
              {/* Neon Top Edge Glow */}
              <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              
              <div className="flex justify-between items-center mb-8 px-2">
                <h2 className="text-xl font-semibold text-white tracking-wide">Active Directory</h2>
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-[10px] rounded-md font-bold uppercase tracking-widest">Live</span>
              </div>

              {/* Functional Container */}
              <div className="bg-[#040916]/80 rounded-[24px] border border-white/5 p-6 min-h-[400px] shadow-inner">
                <UsersList />
                
                {/* Visual Placeholder (if no users) */}
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                  <div className="flex gap-2 mb-4">
                    <span className="text-cyan-400 text-2xl animate-pulse">≫≫≫</span>
                  </div>
                  <p className="text-xs text-white uppercase tracking-[0.4em] font-bold">Connecting Stream</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3. SIDEBAR STACK */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* SEARCH IDENTITY */}
            <motion.section variants={itemVariants} className="bg-white/[0.04] backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 shadow-xl ring-1 ring-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <span className="text-cyan-400">🔍</span>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Search User</h3>
              </div>
              <div className="bg-[#050b18]/60 p-4 rounded-2xl border border-white/5 shadow-inner">
                <UserSearch />
              </div>
            </motion.section>

            {/* UPDATE SECTION */}
            <motion.section variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 transition-all hover:bg-white/[0.04]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-400">📝</span>
                </div>
                <h3 className="text-sm font-bold text-blue-200/60 uppercase tracking-widest">Modifications</h3>
              </div>
              <p className="text-[11px] text-white/20 italic leading-relaxed">
                Initialize update sequence by selecting a node from the registry...
              </p>
            </motion.section>

            {/* DANGER ZONE */}
            <motion.section variants={itemVariants} className="bg-red-500/[0.02] border border-red-500/20 rounded-[40px] p-8 group">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-red-500/10 rounded-lg">
                    <span className="text-red-400">🗑️</span>
                 </div>
                 <h3 className="text-sm font-bold text-red-400/60 uppercase tracking-widest">Terminal Action</h3>
              </div>
              <button className="w-full py-4 bg-transparent group-hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all">
                Purge Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* 4. SYSTEM FOOTER */}
        <footer className="mt-8 flex justify-between items-center px-4 text-[9px] text-cyan-200/10 font-bold tracking-[0.5em] uppercase">
          <div>SECURE_OS v2.4</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
            SYNCHRONIZED
          </div>
        </footer>
      </motion.div>
    </main>
  );
}