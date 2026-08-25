from typing import Any, AsyncIterator

from llm.providers.base import BaseLLMProvider


class LLMStreaming:
    """Handles streaming LLM responses in NEXUS."""

    def __init__(self, provider: BaseLLMProvider) -> None:
        self.provider = provider

    async def stream(
        self,
        prompt: str,
        **kwargs: Any,
    ) -> AsyncIterator[str]:
        """Stream a response from the configured LLM provider."""

        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty.")

        async for chunk in self.provider.stream(
            prompt=prompt,
            **kwargs,
        ):
            yield chunk