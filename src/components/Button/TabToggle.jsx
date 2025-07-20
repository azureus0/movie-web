const TabToggle = ({ options, active, onChange }) => {
  return (
    <div className="inline-flex rounded-full border border-purple-600 overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm font-medium transition-all rounded-full cursor-pointer ${
            active === opt.value
              ? "bg-purple-600 text-gray-100"
              : "bg-transparent text-gray-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default TabToggle;
