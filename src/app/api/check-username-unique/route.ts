import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";

// zod syntax
const UsernameQuerySchema = z.object({
  username: userNameValidation
});

// for checking username while typing, if it is availble or not?

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username")
    };

    // validate with zod
    const result = UsernameQuerySchema.safeParse(queryParams);

    console.log("check username result: ", result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameter"
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken"
        },
        {
          status: 500
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available"
      },
      {
        status: 200
      }
    );
  } catch (err) {
    console.error("Error checking username", err);
    return Response.json(
      {
        success: false,
        message: "Error checkig username"
      },
      {
        status: 500
      }
    );
  }
}
