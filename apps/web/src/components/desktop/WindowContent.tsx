import { ModeToggle } from "../mode-toggle";

type WindowContentProps = {
  appId: string;
  username: string;
};

export function WindowContent({ appId, username }: WindowContentProps) {
  switch (appId) {
    case "system-settings":
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
    case "finder":
      return (
        <div className="h-full bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">
            Finder
          </h2>
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
    case "safari":
      return (
        <div className="flex h-full flex-col bg-white dark:bg-gray-900">
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
    case "mail":
      return (
        <div className="h-full bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">
            Mail
          </h2>
          <p className="text-gray-500 dark:text-gray-400">No messages</p>
        </div>
      );
    case "photos":
      return (
        <div className="h-full bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">
            Photos
          </h2>
          <p className="text-gray-500 dark:text-gray-400">No photos</p>
        </div>
      );
    case "music":
      return (
        <div className="h-full bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">
            Music
          </h2>
          <p className="text-gray-500 dark:text-gray-400">No songs</p>
        </div>
      );
    case "trash":
      return (
        <div className="h-full bg-white p-6 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">
            Trash
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Trash is empty</p>
        </div>
      );
    default:
      return (
        <div className="flex h-full items-center justify-center bg-white dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No content available
          </p>
        </div>
      );
  }
}
