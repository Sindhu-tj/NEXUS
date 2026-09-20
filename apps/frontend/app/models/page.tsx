"use client";

import { useEffect, useState } from "react";

interface Model {
  provider: string;
  model: string;
  status: string;
  type: string;
}

interface ModelsResponse {
  status: string;
  total: number;
  models: Model[];
}

export default function ModelsPage() {
  const [data, setData] = useState<ModelsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchModels() {
      try {
        const response = await fetch("http://127.0.0.1:8000/models/");

        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }

        const result: ModelsResponse = await response.json();
        setData(result);
      } catch (err) {
        setError("Unable to connect to NEXUS API");
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-10 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
            NEXUS Platform
          </p>

          <h1 className="text-4xl font-semibold tracking-tight">
            Model Registry
          </h1>

          <p className="mt-3 text-gray-400">
            Manage and monitor available language model providers.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-gray-300">
            Loading models...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
            {error}
          </div>
        )}

        {data && (
          <>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm text-gray-400">Total Models</p>
                <p className="mt-2 text-3xl font-semibold">{data.total}</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm text-gray-400">API Status</p>
                <p className="mt-2 text-3xl font-semibold text-emerald-400">
                  {data.status}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data.models.map((model) => (
                <div
                  key={`${model.provider}-${model.model}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/50"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {model.type}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        model.status === "available"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-yellow-400/10 text-yellow-300"
                      }`}
                    >
                      {model.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400">{model.provider}</p>

                  <h2 className="mt-2 break-words text-lg font-semibold">
                    {model.model}
                  </h2>

                  <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-500">
                    NEXUS Model Registry
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}