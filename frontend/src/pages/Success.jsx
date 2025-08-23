import Layout from "../components/Layout";
import Card from "../components/Card";
import Brand from "../components/Brand";

function BigCheck() {
  return (
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
  );
}

export default function Success() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  return (
    <Layout>
      <Card className="text-center">
        <BigCheck />
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
        <Brand className="mt-10" />
      </Card>
    </Layout>
  );
}
