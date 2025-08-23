import PropTypes from "prop-types";

export default function Brand({ className = "" }) {
  return (
    <div className={"flex justify-center " + className}>
      <img src="/logo-mindtech.svg" alt="Mindtech" className="h-8 opacity-95" />
    </div>
  );
}

Brand.propTypes = {
  className: PropTypes.string,
};
