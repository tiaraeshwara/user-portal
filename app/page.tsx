import UsersList from "@/components/UsersList";
import UserSearch from "@/components/UserSearch";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            User Management Portal
          </h1>
          <p className="text-gray-600">
            Manage and search users from the user service
          </p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Users List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All Users
              </h2>
              <UsersList />
            </div>
          </div>

          {/* Right Column - Search */}
          <div className="lg:col-span-1">
            <UserSearch />
          </div>
        </div>
      </div>
    </main>
  );
}
