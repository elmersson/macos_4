type FinderContentProps = {
  // Add any props needed for Finder content
};

export function FinderContent({}: FinderContentProps) {
  return (
    <div className="h-full bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Finder</h2>
      <div className="space-y-2">
        <div className="rounded p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          📁 Documents
        </div>
        <div className="rounded p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          📁 Downloads
        </div>
        <div className="rounded p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          📁 Desktop
        </div>
        <div className="rounded p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
          📁 Applications
        </div>
      </div>
    </div>
  );
}
