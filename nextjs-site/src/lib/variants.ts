import { cva } from "class-variance-authority";

export const h1Variants = cva(
  // Base styles applied to all variants goes here
  "",
  {
    variants: {
      style: {
        normal: "font-semibold text-3xl tracking-tight",
        displayHero: "font-semibold text-6xl lg:text-8xl text-center tracking-tighter",
      },
    },
    defaultVariants: {
      style: "normal"
    }
  }
);

export const h2Variants = cva(
  "",
  {
    variants: {
      size: {
        normal: "text-xl font-semibold",
        displaySmall: "text-3xl",
        displayLarge: "text-4xl",
      },
      margin: {
        normal: "my-4",
      }
    },
    defaultVariants: {
      size: "normal",
      margin: "normal",
    }
  }
)

export const h3Variants = cva(
  "",
  {
    variants: {
      size: {
        display: "text-2xl",
        larger: "text-4xl lg:text-5xl xl:text-6xl",
      }
    },
    defaultVariants: {
      size: "display",
    }
  }
)

export const pVariants = cva(
  "",
  {
    variants: {
      size: {
        normal: "text-md",
      },
    },
    defaultVariants: {
      size: "normal",
    }
  }
)