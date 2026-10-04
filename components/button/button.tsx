import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * @name button
 * @description Button — performs an action. Variants (Primary, Secondary, Secondary Neutral, Tertiary), three sizes, and an icon-only mode. Colors, typography, radius and focus ring all consume design-system tokens.
 * @type registry:ui
 * @dependencies utils
 *
 * Focus ring: indigo-600, 2px, 4px offset. States: default / hover / focus / pressed / disabled (no loading).
 * Depth: at rest Primary is raised (shadow-sm), Secondary/Neutral sit on shadow-xs, and
 * Tertiary is flat (no resting shadow) — it reads as a muted surface and its hover feedback
 * is a border-default (gray-200) stroke, not a darker fill. On press,
 * active:shadow-[--shadow-inner] REPLACES the outer shadow (same box-shadow property) so the
 * button drops to the surface and recesses in — that swap is the "depth".
 * In dark mode the gray-950 inset vanishes on dark fills, so press uses a stronger black
 * inset (dark:active:shadow-…) to keep the recess readable across every variant.
 * Primary also reverts its fill/border from action.primary-hover back to action.primary
 * (base) on click; the other variants keep their hover appearance under the shadow.
 * Disabled clears all shadow.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-medium rounded-[8px] border border-solid transition-[color,background-color,border-color] duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] touch-manipulation [-webkit-tap-highlight-color:transparent]",
    "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-[var(--indigo-600)]",
    "active:shadow-[var(--shadow-inner)] dark:active:shadow-[inset_0_2px_12px_rgba(0,0,0,0.55)] disabled:pointer-events-none disabled:shadow-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "shadow-sm bg-action-primary border-action-primary text-text-inverse hover:bg-action-primary-hover hover:border-action-primary-hover active:bg-action-primary active:border-action-primary disabled:bg-action-primary-soft disabled:border-action-primary-soft disabled:text-text-inverse",
        secondary:
          "shadow-xs bg-transparent border-action-primary text-action-primary hover:bg-action-primary-soft disabled:border-text-disabled disabled:text-text-disabled",
        neutral:
          "shadow-xs bg-transparent border-border-strong text-text-primary hover:bg-background-light disabled:border-text-disabled disabled:text-text-disabled",
        tertiary:
          "bg-background-muted border-transparent text-text-primary hover:border-border-default disabled:text-text-disabled",
      },
      size: {
        sm: "h-8 px-3 text-[14px] leading-[16px] gap-1.5 [&_svg]:size-4",
        md: "h-10 px-4 text-[14px] leading-[16px] gap-2 [&_svg]:size-4",
        lg: "h-12 px-6 text-[16px] leading-[18px] gap-2 [&_svg]:size-5",
      },
      iconOnly: { true: "px-0", false: "" },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-8" },
      { iconOnly: true, size: "md", class: "w-10" },
      { iconOnly: true, size: "lg", class: "w-12" },
    ],
    defaultVariants: { variant: "primary", size: "md", iconOnly: false },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/** Does this node tree contain any visible text (a non-empty string or a number)? */
function hasTextContent(node: React.ReactNode): boolean {
  if (node == null || typeof node === "boolean") return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (typeof node === "number") return true;
  if (Array.isArray(node)) return node.some(hasTextContent);
  if (React.isValidElement(node)) return hasTextContent((node.props as { children?: React.ReactNode }).children);
  return false;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconOnly, ...props }, ref) => {
    // Dev-only guard: every button needs an accessible name. Icon-only or empty
    // buttons must supply aria-label / aria-labelledby / title — otherwise the
    // button is announced as nothing (axe: button-name).
    if (process.env.NODE_ENV !== "production") {
      const labelled =
        props["aria-label"] != null ||
        props["aria-labelledby"] != null ||
        props.title != null;
      if (!labelled && !hasTextContent(props.children)) {
        console.warn(
          "Button: no accessible name. Provide text children, or pass `aria-label` " +
            "(or `aria-labelledby` / `title`) for an icon-only button."
        );
      }
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
