import PropTypes from "prop-types";

export default function ButtonPrimary({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        "inline-flex w-full sm:w-auto items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold " +
        "bg-gradient-to-r from-primary to-midnight text-white shadow " +
        "transition active:scale-[0.99] disabled:opacity-60 " +
        className
      }
    >
      {children}
    </button>
  );
}

ButtonPrimary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};
