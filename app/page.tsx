"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";
import { createUser, updateUser, deleteUser } from "@/services/userService";
import { User } from "@/types/user";

type ModalType = "add" | "update" | "delete" | null;

type UserFormData = {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  city: string;
  email: string;
  phoneNumber: string;
};

const EMPTY_FORM: UserFormData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "Male",
  city: "",
  email: "",
  phoneNumber: "",
};

function getUserIdentifier(user: User | null): string | undefined {
  return user?.id || user?.userId;
}

function getDisplayName(user: User | null): string {
  if (!user) {
    return "";
  }

  if (user.name) {
    return user.name;
  }

  return (
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User"
  );
}

function toFormData(user: User | null): UserFormData {
  if (!user) {
    return { ...EMPTY_FORM };
  }

  return {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user.age !== undefined && user.age !== null ? String(user.age) : "",
    gender: user.gender || "Male",
    city: user.city || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhoneNumber(phoneNumber: string): boolean {
  return /^\d{6,15}$/.test(phoneNumber);
}

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({ ...EMPTY_FORM });
  const [confirmText, setConfirmText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const openModal = (type: Exclude<ModalType, null>) => {
    if ((type === "update" || type === "delete") && !foundUser) {
      setActionError("Search and select a user first.");
      return;
    }

    setActionError(null);
    setActionMessage(null);
    setConfirmText("");
    setFormData(type === "update" ? toFormData(foundUser) : { ...EMPTY_FORM });
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSubmitting(false);
    setConfirmText("");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!activeModal) {
      return;
    }

    const userId = getUserIdentifier(foundUser);
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      city: formData.city.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
    };

    if (activeModal !== "delete") {
      if (
        !payload.firstName ||
        !payload.lastName ||
        !payload.email ||
        !payload.city ||
        !payload.phoneNumber ||
        Number.isNaN(payload.age)
      ) {
        setActionError("Please fill all fields before submitting.");
        return;
      }

      if (payload.age <= 0) {
        setActionError("Age must be greater than 0.");
        return;
      }

      if (!isValidEmail(payload.email)) {
        setActionError("Please enter a valid email address.");
        return;
      }

      if (!isValidPhoneNumber(payload.phoneNumber)) {
        setActionError("Phone number must contain 6 to 15 digits.");
        return;
      }
    }

    if (activeModal === "delete" && confirmText.trim() !== "CONFIRM") {
      setActionError('Type "CONFIRM" to authorize deletion.');
      return;
    }

    try {
      setSubmitting(true);
      setActionError(null);

      if (activeModal === "add") {
        await createUser(payload);
        setActionMessage("User created successfully.");
      }

      if (activeModal === "update") {
        if (!userId) {
          throw new Error("Selected user does not have an ID.");
        }

        await updateUser(userId, payload);
        setFoundUser((prev) =>
          prev
            ? {
                ...prev,
                ...payload,
                name: `${payload.firstName} ${payload.lastName}`.trim(),
              }
            : prev,
        );
        setActionMessage("User updated successfully.");
      }

      if (activeModal === "delete") {
        if (!userId) {
          throw new Error("Selected user does not have an ID.");
        }

        await deleteUser(userId);
        setFoundUser(null);
        setActionMessage("User deleted successfully.");
      }

      closeModal();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Transaction failed.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050b18] px-4 py-12 lg:px-8 text-white">
      <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full animate-float" />

      <div
        className="absolute -bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1600px] mx-auto relative z-10"
      >
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-light tracking-tight text-white leading-none">
              User<span className="font-black text-cyan-400">Portal</span>
            </h1>

            <p className="text-cyan-200/40 text-[10px] font-bold uppercase tracking-[0.5em] mt-2">
              Central Intelligence Terminal
            </p>
          </div>

          <div className="h-12 w-12 glass-panel rounded-xl flex items-center justify-center text-2xl shadow-cyan-500/20 shadow-lg mt-4 md:mt-0">
            👨‍🚀
          </div>
        </header>

        {actionError && !activeModal && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            {actionError}
          </div>
        )}

        {actionMessage && (
          <div className="mb-6 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-xs text-cyan-200">
            {actionMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <motion.aside
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            <div className="glass-panel rounded-[2rem] p-8 border-cyan-500/10 bg-cyan-500/[0.02]">
              <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em] mb-4">
                ADD USER
              </h3>

              <p className="text-white/40 text-xs leading-relaxed mb-6 font-light italic">
                Create a new user profile by entering their basic details.
              </p>

              <button
                onClick={() => openModal("add")}
                className="w-full py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-2xl text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/5"
              >
                + Create New User
              </button>
            </div>

           
          </motion.aside>

          <motion.section variants={itemVariants} className="lg:col-span-6">
            <div className="glass-panel rounded-[2.5rem] p-1 overflow-hidden h-full">
              <div className="p-8 bg-[#040916]/40 rounded-[2.3rem] h-full flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-semibold text-white tracking-tight italic">
                    Active Records
                  </h2>

                  <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />

                    <span className="text-cyan-400 text-[9px] font-black uppercase tracking-tighter">
                      Live
                    </span>
                  </div>
                </div>

                <div className="flex-1 custom-scrollbar overflow-y-auto">
                  <UsersList />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.aside
            variants={itemVariants}
            className="lg:col-span-3 space-y-6"
          >
            <div className="glass-panel rounded-[2rem] p-8">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full" /> Global
                Search
              </h3>

              <UserSearch
                onUserFound={setFoundUser}
                onClear={() => setFoundUser(null)}
              />

              <div className="mt-8 pt-8 border-t border-white/5">
                <AnimatePresence mode="wait">
                  {foundUser ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                        <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">
                          Found Result
                        </p>

                        <h4 className="text-lg font-bold text-white mb-0.5">
                          {getDisplayName(foundUser)}
                        </h4>

                        <p className="text-white/30 text-[10px] font-mono">
                          {foundUser?.email || "No Email"}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <button
                          onClick={() => openModal("update")}
                          className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          Modify User
                        </button>

                        <button
                          onClick={() => openModal("delete")}
                          className="w-full py-4 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                          Delete User
                        </button>
                      </div>

                      <button
                        onClick={() => setFoundUser(null)}
                        className="w-full text-[9px] text-white/20 hover:text-white/40 uppercase font-bold tracking-widest transition-colors"
                      >
                        Clear Search
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center py-10 opacity-20 italic text-xs">
                      Enter parameters to scan directory...
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-[#050b18]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="glass-panel w-full max-w-2xl rounded-[3rem] overflow-hidden relative border-white/10"
            >
              <div className="p-10 md:p-14">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                    {activeModal === "add"
                      ? "Init Node"
                      : activeModal === "update"
                        ? "Modify Node"
                        : "Purge Node"}
                  </h2>

                  <button
                    onClick={closeModal}
                    className="text-white/30 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {actionError && (
                  <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                    {actionError}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {activeModal !== "delete" ? (
                    <>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="form-label">First Name</label>

                          <input
                            type="text"
                            name="firstName"
                            className="form-input"
                            placeholder="Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="form-label">Last Name</label>

                          <input
                            type="text"
                            name="lastName"
                            className="form-input"
                            placeholder="Surname"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="form-label">Age</label>

                          <input
                            type="number"
                            name="age"
                            className="form-input"
                            placeholder="00"
                            value={formData.age}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="form-label">Gender</label>

                          <select
                            name="gender"
                            className="form-input appearance-none bg-[#050b18]"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="form-label">City</label>

                          <input
                            type="text"
                            name="city"
                            className="form-input"
                            placeholder="Location"
                            value={formData.city}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="form-label">Phone</label>

                          <input
                            type="tel"
                            name="phoneNumber"
                            className="form-input"
                            placeholder="+00..."
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="form-label">Email</label>

                          <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="user@net.io"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center space-y-6">
                      <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mb-4">
                        <span className="text-red-500 text-2xl font-bold">
                          !
                        </span>
                      </div>

                      <p className="text-white/40 italic">
                        Confirm permanent wipe for{" "}
                        <span className="text-white font-bold">
                          {getUserIdentifier(foundUser)}
                        </span>
                        ?
                      </p>

                      <input
                        type="text"
                        placeholder="Type CONFIRM to authorize"
                        className="form-input text-center"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      submitting ||
                      (activeModal === "delete" &&
                        confirmText.trim() !== "CONFIRM")
                    }
                    className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl mt-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                      activeModal === "delete"
                        ? "bg-red-600 hover:bg-red-500 shadow-red-500/20"
                        : "bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-500/20"
                    }`}
                  >
                    {submitting ? "Processing..." : "Process Transaction"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
