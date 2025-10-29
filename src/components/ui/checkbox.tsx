import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // ↓ fixed height/width and alignment
      "peer h-4 w-0 shrink-0 rounded-sm border border-green-400 bg-white ring-offset-background " +
        "data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 " +
        "data-[state=checked]:text-white focus-visible:outline-none focus-visible:ring-2 " +
        "focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed " +
        "disabled:opacity-50 transition-colors hover:border-green-500",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
