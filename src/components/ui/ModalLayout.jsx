const MAX_WIDTHS = {
  sm: 'max-w-sm',
  lg: 'max-w-lg',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};

export default function ModalLayout({ isOpen, maxWidth = 'lg', padding = 'p-10', children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className={`bg-white rounded-[3rem] ${padding} w-full ${MAX_WIDTHS[maxWidth] ?? 'max-w-lg'} shadow-2xl animate-in zoom-in duration-300`}>
        {children}
      </div>
    </div>
  );
}
