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
    <div className="w-full max-w-md">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Search User
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search By
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="id"
                  checked={searchType === "id"}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">User ID</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  checked={searchType === "email"}
                  onChange={(e) => setSearchType(e.target.value as SearchType)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Email</span>
              </label>
            </div>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === "id" ? "Enter User ID" : "Enter Email Address"}
            </label>
            <input
              type={searchType === "email" ? "email" : "text"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === "id" ? "e.g., user123" : "e.g., user@example.com"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading || !searchValue.trim()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="font-medium text-green-800 mb-3">User Found</p>
            <div className="space-y-2">
              {result.id && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">ID:</span>
                  <span className="text-sm text-gray-900">{result.id}</span>
                </div>
              )}
              {result.firstName && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    First Name:
                  </span>
                  <span className="text-sm text-gray-900">
                    {result.firstName}
                  </span>
                </div>
              )}
              {result.lastName && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Last Name:
                  </span>
                  <span className="text-sm text-gray-900">
                    {result.lastName}
                  </span>
                </div>
              )}
              {result.email && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Email:
                  </span>
                  <span className="text-sm text-gray-900">{result.email}</span>
                </div>
              )}
              {result.age && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Age:
                  </span>
                  <span className="text-sm text-gray-900">{result.age}</span>
                </div>
              )}
              {result.gender && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Gender:
                  </span>
                  <span className="text-sm text-gray-900">{result.gender}</span>
                </div>
              )}
              {result.city && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    City:
                  </span>
                  <span className="text-sm text-gray-900">{result.city}</span>
                </div>
              )}
              {result.phoneNumber && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-900">
                    {result.phoneNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searched && !result && !error && !loading && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 text-gray-700 rounded">
            <p className="text-sm">No user found with the given {searchType}</p>
          </div>
        )}
      </div>
    </div>
  );
}
