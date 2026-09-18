import clsx from "clsx";

export default function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      className={clsx(
        "relative flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-maroon to-maroon-dark shadow-[0_2px_8px_rgba(74,13,24,0.35)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C12 2 8.5 6.2 8.5 9.6C8.5 11.86 10.07 13.5 12 13.5C13.93 13.5 15.5 11.86 15.5 9.6C15.5 6.2 12 2 12 2Z"
          fill="url(#divasya-flame)"
        />
        <path
          d="M4 17.5C4 17.5 6.5 15.5 12 15.5C17.5 15.5 20 17.5 20 17.5C20 20 16.42 22 12 22C7.58 22 4 20 4 17.5Z"
          fill="#C9962C"
          fillOpacity="0.9"
        />
        <defs>
          <linearGradient id="divasya-flame" x1="12" y1="2" x2="12" y2="13.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6C874" />
            <stop offset="1" stopColor="#C9962C" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
