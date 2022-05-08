import "./index.css";
export default function Cta({ type, text }) {
  return (
    <button className={type} id="cta">
      {text}
    </button>
  );
}
