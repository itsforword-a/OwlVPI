"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, CheckCircle, XCircle } from "lucide-react"
import { submitApplication } from "@/app/actions/application" // Server Action

export default function ApplicationForm({ userId }: { userId: string }) {
  const [formData, setFormData] = useState({
    nickname: "",
    age: "",
    experience: "",
    whyJoin: "",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setMessage("")

    try {
      const result = await submitApplication(userId, formData)
      if (result.success) {
        setStatus("success")
        setMessage(result.message)
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Произошла ошибка при отправке анкеты.")
      console.error("Application submission error:", error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-blue-900/10 border border-blue-500/20 rounded-lg p-8 backdrop-blur-sm max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-blue-300 mb-6 text-center">Заполните анкету для входа</h2>
      <p className="text-gray-200/70 text-sm mb-6 text-center">
        Чтобы получить полный доступ к проекту OwlVPI, пожалуйста, заполните эту короткую анкету.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-blue-300 text-sm font-medium mb-2">
            Ваш игровой никнейм
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors"
              placeholder="Введите никнейм"
            />
          </div>
        </div>

        <div>
          <label htmlFor="age" className="block text-blue-300 text-sm font-medium mb-2">
            Ваш возраст
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="13"
            max="99"
            className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors"
            placeholder="Например, 18"
          />
        </div>

        <div>
          <label htmlFor="experience" className="block text-blue-300 text-sm font-medium mb-2">
            Опыт в военно-политических играх (кратко)
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={3}
            required
            className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors resize-y"
            placeholder="Расскажите о вашем опыте..."
          />
        </div>

        <div>
          <label htmlFor="whyJoin" className="block text-blue-300 text-sm font-medium mb-2">
            Почему вы хотите присоединиться к OwlVPI?
          </label>
          <textarea
            id="whyJoin"
            name="whyJoin"
            value={formData.whyJoin}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-4 py-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-gray-200 placeholder-gray-400/50 focus:outline-none focus:border-blue-400 transition-colors resize-y"
            placeholder="Напишите о своих целях и ожиданиях..."
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === "submitting"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 rounded-lg text-blue-200 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Отправка..." : "Отправить анкету"}
        </motion.button>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-green-400 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {message}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-red-400 flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            {message}
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
