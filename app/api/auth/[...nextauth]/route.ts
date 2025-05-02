import { auth, handlers } from "@/auth" ;

// export const runtime = 'edge'
export const { GET, POST } = handlers            // This is the auth handler that works with AuthJS as per docs

//TEST CODE.  Result: Error: NextResponse.next() was used in a app route handler, this is not supported.
// export const GET = auth(function GET(req) {
//     const { searchParams } = new URL(req.url)
//     const token = searchParams.get('token')
//     console.log("token: ", token)
//     console.log("searchParams: ", searchParams)
// })

// export const POST = handlers.POST

