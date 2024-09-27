import {
  APIRegisterRequest,
  APIRegisterResponse,
  APIError,
} from "@/types/types";
import { API_AUTH } from "@api/constants";

export async function register({ name, email, password }: APIRegisterRequest) {
  try {
    const response = await fetch(API_AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong registering the user.";
      throw new Error(errorMessage);
    }
    const { data }: { data: APIRegisterResponse } = await response.json();

    if (!data) {
      throw new Error("Error registering user");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
    } else {
      console.error("Unexpected error registering user:", error);
    }
  }
}
