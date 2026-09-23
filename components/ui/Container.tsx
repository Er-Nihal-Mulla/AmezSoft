import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "wide" | "content";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
};

const containerSizes = {
  wide: "max-w-[1500px]",
  content: "max-w-[1200px]"
} satisfies Record<ContainerSize, string>;

export function containerClassName(size: ContainerSize = "wide", className?: string) {
  return cn("mx-auto w-full px-5 sm:px-6 lg:px-8 xl:px-10", containerSizes[size], className);
}

export function Container({ children, className, size = "wide" }: ContainerProps) {
  return <div className={containerClassName(size, className)}>{children}</div>;
}
