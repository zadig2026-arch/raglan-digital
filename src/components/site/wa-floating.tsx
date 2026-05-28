import { WaIcon } from "./wa-icon";

export function WaFloating() {
  return (
    <a
      className="wa-floating"
      href="https://wa.me/33752032213"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <span className="wa-ico">
        <WaIcon />
      </span>
      <span className="wa-label">Chat on WhatsApp</span>
    </a>
  );
}
