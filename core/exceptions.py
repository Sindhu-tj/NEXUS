class NexusException(Exception):
    """Base exception for NEXUS."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class ConfigurationError(NexusException):
    """Raised when configuration is invalid."""


class ModelError(NexusException):
    """Raised when an LLM/model operation fails."""


class RetrievalError(NexusException):
    """Raised when a retrieval operation fails."""


class AgentError(NexusException):
    """Raised when an agent operation fails."""
    