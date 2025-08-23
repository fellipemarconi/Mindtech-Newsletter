import PropTypes from "prop-types";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-3.5xl shadow-card border border-black/10 bg-black " +
        "bg-[radial-gradient(ellipse_at_center,_#165CDE_0%,_#000000_70%)] " +
        "p-8 sm:p-10 " +
        className
      }
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
