import PropTypes from "prop-types";

export default function InputEmail({ value, onChange, id = "email" }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-white/90"
      >
        E-mail
      </label>
      <input
        id={id}
        type="email"
        autoComplete="email"
        placeholder="email@email.com"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/50 bg-black/20 px-4 py-3 text-white placeholder-white/40
                   focus:border-white/80 focus:outline-none"
      />
      <p className="mt-1 text-xs text-white/60">
        Usaremos apenas para enviar a newsletter.
      </p>
    </div>
  );
}

InputEmail.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
};
