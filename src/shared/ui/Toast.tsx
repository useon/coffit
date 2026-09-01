type ToastPosition = "bottom" | "top";

type ToastProps = {
  message: string;
  position?: ToastPosition;
};

const POSITION_CLASS_NAME: Record<ToastPosition, string> = {
  bottom: "bottom-8",
  top: "top-24",
};

export function Toast({ message, position = "bottom" }: ToastProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${POSITION_CLASS_NAME[position]} z-10 flex justify-center px-4`}
    >
      <p className="flex max-w-md items-center gap-3 rounded-lg bg-slate-900/90 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/20 backdrop-blur">
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-full border border-red-400 text-base leading-none text-red-400"
        >
          !
        </span>
        <span>{message}</span>
      </p>
    </div>
  );
}
