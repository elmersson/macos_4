import { DefaultContent } from "./window-content/default-content";
import { FinderContent } from "./window-content/finder-content";
import { MailContent } from "./window-content/mail-content";
import { MusicContent } from "./window-content/music-content";
import { PhotosContent } from "./window-content/photos-content";
import { SafariContent } from "./window-content/safari-content";
import { SystemSettingsContent } from "./window-content/system-settings-content";
import { TerminalContent } from "./window-content/terminal-content";
import { TrashContent } from "./window-content/trash-content";

type WindowContentProps = {
  appId: string;
  username: string;
};

export function WindowContent({ appId, username }: WindowContentProps) {
  switch (appId) {
    case "system-settings":
      return <SystemSettingsContent username={username} />;
    case "finder":
      return <FinderContent username={username} />;
    case "safari":
      return <SafariContent />;
    case "mail":
      return <MailContent />;
    case "photos":
      return <PhotosContent />;
    case "music":
      return <MusicContent />;
    case "terminal":
      return <TerminalContent username={username} />;
    case "trash":
      return <TrashContent />;
    default:
      return <DefaultContent />;
  }
}
