import { cn } from "@/lib/utils";

interface AnimatedInputWrapperProps {
  placeholder: string;
  hasValue?: boolean;
  children: React.ReactNode;
}

export function AnimatedInputWrapper({
  children,
  placeholder,
  hasValue = false,
}: AnimatedInputWrapperProps) {
  return (
    <div className="relative">
      {children}
      <label
        className={cn(
          "pointer-events-none absolute cursor-text px-1 left-2.5 top-2.5 text-sm text-transparent transition-all peer-focus:text-muted-foreground transform origin-left peer-focus:bg-white peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90 rounded-sm",
          hasValue &&
            "text-muted-foreground -top-2 left-2.5 text-xs scale-90 bg-white"
        )}
      >
        {placeholder}
      </label>
    </div>
  );
}
