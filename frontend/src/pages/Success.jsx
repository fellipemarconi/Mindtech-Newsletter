import { useMemo, useState } from "react";
import { API_URL } from "../lib/api";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Brand from "../components/Brand";

function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}

export default function Success() {
  const q = useQuery();
  const email = q.get("email") || "";
  const sig = q.get("sig") || "";

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  async function handleDelete() {
    setErr("");
    setLoading(true);
    try {
      if (!email || !sig) {
        throw new Error("Assinatura inválida ou ausente.");
      }

      const url = `${API_URL}?email=${encodeURIComponent(
        email
      )}&sig=${encodeURIComponent(sig)}`;
      const res = await fetch(url, { method: "DELETE" });
      if (res.status !== 204 && !res.ok) {
        const text = await res.text().catch(() => "");
        if (res.status === 401) {
          throw new Error(
            "Assinatura inválida. Refaça a inscrição para gerar um link válido."
          );
        }
        throw new Error(text || "Falha ao excluir e-mail.");
      }
      setDone(true);
    } catch (e) {
      setErr(e.message || "Falha ao excluir e-mail.");
    } finally {
      setLoading(false);
    }
  }

  const showDelete = Boolean(email && sig && !done);

  return (
    <Layout>
      <Card className="text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-white text-primary">
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          Obrigado por se inscrever na nossa newsletter!
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Agora você faz parte da comunidade Mindtech e está a um passo de ficar
          atualizado com as últimas inovações e tendências em Internet das
          Coisas (IoT).
        </p>
        {email && (
          <p className="mt-2 text-white/70">
            Obrigado,{" "}
            <span className="font-semibold text-white">
              {decodeURIComponent(email)}
            </span>
            .
          </p>
        )}

        {showDelete && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="mt-6 inline-flex items-center justify-center rounded-3xl bg-white/10 px-5 py-2 text-white hover:bg-white/15 disabled:opacity-60"
          >
            {loading ? "Excluindo..." : "Excluir meu e-mail"}
          </button>
        )}

        {!sig && !done && (
          <p className="mt-4 text-sm text-white/50">
            Para excluir seu e-mail, acesse por um link válido gerado logo após
            a inscrição.
          </p>
        )}

        {done && (
          <p className="mt-4 text-green-300">
            Seu e-mail foi removido com sucesso.
          </p>
        )}
        {err && <p className="mt-4 text-red-300">{err}</p>}

        <Brand className="mt-10" />
      </Card>
    </Layout>
  );
}
