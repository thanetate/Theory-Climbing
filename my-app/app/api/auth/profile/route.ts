import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import bcrypt from 'bcryptjs'

//this function is used to update the profile section so we use a PUT Request

//Define the put request handler with aut
export const PUT = auth(async (req) => {
  //checking to see if its authenticated
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 })
  }
  //extract user information
  const { user } = req.auth
  //parse the JSON request to get the updated data
  const { name, email, password } = await req.json()
  //connecting to database
  await dbConnect()


  try {
    //find the user document in the database using id
    const dbUser = await UserModel.findById(user._id)
    //error handeling
    if (!dbUser) {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        }
      )
    }
    //update the document with the new data
    dbUser.name = name
    dbUser.email = email

    //password
    //hash it before saving
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password
    
    //save the updated user document and send it back to database
    await dbUser.save()

    //return success message
    return Response.json({ message: 'User has been updated' })
  } catch (err: any) {
    //otherwise error
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}) as any
