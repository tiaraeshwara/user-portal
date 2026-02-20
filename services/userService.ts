import { User, PaginatedResponse, ApiResponse } from "@/types/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

// Get all users with pagination
export async function getAllUsers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<User>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/users?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("******* Response from getUserById:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

// Get user by email
export async function getUserByEmail(
  email: string,
): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
}

// Create a new user
export async function createUser(
  userData: Partial<User>,
): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Update user
export async function updateUser(
  userId: string,
  userData: Partial<User>,
): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Delete user by ID
export async function deleteUser(userId: string): Promise<ApiResponse<null>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
