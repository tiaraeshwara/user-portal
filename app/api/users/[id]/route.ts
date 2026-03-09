import { NextRequest, NextResponse } from "next/server";

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:8080";

async function parseBackendResponse(response: Response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// PUT /api/users/[id] - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${USER_SERVICE_URL}/update-user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const parsed = await parseBackendResponse(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (typeof parsed === "object" &&
              parsed !== null &&
              "message" in parsed &&
              typeof parsed.message === "string" &&
              parsed.message) ||
            (typeof parsed === "object" &&
              parsed !== null &&
              "error" in parsed &&
              typeof parsed.error === "string" &&
              parsed.error) ||
            `Backend returned ${response.status}`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(parsed ?? { success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const response = await fetch(`${USER_SERVICE_URL}/delete-user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsed = await parseBackendResponse(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (typeof parsed === "object" &&
              parsed !== null &&
              "message" in parsed &&
              typeof parsed.message === "string" &&
              parsed.message) ||
            (typeof parsed === "object" &&
              parsed !== null &&
              "error" in parsed &&
              typeof parsed.error === "string" &&
              parsed.error) ||
            `Backend returned ${response.status}`,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(parsed ?? { success: true, data: null });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
