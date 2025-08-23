import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-midnight text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
