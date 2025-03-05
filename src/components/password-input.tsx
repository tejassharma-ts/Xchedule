import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Eye as IconEye, EyeOff as IconEyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  show?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, show = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(show);
    return (
      <div className="relative w-full rounded-md">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
