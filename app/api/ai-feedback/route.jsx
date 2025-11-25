import { FEEDBACK_PROMPT } from "@/service/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

    const {conversation} = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation))

    console.log("Sending to Groq AI...");
    
        try {
            
            const groq = new OpenAI({
                baseURL: "https://api.groq.com/openai/v1",
                apiKey: process.env.GROQ_API_KEY,
            })
            
            const completion = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant", 
                messages: [
                    { role: "user", content: FINAL_PROMPT }
                ],
            })
            
            console.log("✅ Groq response received!");
            return NextResponse.json(completion.choices[0].message)
        } 
        catch(e) {
            console.error("❌ Groq Error:", e);
            
            return NextResponse.json(
                { 
                    error: e.message || "Groq API Error",
                    status: e.status 
                },
                { status: e.status || 500 }
            );
        }
    }

