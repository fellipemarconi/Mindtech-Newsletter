import PropTypes from "prop-types";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Bullet({ title, children }) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primaryLight text-primary">
        <CheckIcon />
      </span>
      <div className="text-white/90">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-white/80">{children}</p>
      </div>
    </div>
  );
}

Bullet.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
