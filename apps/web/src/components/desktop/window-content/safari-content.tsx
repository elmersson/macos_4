type SafariContentProps = {
  // Add any props needed for Safari content
};

export function SafariContent({}: SafariContentProps) {
  return (
    <div className="flex h-full flex-col rounded-b-lg bg-white dark:bg-gray-900">
      <div className="border-b p-2 dark:border-gray-700">
        <input
          className="w-full rounded border px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Search or enter website name"
          type="text"
        />
      </div>
      <div className="flex-1 p-6">
        <p className="text-gray-500 dark:text-gray-400">Safari Browser</p>
      </div>
    </div>
  );
}
