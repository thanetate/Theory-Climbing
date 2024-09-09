import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

//we use a POST Request here because we are registering a new user or creating

//define post request handler
export const POST = async (request: NextRequest) => {
  //parse incoming JSON request to get the users data
  const { name, email, password } = await request.json()
  //connect to db
  await dbConnect()
  //password
  //hash the password
  const hashedPassword = await bcrypt.hash(password, 5)
  //create a new instance of the user model with this data
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  })
  try {
    //save to db
    await newUser.save()
    //success
    return Response.json(
      { message: 'User has been created' },
      {
        status: 201,
      }
    )
  } catch (err: any) {
    //error
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    )
  }
}
