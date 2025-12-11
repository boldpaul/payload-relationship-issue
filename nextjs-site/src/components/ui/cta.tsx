'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

// Separate CVA for each element with their base styles built-in
const sectionVariants = cva("", {
  variants: {
    variant: {
      1: "bg-[var(--color-white)]",
      2: "bg-[var(--color-black)]",
    },
  },
  defaultVariants: { variant: 1 },
});

const containerVariants = cva(
  "container mx-auto px-4 py-36",  
  {
    variants: {
      variant: {
        1: "text-gray-800 text-center",
        2: "text-white text-center w-12/12 md:w-11/12 lg:w-8/12",
      },
    },
    defaultVariants: { variant: 1 },
  }
);

const textVariants = cva(
  " font-bold pb-12 leading-tight tracking-tighter", 
  {
    variants: {
      variant: {
        1: "w-10/12 mx-auto text-4xl lg:text-8xl ",
        2: "leading-tight text-4xl lg:text-6xl",
      },
    },
    defaultVariants: { variant: 1 },
  }
);

const buttonVariants = cva(
  "btn text-xl px-6 py-2 border-2 rounded-full hover:cursor-pointer transition-colors",  
  {
    variants: {
      variant: {
        1: "border-black text-black hover:bg-black hover:text-white",
        2: "border-white text-white hover:bg-white hover:text-black",
      },
    },
    defaultVariants: { variant: 1 },
  }
);

interface CtaProps extends VariantProps<typeof sectionVariants> {
  text: string;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

export function Cta({ text, buttonText, buttonLink, variant, className }: CtaProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent immediate navigation
    
    posthog.capture('cta_clicked', {
      button_text: buttonText,
      button_link: buttonLink,
      page_url: window.location.href,
    })
    
    // Navigate after a short delay to ensure event is sent
    setTimeout(() => {
      window.location.href = buttonLink
    }, 300)
  }


  return (
    <section className={cn(sectionVariants({ variant }), className)}>
      <div className={containerVariants({ variant })}>
        <p className={textVariants({ variant })}>{text}</p>
        <Link href={buttonLink} className={buttonVariants({ variant })} onClick={handleClick}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
}