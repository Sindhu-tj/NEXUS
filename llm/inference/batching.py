from typing import Any, Sequence

from llm.providers.base import BaseLLMProvider


class LLMBatching:
    """Handles batch LLM generation in NEXUS."""

    def __init__(self, provider: BaseLLMProvider) -> None:
        self.provider = provider

    async def generate_batch(
        self,
        prompts: Sequence[str],
        **kwargs: Any,
    ) -> list[str]:
        """Generate responses for multiple prompts."""

        if not prompts:
            return []

        for prompt in prompts:
            if not prompt or not prompt.strip():
                raise ValueError("Prompts cannot be empty.")

        responses = []

        for prompt in prompts:
            response = await self.provider.generate(
                prompt=prompt,
                **kwargs,
            )
            responses.append(response)

        return responses