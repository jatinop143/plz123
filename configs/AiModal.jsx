/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const GenerateCourseLayout_Ai= model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following\nDetail With field as Course Name , Description, Along with Chapter Name, about,\nDuration: Category: 'Programming. Topic: Python, Level Basic, Duration: 1 hours, NoOf Chapters:5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Fundamentals\",\n    \"description\": \"This course provides a comprehensive introduction to Python programming, covering the basics of syntax, data types, variables, operators, control flow, and functions.  It is designed for beginners with no prior programming experience.\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter covers the basics of Python, including its history, applications, and how to install and run Python code.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Variables and Data Types\",\n        \"about\": \"This chapter explains how to declare variables, assign values, and work with different data types such as integers, floats, strings, and booleans.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"This chapter introduces various operators, such as arithmetic, comparison, and logical operators, and explains how to create expressions.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Control Flow\",\n        \"about\": \"This chapter covers conditional statements (if-else, elif) and loops (for, while) to control the flow of program execution.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Functions\",\n        \"about\": \"This chapter introduces the concept of functions, how to define and call them, and how to pass arguments.\",\n        \"duration\": \"15 minutes\"\n      }\n    ],\n    \"duration\": \"1 hour\",\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"noOfChapters\": 5\n  }\n}\n```\n"},
          ],
        },
      ],
    });
    export const GenrateSessionLayout_Ai = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the Advice in Detail on Topic:Advice for depression, Session:'Understanding Depression' ,in JSON Format with field as title, description in detail"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"title\": \"Understanding Depression: A Guide to Recognizing, Accepting, and Managing Your Feelings\",\n  \"description\": {\n    \"introduction\": {\n      \"text\": \"Depression is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is treatable. Understanding depression is the first step towards healing and finding relief. This guide will help you recognize the signs of depression, understand its complexities, and learn how to cope with its challenges.\",\n      \"importance\": \"Knowledge empowers you. By understanding depression, you can demystify the condition and gain a sense of control over your mental health.\"\n    },\n    \"recognizing_symptoms\": {\n      \"text\": \"Depression manifests differently in each individual, but some common symptoms include:\",\n      \"examples\": [\n        \"Persistent sadness, emptiness, or hopelessness\",\n        \"Loss of interest in hobbies and activities you used to enjoy\",\n        \"Changes in appetite or sleep patterns (e.g., weight loss, insomnia, excessive sleeping)\",\n        \"Fatigue or lack of energy\",\n        \"Difficulty concentrating, remembering, or making decisions\",\n        \"Feelings of worthlessness or guilt\",\n        \"Thoughts of death or suicide\",\n        \"Restlessness or irritability\",\n        \"Physical aches and pains\",\n        \"Social withdrawal\"\n      ],\n      \"note\": \"It's important to remember that experiencing some of these symptoms does not automatically mean you have depression. However, if you're experiencing several of these symptoms for a prolonged period, it's crucial to seek professional help.\"\n    },\n    \"understanding_causes\": {\n      \"text\": \"Depression can be caused by a complex interplay of factors, including:\",\n      \"categories\": [\n        {\n          \"title\": \"Biological factors\",\n          \"description\": \"Genetic predisposition, imbalances in brain chemicals (neurotransmitters), and physical illnesses can contribute to depression.\"\n        },\n        {\n          \"title\": \"Environmental factors\",\n          \"description\": \"Stressful life events, trauma, abuse, and social isolation can trigger or exacerbate depression.\"\n        },\n        {\n          \"title\": \"Psychological factors\",\n          \"description\": \"Negative thinking patterns, low self-esteem, and a history of mental health challenges can increase the risk of depression.\"\n        }\n      ],\n      \"emphasis\": \"It's important to understand that you are not to blame for your depression. Many factors contribute to its development, and you can take steps to manage it.\"\n    },\n    \"accepting_your_feelings\": {\n      \"text\": \"Accepting your depression is a crucial step in your journey to recovery. This doesn't mean giving up or surrendering to your feelings, but rather acknowledging them and understanding they are a part of you.\",\n      \"benefits\": [\n        \"Reduces self-judgment and guilt\",\n        \"Allows you to seek help without shame\",\n        \"Creates space for healing and growth\"\n      ],\n      \"tips\": [\n        \"Practice self-compassion\",\n        \"Focus on the positive aspects of your life\",\n        \"Avoid comparing yourself to others\"\n      ]\n    },\n    \"managing_depression\": {\n      \"text\": \"While depression can be challenging, there are many effective ways to manage it. Treatment options typically involve a combination of therapies:\",\n      \"categories\": [\n        {\n          \"title\": \"Therapy\",\n          \"description\": \"Talking therapy, such as cognitive behavioral therapy (CBT), can help you identify and change negative thinking patterns and develop coping strategies.\"\n        },\n        {\n          \"title\": \"Medication\",\n          \"description\": \"Antidepressant medications can help regulate brain chemicals and reduce symptoms. This should be discussed with a medical professional.\"\n        },\n        {\n          \"title\": \"Lifestyle changes\",\n          \"description\": \"Regular exercise, a balanced diet, good sleep hygiene, and engaging in enjoyable activities can have a positive impact on mood and energy levels.\"\n        },\n        {\n          \"title\": \"Support groups\",\n          \"description\": \"Connecting with others who understand your experience can provide valuable support, validation, and coping strategies.\"\n        }\n      ],\n      \"reminder\": \"It's essential to work with a mental health professional to find the most effective treatment plan for your individual needs.\"\n    },\n    \"seeking_professional_help\": {\n      \"text\": \"Don't hesitate to reach out for professional help if you're struggling with depression. A therapist or psychiatrist can provide personalized support and guidance.\"\n      \"resources\": [\n        \"Your primary care physician\",\n        \"Mental health clinics\",\n        \"Online therapy platforms\",\n        \"Crisis hotlines\"\n      ]\n    }\n  }\n}\n```"},
          ],
        },
      ],
    });
  
