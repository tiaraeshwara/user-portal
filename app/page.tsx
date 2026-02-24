"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050b18] px-6 py-16 lg:px-12">
      
      {/* Dynamic Background Elements */}
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-float" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* 1. MINIMALIST HEADER */}
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end md:items-center border-b border-white/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-5xl font-light tracking-tight text-white leading-none">
              User<span className="font-black text-cyan-400">Portal</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-cyan-500/50"></span>
              <p className="text-cyan-200/40 text-xs font-bold uppercase tracking-[0.4em]">Directory Synchronization</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">System Status</p>
              <p className="text-cyan-400 text-xs font-mono">NODE_ACTIVE_01</p>
            </div>
            <div className="h-14 w-14 glass-panel rounded-2xl flex items-center justify-center text-3xl shadow-cyan-500/10 shadow-lg">
                👨‍🚀
            </div>
          </div>
        </header>

        {/* 2. DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN DIRECTORY PANEL */}
          <motion.section variants={itemVariants} className="lg:col-span-8">
            <div className="glass-panel rounded-[2rem] p-1 overflow-hidden">
              <div className="p-8 bg-[#040916]/40 rounded-[1.8rem]">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-2xl font-semibold text-white tracking-tight">Active Records</h2>
                    <p className="text-white/30 text-sm mt-1">Live database of synchronized users</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 text-[10px] font-black uppercase tracking-tighter">Live Syncing</span>
                  </div>
                </div>

                <div className="min-h-[500px] custom-scrollbar overflow-y-auto">
                  <UsersList />
                </div>
              </div>
            </div>
          </motion.section>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* SEARCH IDENTITY */}
            <motion.section variants={itemVariants} className="glass-panel rounded-[2rem] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Global Search</h3>
              </div>
              <div className="bg-black/20 rounded-2xl p-2">
                <UserSearch />
              </div>
            </motion.section>

            {/* QUICK ACTIONS */}
            <motion.section variants={itemVariants} className="glass-panel rounded-[2rem] p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Operations</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6 font-light italic">
                Select a directory node to begin modification sequences.
              </p>
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all">
                Access Audit Logs
              </button>
            </motion.section>

            {/* DANGER ZONE */}
            <motion.section variants={itemVariants} className="border border-red-500/10 bg-red-500/[0.02] rounded-[2rem] p-8">
              <h3 className="text-red-400/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Termination Zone</h3>
              <button className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all shadow-lg shadow-red-500/5">
                Purge Database Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* 3. FOOTER */}
        <footer className="mt-20 flex justify-between items-center text-[9px] text-white/10 font-bold uppercase tracking-[0.5em]">
          <p>© 2026 ASTRO_PORTAL // SECURE_DISTRO</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-cyan-500/40 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-cyan-500/40 cursor-pointer transition-colors">API Keys</span>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}