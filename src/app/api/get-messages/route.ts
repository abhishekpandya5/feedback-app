import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated"
      },
      { status: 401 }
    );
  }
  //   convert userId again to mongodb id object
  const userId = user._id;

  if (!userId) {
    return Response.json(
      {
        success: false,
        message: "User ID is missing from session"
      },
      { status: 401 }
    );
  }

  try {
    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found"
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: foundUser.messages || []
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in getting messages ", error);
    return Response.json(
      {
        success: false,
        message: "Error in getting messages"
      },
      { status: 500 }
    );
  }
}
