import * as React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    const variantStyles = {
      primary: "bg-[#0050FF] hover:bg-[#0040E0] text-white shadow-md",
      secondary: "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm",
      outline: "bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300",
      dark: "bg-gray-900 hover:bg-black text-white shadow-md"
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-12 px-6",
      icon: "h-10 w-10"
    };

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };