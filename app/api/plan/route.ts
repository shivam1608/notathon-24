import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";

// Define the type for incoming request data
type ScheduleRequestBody = {
  gender: string | undefined;
  activities: string | undefined;
  extra: string | undefined;
};

const client = new Groq({
  apiKey: process.env['GROQ_API_KEY'],
});

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body
    const { gender, activities, extra }: ScheduleRequestBody = await request.json();

    // Type check to ensure no undefined values
    if (!gender || !activities) {
      return NextResponse.json({
        error: "Missing required fields: 'gender', 'activities', or 'extra'.",
      });
    }

    // Construct the prompt for the Groq API
    const prompt = `Generate a timetable for a person with the following details: 
                    gender: ${gender}, 
                    activities: ${activities}, 
                    extra: ${extra}. 
                    Respond only in JSON format no text.
                    Todo list is manditory ans it should always be in string.
                    try to summarize the timetable in todo list
                    This is a strict format.
                    The format should be:
                    {
                      "time_table": {
                        "8am-9am": "GeneratedTask",
                        "etc."
                      },
                      "todo_list": []
                    } 
                    Make sure you add the task by yourself and make it most suitable for the person  
                    `;


    console.log(prompt);
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
    });

    // Parse the response and return it in JSON format
    const responseContent = chatCompletion.choices[0].message.content?.replaceAll('`' , "");

    console.log(responseContent)

    // Check if the response content exists and is valid JSON
    if (!responseContent) {
      return NextResponse.json({
        error: "No content returned from the model.",
      });
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseContent);
    } catch (jsonError) {
      return NextResponse.json({
        error: "Invalid JSON received from the model.",
        details: jsonError,
      });
    }

    return NextResponse.json({
      response: jsonResponse,
    });

  } catch (error) {
    return NextResponse.json({
      error: "An error occurred",
      details: error instanceof Error ? error.message : error,
    });
  }
}
