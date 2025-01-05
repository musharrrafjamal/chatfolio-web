import connectDB from "@/lib/mongodb";
import Feedback from "@/model/feedback";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, rating, message, image } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Please provide your feedback before submitting." },
        { status: 400 }
      );
    }
    await connectDB();
    const feedback = await Feedback.create({
      name,
      rating,
      message,
      image,
    });

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully", feedback },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error submitting feedback:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
