type MusicContentProps = {
  // Add any props needed for Music content
};

export function MusicContent({}: MusicContentProps) {
  return (
    <div className="h-full bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Music</h2>
      <p className="text-gray-500 dark:text-gray-400">No songs</p>
    </div>
  );
}
