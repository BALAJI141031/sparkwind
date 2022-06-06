import "./index.css";
export default function Cta({ type, text }) {
  return (
    <button  id="cta "  className="w-40 font-black text-sm cursor-pointer hover:bg-sky-700 hover:bg-violet-600">
      {text}
    </button>
  );
}
