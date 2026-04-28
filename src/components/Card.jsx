export default function Card({ className = "", children, ...rest }) {
  return (
    <div
      className={
        "rounded-xl border border-ink-100 bg-white shadow-[0_1px_2px_rgba(20,22,28,0.04)] " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}
