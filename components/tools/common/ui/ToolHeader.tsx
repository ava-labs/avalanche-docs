import type React from "react"
import Link from "next/link"
import { Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolHeaderProps {
  title: string
  duration: string
  description: string
}

const ToolHeader: React.FC<ToolHeaderProps> = ({ title, duration, description }) => {
  return (
    <div className="space-y-4 mb-4">
      <div className="space-y-2">
        <div className="flex flex-row flex-wrap items-center gap-4">
            <h1 className="text-5xl font-medium">{title}</h1>
            <div className="flex items-center space-x-1 bg-gray-200 dark:bg-gray-800 text-secondary-foreground px-3 py-1 rounded-full text-md">
                <Clock className="w-4 h-4" />
                <span>{duration}</span>
            </div>
            <Link href="https://t.me/+4kKgMmWAknxjY2Ey" target="_blank" rel="noopener noreferrer" className="sm:ml-auto">
                <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Give Feedback
                </Button>
            </Link>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <hr className="border-t border-gray-200 dark:border-gray-700" />
    </div>
  )
}

export default ToolHeader

