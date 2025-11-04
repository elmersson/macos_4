type PhotosContentProps = {
  // Add any props needed for Photos content
};

export function PhotosContent({}: PhotosContentProps) {
  return (
    <div className="h-full bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Photos</h2>
      <p className="text-gray-500 dark:text-gray-400">No photos</p>
    </div>
  );
}
