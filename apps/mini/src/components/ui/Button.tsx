interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  className = "",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`mx-auto block w-full max-w-xs rounded-lg bg-[#7C65C1] px-6 py-3 text-white transition-colors hover:bg-[#6952A3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#7C65C1] ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
