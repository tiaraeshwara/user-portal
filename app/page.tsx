"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  // Ultra-smooth, professional transitions
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: [0.19, 1, 0.22, 1], // Apple-style Expo ease
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0510] text-slate-200 selection:bg-purple-500/30 py-16 px-4 md:px-8 flex justify-center items-center font-sans">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl relative z-10"
      >
        {/* Header: Clean & Spaced */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 px-4">
          <div className="space-y-2">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold tracking-tight text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              Astro<span className="text-purple-400 font-light text-5xl">OS</span>
            </motion.h1>
            <p className="text-purple-200/50 text-xl font-light tracking-wide max-w-md">
              Centralized user management system with neural directory sync.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400/60 font-bold">System Status</p>
              <p className="text-sm text-green-400/80 font-mono">ALL SYSTEMS NOMINAL</p>
            </div>
            <div className="h-20 w-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center text-4xl shadow-2xl ring-1 ring-white/5">
              👨‍🚀
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area: Active Directory */}
          <motion.section variants={itemVariants} className="lg:col-span-8">
            <div className="h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[40px] p-10 shadow-2xl ring-1 ring-white/10 transition-all hover:bg-white/[0.05]">
              <div className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <h2 className="text-3xl font-semibold text-white">Active Directory</h2>
                  <p className="text-sm text-slate-500 font-medium">Real-time user synchronization</p>
                </div>
                <button className="group relative px-6 py-2 overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase transition-all hover:border-purple-500/50">
                  <span className="relative z-10">View All Records</span>
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
              
              <div className="min-h-[400px]">
                <UsersList />
              </div>
            </div>
          </motion.section>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Search Component */}
            <motion.section variants={itemVariants} className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-xl ring-1 ring-white/5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Identity Search</h3>
              </div>
              <UserSearch />
            </motion.section>

            {/* Profile Update Placeholder */}
            <motion.section variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 transition-all hover:bg-white/[0.04]">
              <h3 className="text-lg font-bold text-blue-300/80 mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm">📝</span> 
                Modifications
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed italic">
                Select a user profile from the directory to initialize the editor module.
              </p>
            </motion.section>

            {/* Danger Zone */}
            <motion.section 
              variants={itemVariants} 
              className="bg-red-500/[0.03] border border-red-500/20 rounded-[40px] p-8 group transition-all"
            >
              <h3 className="text-lg font-bold text-red-400/80 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-sm">🗑️</span> 
                Terminal Actions
              </h3>
              <button className="w-full py-4 bg-red-500/10 group-hover:bg-red-600 group-hover:text-white text-red-400 border border-red-500/20 rounded-2xl font-bold transition-all duration-300 text-xs tracking-[0.2em] uppercase">
                Purge Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* Minimalist Footer */}
        <footer className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-bold tracking-[0.4em] uppercase">
          <div>SECURE ACCESS GRANTED</div>
          <div>EST 2026 • ASTRO CORP</div>
        </footer>
      </motion.div>
    </main>
  );
}