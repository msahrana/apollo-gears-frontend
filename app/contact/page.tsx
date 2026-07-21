import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    title: "Email",
    value: "support@example.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+880 1700-000000",
    icon: Phone,
  },
  {
    title: "Location",
    value: "Dhaka, Bangladesh",
    icon: MapPin,
  },
]

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero */}

      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>

        <p className="mt-5 text-lg text-muted-foreground">
          Have a question or need help? Send us a message and we will get back
          to you soon.
        </p>
      </section>

      {/* Contact Info */}

      <section className="mt-5 grid gap-5 md:grid-cols-3">
        {contactInfo.map((item) => {
          const Icon = item.icon

          return (
            <Card key={item.title}>
              <CardContent className="p-2 text-center">
                <Icon className="mx-auto h-8 w-8 text-primary" />

                <h3 className="mt-4 font-semibold">{item.title}</h3>

                <p className="mt-2 text-muted-foreground">{item.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Form */}

      <section className="mx-auto mt-6 max-w-2xl">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold">Send Message</h2>

            <form className="mt-6 space-y-5">
              <div>
                <Label>Name</Label>

                <Input placeholder="Your name" className="mt-2" />
              </div>

              <div>
                <Label>Email</Label>

                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Message</Label>

                <Textarea
                  placeholder="Write your message..."
                  className="mt-2"
                  rows={5}
                />
              </div>

              <Button className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
