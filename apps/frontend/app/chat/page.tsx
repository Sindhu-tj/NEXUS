"use client";

import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatResponse = {
  status?: string;
  model?: string;
  message?: string;
  response?: string;
  detail?: string;
};

const API_URL = "http://127.0.0.1:8000/chat/";

const DEFAULT_MODEL = "openai/gpt-oss-20b";

function normalizeMarkdown(content: string): string {
  return content
    // Convert LaTeX block delimiters to remark-math format.
    .replace(/\\\[([\s\S]*?)\\\]/g, "$$$1$$")
    // Preserve inline LaTeX delimiters: \( ... \).
    .replace(/\\\(([\s\S]*?)\\\)/g, "\\($1\\)")
    // Remove unnecessary Markdown escaping only.
    .replace(/\\([#*_`|>~-])/g, "$1");
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [model] = useState(DEFAULT_MODEL);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedInput,
          model: model,
        }),
      });

      const data: ChatResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            `API request failed with status ${response.status}`,
        );
      }

      if (!data.response) {
        throw new Error("The API returned an empty response.");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: normalizeMarkdown(data.response),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (requestError) {
      const errorMessage =
        requestError instanceof Error
          ? requestError.message
          : "Unable to connect to the NEXUS Chat API.";

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setInput("");
    setError("");
  }

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-400">
            NEXUS PLATFORM
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                NEXUS Chat
              </h1>

              <p className="mt-4 text-base text-slate-400 md:text-lg">
                Interact with your NEXUS language model API.
              </p>
            </div>

            <div className="w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              API Connected
            </div>
          </div>
        </header>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-slate-400">
                Active model
              </p>

              <p className="mt-1 font-mono text-sm text-cyan-300">
                {model}
              </p>
            </div>

            <button
              type="button"
              onClick={clearChat}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Clear chat
            </button>
          </div>
        </section>

        <section className="mb-6 min-h-[320px] space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8">

          {messages.length === 0 && (
            <div className="flex min-h-[260px] items-center justify-center text-center">
              <div>
                <div className="mb-4 text-4xl text-cyan-300">
                  âœ¦
                </div>

                <h2 className="text-2xl font-semibold text-slate-200">
                  Welcome to NEXUS
                </h2>

                <p className="mt-3 text-sm text-slate-400">
                  Ask a question to start your conversation.
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <article
              key={`${message.role}-${index}`}
              className={`rounded-2xl border p-5 ${
                message.role === "user"
                  ? "ml-auto max-w-3xl border-cyan-400/20 bg-cyan-400/[0.08]"
                  : "mr-auto max-w-5xl border-white/10 bg-black/30"
              }`}
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${
                    message.role === "user"
                      ? "text-cyan-300"
                      : "text-slate-400"
                  }`}
                >
                  {message.role === "user"
                    ? "You"
                    : "NEXUS Assistant"}
                </span>

                <span className="text-xs text-slate-600">
                  {message.role === "user"
                    ? "User message"
                    : "AI response"}
                </span>
              </div>

              {message.role === "user" ? (
                <p className="whitespace-pre-wrap leading-7 text-slate-200">
                  {message.content}
                </p>
              ) : (
                <div className="nexus-markdown">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mb-4 mt-6 text-2xl font-bold text-white">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="mb-3 mt-6 text-xl font-bold text-white">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-5 text-lg font-semibold text-cyan-200">
                          {children}
                        </h3>
                      ),

                      p: ({ children }) => (
                        <p className="mb-4 leading-7 text-slate-300">
                          {children}
                        </p>
                      ),

                      ul: ({ children }) => (
                        <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="mb-4 list-decimal space-y-2 pl-6 text-slate-300">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-7">
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">
                          {children}
                        </strong>
                      ),

                      blockquote: ({ children }) => (
                        <blockquote className="my-4 border-l-4 border-cyan-400 pl-4 italic text-slate-400">
                          {children}
                        </blockquote>
                      ),

                      table: ({ children }) => (
                        <div className="my-5 overflow-x-auto rounded-lg border border-white/10">
                          <table className="min-w-full text-left text-sm">
                            {children}
                          </table>
                        </div>
                      ),

                      th: ({ children }) => (
                        <th className="border-b border-white/10 bg-white/[0.06] px-4 py-3 font-semibold text-cyan-200">
                          {children}
                        </th>
                      ),

                      td: ({ children }) => (
                        <td className="border-b border-white/10 px-4 py-3 text-slate-300">
                          {children}
                        </td>
                      ),

                      code: ({ children, className }) => {
                        const isCodeBlock = Boolean(className);

                        return isCodeBlock ? (
                          <code className="block overflow-x-auto rounded-lg bg-black p-4 font-mono text-sm leading-6 text-cyan-200">
                            {children}
                          </code>
                        ) : (
                          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-cyan-200">
                            {children}
                          </code>
                        );
                      },

                      pre: ({ children }) => (
                        <pre className="my-5 overflow-x-auto rounded-lg border border-white/10">
                          {children}
                        </pre>
                      ),

                      hr: () => (
                        <hr className="my-6 border-white/10" />
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </article>
          ))}

          {isLoading && (
            <div className="mr-auto rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-5 py-4 text-sm text-cyan-300">
              NEXUS is generating a response...
            </div>
          )}
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm leading-6 text-red-300">
            <strong className="font-semibold">
              Request error:
            </strong>{" "}
            {error}
          </div>
        )}

        <form
          onSubmit={sendMessage}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-7"
        >
          <label
            htmlFor="chat-message"
            className="mb-3 block text-sm font-medium text-slate-300"
          >
            Your message
          </label>

          <textarea
            id="chat-message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask NEXUS anything..."
            rows={5}
            disabled={isLoading}
            className="w-full resize-y rounded-xl border border-white/10 bg-black/40 p-4 text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Powered by NEXUS API and Groq
            </p>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? "Generating..." : "Send message"}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}