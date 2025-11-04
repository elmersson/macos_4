type TrashContentProps = {
  // Add any props needed for Trash content
};

export function TrashContent({}: TrashContentProps) {
  return (
    <div className="h-full bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Trash</h2>
      <p className="text-gray-500 dark:text-gray-400">Trash is empty</p>
    </div>
  );
}
