import PropTypes from "prop-types";

export function H1({ children, className = "" }) {
  return (
    <h1 className={"text-3xl sm:text-4xl font-bold leading-tight " + className}>
      {children}
    </h1>
  );
}
H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export function P({ children, className = "" }) {
  return (
    <p className={"text-sm sm:text-base text-white/80 " + className}>
      {children}
    </p>
  );
}
P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
