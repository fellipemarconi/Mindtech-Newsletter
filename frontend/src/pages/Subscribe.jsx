import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Card from "../components/Card.jsx";
import { H1, P } from "../components/Heading.jsx";
import Bullet from "../components/Bullet.jsx";
import InputEmail from "../components/InputEmail.jsx";
import ButtonPrimary from "../components/ButtonPrimary.jsx";
import Brand from "../components/Brand.jsx";
import { subscribeEmail } from "../lib/api.js";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [serverMsg, setServerMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const abortCtrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortCtrlRef.current) abortCtrlRef.current.abort();
    };
  }, []);

  const canSubmit = useMemo(() => {
    return /\S+@\S+\.\S+/.test(email);
  }, [email]);

  async function handleSubmit(e) {
    e.preventDefault();
    setServerMsg("");

    if (!canSubmit) {
      setServerMsg("Informe um e-mail válido.");
      return;
    }

    setLoading(true);

    abortCtrlRef.current = new AbortController();

    try {
      await subscribeEmail(email, { signal: abortCtrlRef.current.signal });

      navigate(`/success?email=${encodeURIComponent(email)}`);
    } catch (err) {
      if (err.name === "AbortError") return;

      if (err.status === 409) {
        setServerMsg("Este e-mail já está inscrito.");
      } else {
        setServerMsg(
          err.message || "Não foi possível concluir sua inscrição agora."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Card>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <H1 className="mb-4">Inscreva-se agora!</H1>
            <P className="mb-6">
              Preencha o formulário abaixo para se inscrever e comece a receber
              nossas atualizações diretamente em sua caixa de entrada.
            </P>

            <div className="space-y-4 mb-8">
              <Bullet title="Guias e Tutoriais">
                Aprenda como implementar e otimizar soluções de IoT para sua
                empresa.
              </Bullet>
              <Bullet title="Notícias e Tendências">
                Fique por dentro das últimas novidades e avanços no mundo do
                IoT.
              </Bullet>
              <Bullet title="Ofertas e Promoções">
                Receba ofertas especiais e promoções exclusivas para assinantes.
              </Bullet>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <InputEmail value={email} onChange={setEmail} />
              <p className="sr-only" aria-live="polite">
                {serverMsg}
              </p>
              {serverMsg && (
                <p className="text-sm text-red-400" role="alert">
                  {serverMsg}
                </p>
              )}
              <ButtonPrimary
                type="submit"
                disabled={loading || !canSubmit}
                className="w-full md:w-auto"
              >
                {loading ? "Enviando..." : "Inscrever-se"}
              </ButtonPrimary>
            </form>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/assets/Imagem.png"
              alt="Ilustração IoT"
              className="w-full max-w-md rounded-3.5xl"
              loading="eager"
            />
          </div>
        </div>

        <Brand className="mt-10" />
      </Card>
    </Layout>
  );
}
