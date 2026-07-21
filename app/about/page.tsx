import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  "Professional Development",
  "Modern Technologies",
  "Secure & Reliable",
  "Responsive Design",
  "Continuous Support",
]

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          About Us
        </h1>

        <p className="mt-5 text-lg text-muted-foreground">
          We build modern, reliable, and user-focused digital solutions that
          help businesses grow and succeed.
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto mt-8 max-w-4xl">
        <Card>
          <CardContent className="p-2">
            <h2 className="text-2xl font-semibold">Our Mission</h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Our mission is to create secure, fast, and intuitive applications
              using modern technologies while delivering exceptional user
              experiences.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Features */}
      <section className="mt-8">
        <h2 className="text-center text-3xl font-bold">Why Choose Us</h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {features.map((item) => (
            <Card key={item}>
              <CardContent className="flex items-center gap-3 p-2">
                <CheckCircle2 className="text-primary" />

                <span className="font-medium">{item}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-xl border bg-muted/40 p-10 text-center">
        <h2 className="text-3xl font-bold">Have a project in mind?</h2>

        <p className="mt-3 text-muted-foreground">
          Let`s work together and build something amazing.
        </p>

        <Button className="mt-6">Get In Touch</Button>
      </section>
    </main>
  )
}
