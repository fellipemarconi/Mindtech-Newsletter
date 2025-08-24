export const API_URL = import.meta.env.VITE_API_URL || "/";

export async function subscribeEmail(email, { consent = false, signal } = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consent ? { email, consent: true } : { email }),
    signal,
  });

  let data = null;
  if (res.status !== 204) {
    const ct = res.headers.get("content-type") || "";
    const raw = await res.text().catch(() => "");
    if (raw) {
      if (ct.includes("application/json")) {
        try {
          data = JSON.parse(raw);
        } catch {
          /* ignora JSON malformado */
        }
      } else {
        data = { raw };
      }
    }
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      (res.status === 409
        ? "Este e-mail já está inscrito."
        : "Não foi possível concluir sua inscrição agora.");
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
