from typing import Any

from llm.providers.base import BaseLLMProvider


class LLMGeneration:
    """Handles standard LLM text generation in NEXUS."""

    def __init__(self, provider: BaseLLMProvider) -> None:
        self.provider = provider

    async def generate(
        self,
        prompt: str,
        **kwargs: Any,
    ) -> str:
        """Generate a complete response using the configured provider."""

        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty.")

        return await self.provider.generate(
            prompt=prompt,
            **kwargs,
        )