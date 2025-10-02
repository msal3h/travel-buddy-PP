import dotenv from "dotenv";
import OpenAI from "openai";


dotenv.config({ path: ".env.local" });



const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const runTest = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: "Say hello to Maryam!",
    });

    console.log(response.output_text);
};

runTest();