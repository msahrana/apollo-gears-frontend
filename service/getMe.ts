// "use server"

// import { cookies } from "next/headers"

// export const getMe = async () => {
//   const cookieStore = await cookies()

//   const token = cookieStore.get("accessToken")?.value

//   if (!token) return null

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/auth/me`, {
//     headers: {
//       Authorization: token,
//     },
//     cache: "no-store",
//   })

//   return res.json()
// }
