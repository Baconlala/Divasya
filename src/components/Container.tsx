import { ReactNode } from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("mx-auto max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
