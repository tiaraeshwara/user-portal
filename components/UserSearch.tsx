"use client";

import { useState } from "react";
import { User, ApiResponse } from "@/types/user";
import { getUserById, getUserByEmail } from "@/services/userService";

type SearchType = "id" | "email";

export default function UserSearch() {
  const [searchType, setSearchType] = useState<SearchType>("id");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setSearched(true);

    try {
      if (!searchValue.trim()) {
        setError("Please enter a search value");
        setLoading(false);
        return;
      }

      let response: ApiResponse<User>;

      if (searchType === "id") {
        response = await getUserById(searchValue.trim());
      } else {
        response = await getUserByEmail(searchValue.trim());
      }

      console.log("******* Response from search:", response);
      if (response.data) {
        setResult({
          ...response.data,
          name:
            response.data.name ||
            `${response.data.firstName} ${response.data.lastName || ""}`.trim(),
        });
      } else {
        setError(response.message || "User not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to search user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          🔍 Search User
        </h2>

        <form onSubmit={handleSearch} className="space-y-5">
          {/* Search Type Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Search By
            </label>
            <div className="flex gap-6 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <label className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                <input
                  type="radio"
                  value="id"
                  checked={searchType === "id"}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="w-4 h-4 mr-3 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  User ID
                </span>
              </label>
              <label className="flex items-center cursor-pointer hover:text-blue-600 transition-colors">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === "email"}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="w-4 h-4 mr-3 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Email</span>
              </label>
            </div>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {searchType === "id" ? "Enter User ID" : "Enter Email Address"}
            </label>
            <input
              type={searchType === "email" ? "email" : "text"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === "id" ? "e.g., user123" : "e.g., user@example.com"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading || !searchValue.trim()}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-100"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Searching...
              </>
            ) : (
              "Search"
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-5 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-sm animate-pulse">
            <p className="font-semibold">⚠️ Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {result && (
          <div className="mt-5 p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-lg shadow-sm">
            <p className="font-semibold text-green-800 mb-4">✓ User Found</p>
            <div className="space-y-3">
              {result.id && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">ID:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.id}
                  </span>
                </div>
              )}
              {result.firstName && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    First Name:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.firstName}
                  </span>
                </div>
              )}
              {result.lastName && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Last Name:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.lastName}
                  </span>
                </div>
              )}
              {result.email && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Email:
                  </span>
                  <span className="text-sm font-semibold text-gray-900 break-all">
                    {result.email}
                  </span>
                </div>
              )}
              {result.age && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Age:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.age}
                  </span>
                </div>
              )}
              {result.gender && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    Gender:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.gender}
                  </span>
                </div>
              )}
              {result.city && (
                <div className="flex justify-between items-center py-2 border-b border-green-200">
                  <span className="text-sm font-medium text-gray-700">
                    City:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.city}
                  </span>
                </div>
              )}
              {result.phoneNumber && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-700">
                    Phone:
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {result.phoneNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searched && !result && !error && !loading && (
          <div className="mt-5 p-4 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg">
            <p className="text-sm font-medium">
              ℹ️ No user found with the given {searchType}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
