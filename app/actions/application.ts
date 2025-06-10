"use server"

import { updateUserApplicationStatus } from "@/app/actions/user" // Import helper to update user status

interface ApplicationData {
  nickname: string
  age: string
  experience: string
  whyJoin: string
}

// Simulate a database or ORM for applications
const applicationsDb: { [key: string]: { data: ApplicationData; status: "pending" | "approved" | "rejected" } } = {}

export async function submitApplication(userId: string, formData: ApplicationData) {
  // Simulate a delay for network request
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you'd save this to your database
  // const { data, error } = await supabase.from('applications').insert({ userId, ...formData, status: 'pending' });
  // if (error) throw error;

  // Simulate saving to in-memory DB
  applicationsDb[userId] = { data: formData, status: "pending" }
  await updateUserApplicationStatus(userId, "pending") // Update user's application status via helper

  console.log(`Application submitted for user ${userId}:`, formData)

  return { success: true, message: "Анкета успешно отправлена на рассмотрение!" }
}
