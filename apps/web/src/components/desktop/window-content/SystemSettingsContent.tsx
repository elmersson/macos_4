import { ModeToggle } from "../../mode-toggle";

type SystemSettingsContentProps = {
  username: string;
};

export function SystemSettingsContent({
  username,
}: SystemSettingsContentProps) {
  return (
    <div className="h-full overflow-y-auto bg-white p-6 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="mb-4 font-semibold text-2xl text-gray-800 dark:text-gray-100">
        System Settings
      </h2>
      <div className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-200">
          User Account
        </h3>
        <p className="text-gray-600 text-sm dark:text-gray-300">
          Logged in as: {username}
        </p>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🌐</div>
          <span className="font-medium text-sm">Network</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🔔</div>
          <span className="font-medium text-sm">Notifications</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🔒</div>
          <span className="font-medium text-sm">Security</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🎨</div>
          <span className="font-medium text-sm">Appearance</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">⚡</div>
          <span className="font-medium text-sm">Battery</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">📺</div>
          <span className="font-medium text-sm">Display</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🔊</div>
          <span className="font-medium text-sm">Sound</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">⌨️</div>
          <span className="font-medium text-sm">Keyboard</span>
        </div>
        <div className="cursor-pointer rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="mb-2 text-2xl">🖱️</div>
          <span className="font-medium text-sm">Mouse</span>
        </div>
      </div>
    </div>
  );
}
