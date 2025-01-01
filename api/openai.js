export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST requests are allowed" });
    return;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Add this to your Vercel environment variables

  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: "Missing 'prompt' in request body" });
    return;
  }
  try {
    const APIBody = {
      model: "gpt-3.5-turbo", // Or another valid model like "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    console.log(APIBody)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(APIBody),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error (Raw):", error); // Log the raw response
      res.status(response.status).json({ error: error.error.message });
      return;
    }

    // const data = await response.json();

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Failed to parse OpenAI response:", error);
      res.status(500).json({ error: "Failed to parse OpenAI response" });
      return;
    }

    res.status(200).json(data.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
