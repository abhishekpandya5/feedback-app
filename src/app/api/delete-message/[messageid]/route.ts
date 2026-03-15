import UserModel from "@/model/User";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  let messageId = params?.messageid;
  if (!messageId) {
    const pathname = new URL(request.url).pathname;
    messageId = pathname.split("/").pop() || undefined;
  }

  if (!messageId) {
    return Response.json(
      { success: false, message: "Message ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;
  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(_user._id);
    // if (!mongoose.Types.ObjectId.isValid(messageId)) {
    //   return Response.json(
    //     { success: false, message: "Invalid message ID" },
    //     { status: 400 }
    //   );
    // }

    const messageObjectId = new mongoose.Types.ObjectId(messageId);

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageObjectId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { message: "Message not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Message deleted", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return Response.json(
      { message: "Error deleting message", success: false },
      { status: 500 }
    );
  }
}
