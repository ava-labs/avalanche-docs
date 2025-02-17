"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Check, X } from "lucide-react"
import Link from "next/link"

export function PrivacyPolicyBox() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Shield className="w-5 h-5" />
          Privacy Policy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          We respect your privacy and are committed to protecting your personal data. This privacy policy will inform
          you about how we look after your personal data and tell you about your privacy rights.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <Button variant="ghost" className="flex-1 mr-2" onClick={() => console.log("Accepted")}>
            <Check className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button variant="ghost" className="flex-1 ml-2" onClick={() => console.log("Declined")}>
            <X className="w-4 h-4 mr-2" />
            Decline
          </Button>
        </div>
        <Button variant="outline" asChild className="w-full">
          <Link href="/full-privacy-policy">Read full policy</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}