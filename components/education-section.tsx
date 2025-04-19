"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function EducationSection() {
  const educationItems = [
    {
      id: 1,
      degree: "Master's in Computer Science",
      institution: "Ocean University",
      period: "2013 - 2015",
      description: "Specialized in web technologies and interactive media design.",
    },
    {
      id: 2,
      degree: "Bachelor's in Information Technology",
      institution: "Coastal College",
      period: "2009 - 2013",
      description: "Focused on software development and user interface design.",
    },
    {
      id: 3,
      degree: "Certificate in UX Design",
      institution: "Design Academy",
      period: "2012",
      description: "Intensive course on user experience principles and practices.",
    },
  ]

  return (
    <div className="space-y-8">
      {educationItems.map((item, index) => (
        <motion.div
          key={item.id}
          className="flex gap-4 md:gap-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <GraduationCap size={20} />
            </div>
            {index < educationItems.length - 1 && (
              <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-blue-100"></div>
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <h3 className="text-xl font-bold text-blue-800">{item.degree}</h3>
                <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{item.period}</span>
              </div>
              <p className="text-blue-700 font-medium mb-3">{item.institution}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
