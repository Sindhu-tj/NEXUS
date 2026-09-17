"use client";

import { useState } from "react";

const navigation = [
  "Dashboard",
  "Models",
  "Chat",
  "RAG",
  "Agents",
  "Documents",
  "Evaluation",
  "Monitoring",
];

export default function Home() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-[#080808] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0b0b0b] p-6 hidden md:block">
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">NEXUS</h1>
          <p className="text-xs text-gray-500 mt-1">
            AI APPLICATION PLATFORM
          </p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition ${
                active === item
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6">
          <p className="text-xs text-gray-600">NEXUS v1.0.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">
          <div>
            <p className="text-sm text-gray-500">Workspace</p>
            <h2 className="text-lg font-medium">{active}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              System Operational
            </div>

            <button className="border border-white/10 rounded-lg px-4 py-2 text-sm hover:bg-white/5">
              Settings
            </button>
          </div>
        </header>

        {/* Content */}
        <section className="p-8 max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] text-gray-500 mb-4">
              NEXUS AI PLATFORM
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Intelligence
              <br />
              infrastructure.
            </h1>

            <p className="text-gray-400 max-w-2xl mt-5 text-lg">
              A production-oriented platform for building, deploying,
              evaluating, and observing intelligent LLM applications.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Stat title="LLM Providers" value="0" />
            <Stat title="Active Agents" value="0" />
            <Stat title="Documents" value="0" />
            <Stat title="Evaluations" value="0" />
          </div>

          {/* Platform modules */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold">Platform Modules</h2>
              <span className="text-xs text-gray-600">FOUNDATION</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Module
                number="01"
                title="Models"
                description="Model providers, routing, configuration and inference."
              />

              <Module
                number="02"
                title="RAG"
                description="Retrieval pipelines, embeddings, vector search and generation."
              />

              <Module
                number="03"
                title="Agents"
                description="Agent orchestration, tools, memory and execution."
              />

              <Module
                number="04"
                title="Documents"
                description="Document ingestion, processing and knowledge management."
              />

              <Module
                number="05"
                title="Evaluation"
                description="Quality evaluation, benchmarks and performance analysis."
              />

              <Module
                number="06"
                title="Monitoring"
                description="Logs, metrics, tracing, latency and system observability."
              />
            </div>
          </div>

          {/* System status */}
          <div className="mt-8 border border-white/10 rounded-xl p-6 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">NEXUS System</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Backend connectivity status
                </p>
              </div>

              <span className="text-sm text-yellow-500">
                Waiting for API connection
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02]">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-semibold mt-3">{value}</p>
    </div>
  );
}

function Module({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition">
      <div className="flex justify-between mb-8">
        <span className="text-xs text-gray-600">{number}</span>
        <span className="text-gray-600 group-hover:text-white transition">
          ↗
        </span>
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="text-sm text-gray-500 leading-6 mt-3">
        {description}
      </p>
    </div>
  );
}