"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  // State to manage which modal is open
  const [activeModal, setActiveModal] = useState<"add" | "update" | "delete" | null>(null);

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

  // Close modal handler
  const closeModal = () => setActiveModal(null);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050b18] px-6 py-16 lg:px-12 text-white">
      
      {/* 1. DYNAMIC BACKGROUND ELEMENTS (Original) */}
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-float" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* HEADER (Original) */}
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

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* MAIN DIRECTORY PANEL (Original) */}
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

          {/* SIDEBAR (With New Actions) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* SEARCH IDENTITY (Original) */}
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

            {/* OPERATIONS SECTION (Updated for Add/Update) */}
            <motion.section variants={itemVariants} className="glass-panel rounded-[2rem] p-8 relative overflow-hidden group">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Command Center</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6 font-light italic">
                Execute directory modifications or initialize new nodes.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveModal("add")}
                  className="w-full py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-xl text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                >
                  + Add New User Node
                </button>
                <button 
                  onClick={() => setActiveModal("update")}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
                >
                  Update User Record
                </button>
              </div>
            </motion.section>

            {/* DANGER ZONE (Updated for Delete) */}
            <motion.section variants={itemVariants} className="border border-red-500/10 bg-red-500/[0.02] rounded-[2rem] p-8">
              <h3 className="text-red-400/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Termination Zone</h3>
              <button 
                onClick={() => setActiveModal("delete")}
                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black tracking-[0.3em] uppercase transition-all shadow-lg shadow-red-500/5"
              >
                Purge Database Record
              </button>
            </motion.section>

          </div>
        </div>

        {/* FOOTER (Original) */}
        <footer className="mt-20 flex justify-between items-center text-[9px] text-white/10 font-bold uppercase tracking-[0.5em]">
          <p>© 2026 ASTRO_PORTAL // SECURE_DISTRO</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-cyan-500/40 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-cyan-500/40 cursor-pointer transition-colors">API Keys</span>
          </div>
        </footer>
      </motion.div>

      {/* POPUP MODAL SECTION */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#050b18]/80 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-2xl rounded-[2.5rem] overflow-hidden relative shadow-2xl border-cyan-500/20"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                    {activeModal === 'add' && "Initialize User"}
                    {activeModal === 'update' && "Modify Record"}
                    {activeModal === 'delete' && "Terminate Node"}
                  </h2>
                  <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    ✕
                  </button>
                </div>

                <form className="space-y-6">
                  {(activeModal === 'add' || activeModal === 'update') && (
                    <>
                      {activeModal === 'update' && (
                        <div className="space-y-2">
                          <label className="form-label">Search User ID to Update</label>
                          <input type="text" placeholder="UUID-8829-X" className="form-input border-cyan-500/30" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="form-label">First Name</label>
                          <input type="text" placeholder="John" className="form-input" />
                        </div>
                        <div className="space-y-2">
                          <label className="form-label">Last Name</label>
                          <input type="text" placeholder="Doe" className="form-input" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="form-label">Age</label>
                          <input type="number" placeholder="25" className="form-input" />
                        </div>
                        <div className="space-y-2">
                          <label className="form-label">Gender</label>
                          <select className="form-input appearance-none">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Non-Binary</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="form-label">City</label>
                          <input type="text" placeholder="Neo Tokyo" className="form-input" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="form-label">Phone Number</label>
                          <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                        </div>
                        <div className="space-y-2">
                          <label className="form-label">Email Address</label>
                          <input type="email" placeholder="j.doe@network.io" className="form-input" />
                        </div>
                      </div>
                    </>
                  )}

                  {activeModal === 'delete' && (
                    <div className="space-y-8 py-4">
                      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <p className="text-red-400 text-sm leading-relaxed italic">
                          Warning: This action will permanently wipe the user node from the synchronized directory. 
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="form-label text-red-400">Target User Node ID</label>
                        <input type="text" placeholder="Enter UUID for deletion..." className="form-input border-red-500/30 focus:border-red-500/60" />
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className={`w-full py-5 rounded-xl text-xs font-black uppercase tracking-[0.4em] transition-all shadow-lg ${
                        activeModal === 'delete' 
                        ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' 
                        : 'bg-cyan-400 hover:bg-cyan-300 text-[#050b18] shadow-cyan-500/20'
                      }`}
                    >
                      {activeModal === 'add' && "Execute Initialization"}
                      {activeModal === 'update' && "Confirm Modification"}
                      {activeModal === 'delete' && "Execute Purge"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}