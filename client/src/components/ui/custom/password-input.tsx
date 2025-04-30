"use client";

import { Input } from "../input";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input ref={ref} type={showPassword ? "text" : "password"} {...props} />
      <button
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 -translate-y-1/2 right-2 text-muted-foreground hover:text-foreground p-2 cursor-pointer"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff aria-hidden="true"></EyeOff>
        ) : (
          <Eye aria-hidden="true"></Eye>
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
