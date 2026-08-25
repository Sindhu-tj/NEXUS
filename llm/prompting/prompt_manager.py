from pathlib import Path
from typing import Dict


class PromptManager:
    """Manages reusable prompts for NEXUS."""

    def __init__(self, prompts_dir: str = "prompts") -> None:
        self.prompts_dir = Path(prompts_dir)

    def load(self, name: str) -> str:
        """Load a prompt from a text file."""
        path = self.prompts_dir / f"{name}.txt"

        if not path.exists():
            raise FileNotFoundError(f"Prompt not found: {path}")

        return path.read_text(encoding="utf-8").strip()

    def format(self, name: str, **variables: str) -> str:
        """Load and format a prompt with variables."""
        prompt = self.load(name)

        try:
            return prompt.format(**variables)
        except KeyError as exc:
            raise ValueError(
                f"Missing prompt variable: {exc.args[0]}"
            ) from exc

    def exists(self, name: str) -> bool:
        """Check whether a prompt exists."""
        return (self.prompts_dir / f"{name}.txt").exists()

    def list_prompts(self) -> Dict[str, str]:
        """Return available prompt names."""
        if not self.prompts_dir.exists():
            return {}

        return {
            path.stem: str(path)
            for path in self.prompts_dir.glob("*.txt")
        }