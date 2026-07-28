/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const revalidate = 60

const CarDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params

  const res = await fetch(`http://localhost:5000/api/v1/cars/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    notFound()
  }

  const { data: car } = await res.json()

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Card className="overflow-hidden pt-0">
        <Image
          src={car.image}
          alt={car.name}
          width={1200}
          height={700}
          unoptimized
          className="aspect-video w-full object-cover"
        />

        <CardHeader className="space-y-3">
          <CardAction>
            <Badge className="bg-red-500 hover:bg-green-600">{car.brand}</Badge>
          </CardAction>

          <CardTitle className="text-3xl">{car.name}</CardTitle>

          <CardDescription className="text-xl font-bold">
            Model: {car.model}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">⭐ Rating</span>
              <span>{car.rating}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">⛽ Fuel Type</span>
              <span>{car.fuelType}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">👥 Passenger Capacity</span>
              <span>{car.passengerCapacity}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">🎨 Color</span>
              <span>{car.color}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">🚘 Condition</span>
              <span>{car.condition}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">🏷️ Brand</span>
              <span>{car.brand}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button size="lg" className="w-full">
            Rent Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export async function generateStaticParams() {
  const car = await fetch("http://localhost:5000/api/v1/cars").then((res) =>
    res.json()
  )
  return car?.data.map((c: any) => ({
    id: String(c.id),
  }))
}

export default CarDetailsPage
