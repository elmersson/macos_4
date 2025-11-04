import { DefaultContent } from "./window-content/DefaultContent";
import { FinderContent } from "./window-content/FinderContent";
import { MailContent } from "./window-content/MailContent";
import { MusicContent } from "./window-content/MusicContent";
import { PhotosContent } from "./window-content/PhotosContent";
import { SafariContent } from "./window-content/SafariContent";
import { SystemSettingsContent } from "./window-content/SystemSettingsContent";
import { TrashContent } from "./window-content/TrashContent";

type WindowContentProps = {
  appId: string;
  username: string;
};

export function WindowContent({ appId, username }: WindowContentProps) {
  switch (appId) {
    case "system-settings":
      return <SystemSettingsContent username={username} />;
    case "finder":
      return <FinderContent />;
    case "safari":
      return <SafariContent />;
    case "mail":
      return <MailContent />;
    case "photos":
      return <PhotosContent />;
    case "music":
      return <MusicContent />;
    case "trash":
      return <TrashContent />;
    default:
      return <DefaultContent />;
  }
}
