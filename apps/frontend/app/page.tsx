export default function Home() {
  const cards = [
    {
      title: "LLM",
      description: "Model providers and intelligent model interaction.",
    },
    {
      title: "RAG",
      description: "Retrieval-Augmented Generation and document intelligence.",
    },
    {
      title: "Agents",
      description: "AI agents, tools and orchestration.",
    },
    {
      title: "Evaluation",
      description: "Evaluate and benchmark LLM performance.",
    },
    {
      title: "Security",
      description: "Guardrails and secure AI application workflows.",
    },
    {
      title: "Observability",
      description: "Logs, metrics and tracing for AI systems.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#ffffff",
        padding: "80px 40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#888888",
            fontSize: "14px",
            letterSpacing: "4px",
            marginBottom: "20px",
          }}
        >
          NEXUS AI PLATFORM
        </p>

        <h1
          style={{
            fontSize: "64px",
            margin: "0 0 15px",
            fontWeight: "700",
          }}
        >
          NEXUS
        </h1>

        <p
          style={{
            fontSize: "24px",
            color: "#aaaaaa",
            marginBottom: "60px",
          }}
        >
          Advanced LLM Application Platform
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                border: "1px solid #222222",
                borderRadius: "12px",
                padding: "28px",
                background: "#111111",
                minHeight: "150px",
              }}
            >
              <h2
                style={{
                  margin: "0 0 15px",
                  fontSize: "22px",
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  color: "#888888",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}