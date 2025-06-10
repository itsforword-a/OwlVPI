"use server"

// This is a placeholder for your database client.
// In a real application, you would import your actual database client (e.g., Supabase, Neon, Prisma).
// For demonstration, we'll use a simple in-memory store (not suitable for production).

// Simulate a database for user data
const usersDb: {
  [key: string]: { role: string; applicationStatus: "pending" | "approved" | "rejected" | "not_submitted" }
} = {}

export async function getUserData(userId: string) {
  // Simulate fetching user data from DB
  await new Promise((resolve) => setTimeout(resolve, 500))
  return usersDb[userId] || { role: "Гость", applicationStatus: "not_submitted" }
}

// This is a helper for other actions to update user status
export async function updateUserApplicationStatus(
  userId: string,
  status: "pending" | "approved" | "rejected" | "not_submitted",
) {
  if (usersDb[userId]) {
    usersDb[userId].applicationStatus = status
  } else {
    usersDb[userId] = { role: "Гость", applicationStatus: status }
  }
}

export async function updateUserRole(userId: string, role: string) {
  if (usersDb[userId]) {
    usersDb[userId].role = role
  } else {
    usersDb[userId] = { role: role, applicationStatus: "not_submitted" }
  }
}
