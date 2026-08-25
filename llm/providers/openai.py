from typing import Any, AsyncIterator

from llm.providers.base import BaseLLMProvider


class OpenAIProvider(BaseLLMProvider):
    """LLM provider implementation for OpenAI models."""

    def __init__(
        self,
        model: str,
        api_key: str | None = None,
        **kwargs: Any,
    ) -> None:
        super().__init__(model, **kwargs)
        self.api_key = api_key

    async def generate(
        self,
        prompt: str,
        **kwargs: Any,
    ) -> str:
        """Generate a complete response from the OpenAI model."""

        # OpenAI client integration will be added here.
        raise NotImplementedError(
            "OpenAI generation is not configured yet."
        )

    async def stream(
        self,
        prompt: str,
        **kwargs: Any,
    ) -> AsyncIterator[str]:
        """Stream the OpenAI model response."""

        # OpenAI streaming integration will be added here.
        raise NotImplementedError(
            "OpenAI streaming is not configured yet."
        )
        yield ""

    async def health_check(self) -> bool:
        """Check whether the OpenAI provider is available."""

        # Provider connectivity check will be added here.
        return self.api_key is not None