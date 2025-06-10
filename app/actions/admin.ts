"use server"

import { updateUserApplicationStatus, updateUserRole } from "@/app/actions/user" // Import helpers

// This is a placeholder for your database client and admin logic.
// In a real application, you would import your actual database client and implement proper authorization.

// Simulate a database or ORM (separate from user.ts for admin-specific dummy data)
const applicationsDb: { [key: string]: { data: any; status: "pending" | "approved" | "rejected" } } = {}
const adminUsersDb: {
  [key: string]: { role: string; applicationStatus: "pending" | "approved" | "rejected" | "not_submitted" }
} = {
  user_admin_id: { role: "admin", applicationStatus: "approved" }, // Simulate an admin user
}

// Dummy data for demonstration
if (Object.keys(applicationsDb).length === 0) {
  applicationsDb["user123"] = {
    data: {
      nickname: "PlayerOne",
      age: "20",
      experience: "Опыт в нескольких VPI проектах.",
      whyJoin: "Хочу участвовать в политических интригах.",
    },
    status: "pending",
  }
  // Ensure user123 also exists in the main usersDb for profile page
  // This would be handled by your actual DB in production
  // For now, we'll just assume it's there or created on first login/application
}

export async function getApplications() {
  // In a real app, you'd fetch all pending applications from your database
  // And ensure only authenticated admins can call this.
  // Example with Supabase:
  // const { data, error } = await supabase.from('applications').select('*').eq('status', 'pending');
  // if (error) throw error;
  // return data;

  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay

  // For demonstration, return dummy data
  return Object.entries(applicationsDb).map(([userId, app]) => ({
    id: userId, // Use userId as id for simplicity
    userId: userId,
    nickname: app.data.nickname,
    age: Number.parseInt(app.data.age),
    experience: app.data.experience,
    whyJoin: app.data.whyJoin,
    status: app.status,
    createdAt: new Date().toISOString(), // Dummy date
    updatedAt: new Date().toISOString(), // Dummy date
    userEmail: `${userId}@example.com`, // Dummy email
    userName: `User ${userId}`, // Dummy name
  }))
}

export async function updateApplicationStatus(applicationId: string, newStatus: "approved" | "rejected") {
  // In a real app, update the application status in your database
  // And ensure only authenticated admins can call this.
  // Example with Supabase:
  // const { data, error } = await supabase.from('applications').update({ status: newStatus }).eq('id', applicationId);
  // if (error) throw error;

  await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate network delay

  if (applicationsDb[applicationId]) {
    applicationsDb[applicationId].status = newStatus
    await updateUserApplicationStatus(applicationId, newStatus) // Update user's application status via helper
    console.log(`Application ${applicationId} status updated to ${newStatus}`)
  } else {
    throw new Error("Application not found")
  }
}

// This function is now a wrapper around updateUserRole from user.ts
export async function updateRole(userId: string, newRole: string) {
  await updateUserRole(userId, newRole)
}
