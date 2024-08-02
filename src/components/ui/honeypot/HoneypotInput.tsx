export default function HoneypotInput({ name = "codeId" }: { name?: string }) {
  return (
    <div style={{ opacity: 0, position: "absolute", top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-slate-500">
        Your Code ID
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="focus:border-theme-300 focus:ring-theme-300 relative block w-full appearance-none rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-slate-200 sm:text-sm"
      />
    </div>
  );
}
