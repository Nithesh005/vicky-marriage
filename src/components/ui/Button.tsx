"use client";

import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "paper" | "ghost";
type Size = "md" | "icon";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
};

type ButtonProps = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = Common &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6 text-[11px] font-medium uppercase tracking-[0.22em]",
  icon: "h-12 w-12 shrink-0",
};

const variants: Record<Variant, string> = {
  primary:
    "border border-gold bg-gold text-burgundy hover:border-champagne hover:bg-transparent hover:text-champagne",
  secondary:
    "border border-gold/55 bg-burgundy/60 text-champagne hover:border-champagne hover:bg-transparent",
  paper: "border border-gold/70 bg-transparent text-maroon hover:bg-gold/15",
  ghost: "text-champagne/85 hover:text-ivory",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full transition-[background-color,border-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-45",
    sizes[size],
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.28" />
      <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ButtonContent({ loading, children }: { loading: boolean; children: ReactNode }) {
  return (
    <>
      {loading ? <Spinner /> : null}
      {children}
    </>
  );
}

export function Button(props: ButtonProps | LinkProps) {
  const { children, variant = "primary", size = "md", loading = false, className } = props;
  const classNames = classes(variant, size, className);

  if ("href" in props && typeof props.href === "string") {
    const { href, variant: _variant, size: _size, loading: _loading, className: _className, children: _children, ...rest } = props;
    return (
      <a href={loading ? undefined : href} className={classNames} aria-busy={loading || undefined} {...rest}>
        <ButtonContent loading={loading}>{children}</ButtonContent>
      </a>
    );
  }

  const { variant: _variant, size: _size, loading: _loading, className: _className, children: _children, disabled, ...rest } =
    props as ButtonProps;

  return (
    <button
      type="button"
      className={classNames}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <ButtonContent loading={loading}>{children}</ButtonContent>
    </button>
  );
}
