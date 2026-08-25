import re


def sanitize_input(text: str) -> str:
    """Basic input sanitization."""

    if not isinstance(text, str):
        raise TypeError("Input must be a string.")

    return re.sub(r"\s+", " ", text).strip()


def validate_input_length(text: str, max_length: int = 12000) -> None:
    """Validate maximum input length."""

    if len(text) > max_length:
        raise ValueError(
            f"Input exceeds maximum length of {max_length} characters."
        )