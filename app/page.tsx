"use client";

import React from "react";
import { motion } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  // Smooth entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, staggerChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[#1a1625] bg-[radial-gradient(circle_at_20%_30%,#3d2b56_0%,#1a1625_70%)] py-12 px-4 flex justify-center items-center font-sans">
      
      {/* Background Glow Effect */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        
        {/* Header Section */}
        <header className="p-10 lg:p-14 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 tracking-tighter">
              Astro User Portal
            </h1>
            <p className="text-purple-300/50 mt-2 text-lg font-medium">
              Manage and search users from the central service
            </p>
          </div>
          {/* Astronaut Style Icon Box */}
          <div className="h-24 w-24 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-[2rem] border border-white/10 flex items-center justify-center text-4xl shadow-inner">
             👨‍🚀
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 1. VIEW ALL USERS (Main Section) */}
          <motion.section variants={itemVariants} className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 h-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">Active Directory</h2>
                <button className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full transition-all tracking-widest uppercase">
                  View All
                </button>
              </div>
              <div className="text-slate-300">
                <UsersList />
              </div>
            </div>
          </motion.section>

          {/* Right Column Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 2. SEARCH USER SECTION */}
            <motion.section variants={itemVariants} className="bg-white/[0.04] border border-white/10 rounded-[32px] p-8 shadow-xl">
              <h3 className="text-lg font-bold text-purple-200 mb-6 flex items-center gap-3">
                <span className="p-2 bg-purple-500/20 rounded-xl text-sm">🔍</span> Search User
              </h3>
              <UserSearch />
            </motion.section>

            {/* 3. UPDATE USER SECTION */}
            <motion.section variants={itemVariants} className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8">
              <h3 className="text-lg font-bold text-blue-200 mb-2 flex items-center gap-3">
                <span className="p-2 bg-blue-500/20 rounded-xl text-sm">📝</span> Update Profile
              </h3>
              <p className="text-sm text-purple-300/40 italic px-1">
                Select a user from the directory to enable modifications...
              </p>
            </motion.section>

            {/* 4. DELETE USER SECTION */}
            <motion.section variants={itemVariants} className="bg-red-500/5 border border-red-500/20 rounded-[32px] p-8 group transition-all hover:bg-red-500/10">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-3">
                <span className="p-2 bg-red-500/20 rounded-xl text-sm">🗑️</span> Danger Zone
              </h3>
              <p className="text-xs text-red-300/40 mb-6 uppercase tracking-widest font-bold">Removal is Permanent</p>
              <button className="w-full py-4 bg-red-500/10 group-hover:bg-red-500 text-red-500 group-hover:text-white border border-red-500/30 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-red-500/10">
                Purge User Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* Footer Accent */}
        <div className="h-2 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent w-full" />
      </motion.div>
    </main>
  );
}