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
      const userList = response.data || (Array.isArray(response) ? response : []);
      setUsers(Array.isArray(userList) ? userList : []);
      
      const total = response.total || (Array.isArray(response) ? response.length : 0);
      setTotalPages(
        response.totalPages || Math.ceil(total / ITEMS_PER_PAGE),
      );
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
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <button
          onClick={handleLoadUsers}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
        >
          {loading ? "Loading..." : "View All Users"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {users.length > 0 && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loading}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 transition-colors font-medium"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => fetchUsers(page)}
                      disabled={loading}
                      className={`px-3 py-2 rounded font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      } disabled:bg-gray-100`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loading}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:text-gray-400 transition-colors font-medium"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Click &quot;View All Users&quot; to load users
          </p>
        </div>
      )}
    </div>
  );
}
