/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const CarPage = async () => {
  const data = await fetch("http://localhost:5000/api/v1/cars")
  const cars = await data.json()

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cars.data.map((car: any) => (
          <Card key={car.id} className="relative w-full pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

            <Image
              src={car.image}
              alt={car.model}
              unoptimized
              width={400}
              height={200}
              className="aspect-video w-full object-cover"
            />

            <CardHeader>
              <CardAction>
                <Badge className="bg-red-500 text-white" variant="secondary">
                  {car.brand}
                </Badge>
              </CardAction>
              <CardTitle className="text-xl font-extrabold">
                {car.model}
              </CardTitle>
              <CardDescription>
                {car.description ||
                  `${car.brand} ${car.model} - Comfortable and reliable rental car.`}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Link href={`/cars/${car.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CarPage
