import connectDB from "@/lib/mongodb";
import Feedback from "@/model/feedback";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const { name, rating, message, image } = await req.json();

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Please provide your feedback before submitting." },
        { status: 400 }
      );
    }

    const feedback = await Promise.race([
      Feedback.create({
        name,
        rating,
        message,
        image,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Database operation timed out')), 8000)
      )
    ]);

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully", feedback },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error submitting feedback:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit feedback", error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
