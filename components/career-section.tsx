"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

export default function CareerSection() {
  const careerItems = [
    {
      id: 1,
      title: "Senior Developer",
      company: "Ocean Tech",
      period: "2020 - Present",
      description: "Led development of innovative web applications with focus on performance and user experience.",
    },
    {
      id: 2,
      title: "Web Developer",
      company: "Wave Solutions",
      period: "2017 - 2020",
      description: "Developed responsive websites and applications using modern frameworks and technologies.",
    },
    {
      id: 3,
      title: "Junior Developer",
      company: "Aqua Designs",
      period: "2015 - 2017",
      description: "Assisted in building and maintaining client websites and applications.",
    },
  ]

  return (
    <div className="space-y-8">
      {careerItems.map((item, index) => (
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
              <Briefcase size={20} />
            </div>
            {index < careerItems.length - 1 && (
              <div className="absolute top-12 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-blue-100"></div>
            )}
          </div>

          <div className="flex-1 pb-8">
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
                <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{item.period}</span>
              </div>
              <p className="text-blue-700 font-medium mb-3">{item.company}</p>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
