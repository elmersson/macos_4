type ResizeHandlesProps = {
  windowId: string;
  onResizeStart: (
    e: React.MouseEvent,
    windowId: string,
    direction: string
  ) => void;
};

export function ResizeHandles({ windowId, onResizeStart }: ResizeHandlesProps) {
  return (
    <>
      {/* Corner Handles */}
      <button
        aria-label="Resize window from bottom-right"
        className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "se")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from bottom-left"
        className="absolute bottom-0 left-0 h-4 w-4 cursor-sw-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "sw")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from top-right"
        className="absolute top-0 right-0 h-4 w-4 cursor-ne-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "ne")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from top-left"
        className="absolute top-0 left-0 h-4 w-4 cursor-nw-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "nw")}
        style={{ zIndex: 60 }}
        type="button"
      />

      {/* Edge Handles */}
      <button
        aria-label="Resize window from right"
        className="absolute top-0 right-0 h-[calc(100%-16px)] w-2 cursor-e-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "e")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from left"
        className="absolute top-0 left-0 h-[calc(100%-16px)] w-2 cursor-w-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "w")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from bottom"
        className="absolute bottom-0 left-2 h-2 w-[calc(100%-16px)] cursor-s-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "s")}
        style={{ zIndex: 60 }}
        type="button"
      />
      <button
        aria-label="Resize window from top"
        className="absolute top-0 left-2 h-2 w-[calc(100%-16px)] cursor-n-resize"
        onMouseDown={(e) => onResizeStart(e, windowId, "n")}
        style={{ zIndex: 60 }}
        type="button"
      />
    </>
  );
}
