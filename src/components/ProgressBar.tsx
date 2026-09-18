export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-sand shadow-[inset_0_1px_2px_rgba(74,13,24,0.12)]">
      <div
        className="h-full rounded-full bg-linear-to-r from-terracotta via-terracotta-light to-gold shadow-[0_0_8px_rgba(201,150,44,0.5)] transition-[width] duration-700 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
