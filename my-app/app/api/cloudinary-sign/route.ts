import { auth } from '@/lib/auth'
import cloudinary from 'cloudinary'

//The purpose of this request is to provide a secure way to uplad files to cloudinary

//POST request with authentication
export const POST = auth(async (req: any) => {
  //check to make sure user is admin
  if (!req.auth || !req.auth.user?.isAdmin) {
    //error
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      }
    )
  }

  //generate a timestamp
  const timestamp = Math.round(new Date().getTime() / 1000)
  //generate a signature
  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    //secrets 
    process.env.CLOUDINARY_SECRET!
  )

  //JSON response
  return Response.json({ signature, timestamp })
}) as any
