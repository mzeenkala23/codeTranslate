import { OpenAIStream } from "ai";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { inputCode, inputLanguage, outputLanguage, apiKey } =
      await req.json();
    const config = new Configuration({
      apiKey,
    });

    const openai = new OpenAIApi(config);

    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `You understand all programming language and can translate the "${inputLanguage}" code to "${outputLanguage}" code.
        

        Example translating from JavaScript to Python:
  
        JavaScript code:
        for (let i = 0; i < 10; i++) {
          console.log(i);
        }
    
        Python code:
        for i in range(10):
          print(i)
        
        ${inputLanguage} code:
        ${inputCode}
  
        ${outputLanguage} code:

        Do not include \`\`\`
       `,
      },
    ];

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    return new Response(stream);
  } catch (error) {
    console.error(error);
  }
}
