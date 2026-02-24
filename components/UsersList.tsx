"use client";

import { useEffect, useState } from "react";
import { User, PaginatedResponse } from "@/types/user";
import { getAllUsers } from "@/services/userService";

const ITEMS_PER_PAGE = 10;

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginatedResponse<User> = await getAllUsers(
        page,
        ITEMS_PER_PAGE,
      );

      // Handle both response formats
      const userList =
        response.data || (Array.isArray(response) ? response : []);
      setUsers(Array.isArray(userList) ? userList : []);

      const total =
        response.total || (Array.isArray(response) ? response.length : 0);
      setTotalPages(response.totalPages || Math.ceil(total / ITEMS_PER_PAGE));
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadUsers = () => {
    fetchUsers(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchUsers(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchUsers(currentPage + 1);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <button
          onClick={handleLoadUsers}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md hover:shadow-lg active:shadow-sm transform hover:scale-105 active:scale-100"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⟳</span>
              Loading...
            </>
          ) : (
            "View All Users"
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-sm">
          <p className="font-semibold">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {users.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Gender
                  </th>
                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.age}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col gap-4 sm:flex-row items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => fetchUsers(page)}
                      disabled={loading}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-150 ${
                        currentPage === page
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                      } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm hover:shadow-md"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            👥 Click &quot;View All Users&quot; to load users
          </p>
        </div>
      )}
    </div>
  );
}
