import os

from dotenv import load_dotenv
from groq import AsyncGroq


load_dotenv()


class LLMService:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise RuntimeError(
                "GROQ_API_KEY is missing from the .env file."
            )

        self.client = AsyncGroq(api_key=api_key)

    async def generate(
        self,
        message: str,
        model: str = "openai/gpt-oss-20b",
    ) -> str:
        completion = await self.client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": message,
                }
            ],
            temperature=0.7,
            max_tokens=1024,
        )

        return completion.choices[0].message.content or ""