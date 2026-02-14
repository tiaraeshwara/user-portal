import { NextRequest, NextResponse } from "next/server";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:8080";

// GET /api/users - Get all users with pagination or search by ID/email
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    let url: string;

    if (userId) {
      // Search by user ID
      url = `${USER_SERVICE_URL}/getuserbyid/${userId}`;
    } else if (email) {
      // Search by email
      url = `${USER_SERVICE_URL}/getuserbyemail/${email}`;
    } else {
      // Get all users with pagination
      url = `${USER_SERVICE_URL}/getusers?page=${page}&pageSize=${pageSize}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Normalize response based on type
    if (userId || email) {
      // Single user search: if it's a user object (has email/firstName), wrap it in { data }
      if (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        (data.email || data.firstName)
      ) {
        return NextResponse.json({ data });
      }
    } else {
      // Get all users: ensure it has data, total, page properties
      if (data && typeof data === "object" && Array.isArray(data)) {
        // If response is just an array, wrap it
        return NextResponse.json({
          data,
          total: data.length,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          totalPages: Math.ceil(data.length / parseInt(pageSize)),
        });
      }

      // If response already has proper structure, ensure data is an array
      if (data && data.data && !Array.isArray(data.data)) {
        data.data = [data.data];
      }
    }

    // For lists or already wrapped responses, return as-is
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${USER_SERVICE_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend returned ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
