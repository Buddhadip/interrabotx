// openai.js
import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config();

const openai = new OpenAI({
  organization: process.env.ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

function isLanguageName(candidate) {
  // List of known programming languages
  const languages = ['c', 'cpp', 'assembly', 'java', 'javascript', 'typescript', 'go', 'swift', 'ruby', 'perl'];

  // Convert candidate to lowercase for case-insensitivity
  const lowercaseCandidate = candidate.toLowerCase();

  // Check if the candidate is in the list of known languages
  return languages.includes(lowercaseCandidate);
}


async function generateCodeCompletion(codeSnippet) {
  console.log("Received codeSnippet:", codeSnippet);
  try {
    // Ensure codeSnippet is a non-null string
    if (typeof codeSnippet !== "string" || codeSnippet.trim() === "") {
      throw new Error("Invalid code snippet");
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: codeSnippet },
      ],
    });

    const completion = chatCompletion.choices[0].message.content;
    console.log(completion);

    return completion;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate code completion");
  }
}

async function generateCode(userInput) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput },
      ],
    });

    const generatedCode = response.choices[0].message.content;
    console.log(generatedCode);

    return generatedCode;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate code");
  }
}

async function generateTestCases(functionSnippet) {
  try {
    // Call the OpenAI API for generating test cases
    const testCases = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: functionSnippet },
      ],
    });

    // Process and return the generated test cases
    const generatedTestCases = testCases.choices[0].message.content;
    console.log(generatedTestCases);
    return generatedTestCases; /* Processed test cases */
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate test cases");
  }
}

async function handleChatResponse(userInput) {
  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userInput },
      ],
    });

    const completion = chatResponse.choices[0].message.content;

    // You can further process the completion if needed

    return completion;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to handle chat response");
  }
}




//=================================================================//
async function generateUnitTestCode(testCodeSnippet) {
  try {
    const unit_test = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: testCodeSnippet },
      ],
    });
    
    const generatedUnitTest = unit_test.choices[0].message.content;
     // Split the content by lines
     const lines = generatedUnitTest.split('\n');
     // Check if the first line looks like a programming language name
     const languageName = lines[0].trim();
     const isLanguage = isLanguageName(languageName);
     // Omit the first line if it looks like a language name
     const generatedUnitTestCode = isLanguage ? lines.slice(1).join('\n') : generatedUnitTest;
     console.log('Language Name:', languageName);
     console.log('Is Language:', isLanguage);
     console.log('Generated Unit Test:', generatedUnitTest);
     console.log('Generated Unit Test Code:', generatedUnitTestCode);
    return generatedUnitTestCode;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate unit test code");
  }
}
//=================================================================//

export {
  generateCodeCompletion,
  generateCode,
  generateTestCases,
  generateUnitTestCode,
  handleChatResponse,
};
