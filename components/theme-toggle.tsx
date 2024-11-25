"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Button component inline implementation
const Button = ({
  children,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "ghost" | "icon";
  size?: "default" | "icon";
  asChild?: boolean;
  [key: string]: unknown;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    ghost: "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700",
    icon: "p-2",
  };
  const sizes = {
    default: "px-4 py-2",
    icon: "h-8 w-8",
  };
  const Comp = asChild ? "div" : "button";
  return (
    <Comp className={`${baseClasses} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </Comp>
  );
};

// DropdownMenu components inline implementation
const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

const DropdownMenuTrigger = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <div {...props} className="cursor-pointer">
      {children}
    </div>
  );
};

const DropdownMenuContent = ({ children, align }: { children: React.ReactNode; align: "end" }) => {
  return (
    <div
      className={`absolute ${align === "end" ? "right-0" : "left-0"} mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-200`}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
      role="menuitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

// ThemeToggle component with improvements
export function ThemeToggle() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && !event.target.closest('.dropdown-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={toggleDropdown}>
        <Button variant="ghost" size="icon" aria-haspopup="true" aria-expanded={isOpen ? "true" : "false"}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      {isOpen && (
        <DropdownMenuContent align="end" className="dropdown-menu">
          <DropdownMenuItem
            onClick={() => {
              setTheme("light");
              setIsOpen(false); // Close dropdown after selecting
            }}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("dark");
              setIsOpen(false); // Close dropdown after selecting
            }}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("system");
              setIsOpen(false); // Close dropdown after selecting
            }}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
