type DefaultContentProps = {
  // Add any props needed for default content
};

export function DefaultContent({}: DefaultContentProps) {
  return (
    <div className="flex h-full items-center justify-center rounded-b-lg bg-white dark:bg-gray-900">
      <p className="text-gray-500 dark:text-gray-400">No content available</p>
    </div>
  );
}
