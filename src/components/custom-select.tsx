"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@nextui-org/react";

interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

interface SelectValueProps {
  placeholder: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onSelect?: (value: string) => void;
}

const SelectContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
} | null>(null);

export function Select({ children, defaultValue = "", onChange }: SelectProps) {
  const [value, setValue] = React.useState(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleChange = React.useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
      setIsOpen(false);
    },
    [onChange]
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectContext.Provider value={{ value, onChange: handleChange }}>
      <div ref={dropdownRef} className="relative inline-block text-left">
        <Button
          aria-expanded={isOpen}
          className="w-[180px] justify-between"
          role="combobox"
          variant="bordered"
          onClick={() => setIsOpen(!isOpen)}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectValue) {
              return child;
            }

            return null;
          })}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-[180px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              aria-labelledby="options-menu"
              aria-orientation="vertical"
              className="py-1"
              role="menu"
            >
              {React.Children.map(children, (child) => {
                if (
                  React.isValidElement<SelectItemProps>(child) &&
                  child.type === SelectItem
                ) {
                  return React.cloneElement(child, {
                    onSelect: () => handleChange(child.props.value),
                  });
                }

                return null;
              })}
            </div>
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("SelectValue must be used within a Select");
  }

  return <span>{context.value || placeholder}</span>;
}

export function SelectItem({ value, children, onSelect }: SelectItemProps) {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("SelectItem must be used within a Select");
  }

  const isSelected = context.value === value;

  return (
    <div
      className={`${
        isSelected ? "bg-gray-100 text-gray-900" : "text-gray-700"
      } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50`}
      role="menuitem"
      tabIndex={0}
      onClick={() => {
        context.onChange(value);
        onSelect?.(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          context.onChange(value);
          onSelect?.(value);
        }
      }}
    >
      <span
        className={`${isSelected ? "font-medium" : "font-normal"} block truncate`}
      >
        {children}
      </span>
      {isSelected && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              clipRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              fillRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function CustomSelect() {
  const [selectedValue, setSelectedValue] = React.useState("featured");

  return (
    <div className="p-4">
      <Select defaultValue={selectedValue} onChange={setSelectedValue}>
        <SelectValue placeholder="Sort by" />
        <SelectItem value="featured">Featured</SelectItem>
        <SelectItem value="price-low-high">Price: Low to High</SelectItem>
        <SelectItem value="price-high-low">Price: High to Low</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
      </Select>
    </div>
  );
}
