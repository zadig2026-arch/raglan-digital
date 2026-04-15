"use client";

import Image from "next/image";
import { useState } from "react";

type Expression =
  | "happy"
  | "smile"
  | "laugh"
  | "neutral"
  | "surprised"
  | "skeptical"
  | "worried"
  | "sad"
  | "frustrated"
  | "angry"
  | "illustration";

interface ZagExpressionProps {
  defaultExpression: Expression;
  hoverExpression: Expression;
  size?: number;
  className?: string;
  alt?: string;
}

export function ZagExpression({
  defaultExpression,
  hoverExpression,
  size = 80,
  className = "",
  alt = "Zadig",
}: ZagExpressionProps) {
  const [hovered, setHovered] = useState(false);

  const src = (expr: Expression) =>
    expr === "illustration"
      ? `/images/expressions/zag-illustration.png`
      : `/images/expressions/zag-${expr}.png`;

  return (
    <div
      className={`relative inline-block shrink-0 cursor-default ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src(defaultExpression)}
        alt={alt}
        width={size}
        height={size}
        className="rounded-2xl object-cover absolute inset-0 w-full h-full transition-opacity duration-500 ease-out"
        style={{ opacity: hovered ? 0 : 1 }}
      />
      <Image
        src={src(hoverExpression)}
        alt={`${alt} — hover`}
        width={size}
        height={size}
        className="rounded-2xl object-cover absolute inset-0 w-full h-full transition-opacity duration-500 ease-out"
        style={{ opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}
