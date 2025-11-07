type MailContentProps = {
  // Add any props needed for Mail content
};

export function MailContent({}: MailContentProps) {
  return (
    <div className="h-full rounded-b-lg bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Mail</h2>
      <p className="text-gray-500 dark:text-gray-400">No messages</p>
    </div>
  );
}
