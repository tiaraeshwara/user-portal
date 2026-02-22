"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: [0.19, 1, 0.22, 1],
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
  };

  return (
    <main className="min-h-screen bg-[#0a0510] text-slate-200 py-16 px-4 md:px-8 flex justify-center items-center font-sans relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10"
      >
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-end px-4">
          <div className="space-y-1">
            <h1 className="text-6xl font-bold tracking-tighter text-white">
              Astro<span className="text-purple-400/80 font-extralight">Portal</span>
            </h1>
            <p className="text-purple-200/40 text-lg font-light italic">
              Orchestrate your central directory with precision
            </p>
          </div>
          <div className="h-20 w-20 bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-white/10 flex items-center justify-center text-4xl shadow-2xl ring-1 ring-white/10">
            👨‍🚀
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Active Directory Section */}
          <motion.section variants={itemVariants} className="lg:col-span-8">
            <div className="h-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[48px] p-10 shadow-2xl ring-1 ring-white/5 flex flex-col">
              
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-semibold text-white tracking-tight">Active Directory</h2>
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-400/50 mt-1 font-bold">Real-time Synchronization</p>
                </div>
                {/* Clean, Elegant Button */}
                <button className="px-6 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 text-[10px] font-bold rounded-full transition-all tracking-[0.2em] uppercase border border-purple-500/20 active:scale-95">
                  View All Records
                </button>
              </div>

              {/* The "Box" Content - Adjusted for Elegance */}
              <div className="flex-grow flex flex-col items-center justify-center border border-white/5 rounded-[32px] bg-black/20 p-12 group transition-all hover:bg-black/30">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                  <span className="text-2xl opacity-50">👥</span>
                </div>
                <p className="text-slate-400 font-light tracking-wide text-center max-w-xs leading-relaxed">
                  The directory is currently <span className="text-purple-400/60 font-medium italic">standby</span>. Click the button above to initialize user streams.
                </p>
                
                {/* Nested Component (UsersList) would render here */}
                <div className="w-full mt-4">
                   <UsersList />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Sidebar Section */}
          <div className="lg:col-span-4 space-y-8">
            <motion.section variants={itemVariants} className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-xl text-sm border border-purple-500/20">🔍</span> 
                Search Identity
              </h3>
              <UserSearch />
            </motion.section>

            <motion.section variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8">
              <h3 className="text-md font-bold text-blue-300/60 mb-2 flex items-center gap-3">
                <span className="p-2 bg-blue-500/10 rounded-xl text-sm">📝</span> Update
              </h3>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                Select a node from the directory to enable modification protocols.
              </p>
            </motion.section>

            <motion.section variants={itemVariants} className="bg-red-500/[0.02] border border-red-500/10 rounded-[40px] p-8 group">
              <h3 className="text-md font-bold text-red-400/60 mb-4 flex items-center gap-3">
                <span className="p-2 bg-red-500/10 rounded-xl text-sm">🗑️</span> Danger Zone
              </h3>
              <button className="w-full py-4 bg-transparent border border-red-500/20 group-hover:bg-red-500/10 text-red-500/50 group-hover:text-red-400 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase transition-all">
                Purge Record
              </button>
            </motion.section>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 px-4 flex justify-between items-center text-[9px] text-white/10 font-bold tracking-[0.5em] uppercase">
          <div>System: Secure</div>
          <div>Terminal ID: ASTRO-99</div>
        </footer>
      </motion.div>
    </main>
  );
}