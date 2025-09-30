function FadeWrapper({ show, children }) {
  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        show ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
      }`}
    >
      {children}
    </div>
  );
}
export default FadeWrapper