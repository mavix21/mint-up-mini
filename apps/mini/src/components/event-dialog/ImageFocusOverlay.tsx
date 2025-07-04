import { X } from "lucide-react";

import { AspectRatio } from "@mint-up/ui/components/aspect-ratio";

interface ImageFocusOverlayProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageFocusOverlay = ({
  isVisible,
  imageUrl,
  onClose,
}: ImageFocusOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div
      className="animate-fade-in absolute inset-0 z-[100] flex items-center justify-center bg-black/90 p-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-scale-in relative h-full max-h-[60vh] w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <AspectRatio ratio={1} className="h-full w-full">
          <div
            className="from-primary/80 to-primary h-full w-full rounded-xl bg-gradient-to-br via-purple-600 bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="h-full w-full rounded-xl bg-black/10" />
          </div>
        </AspectRatio>

        {/* Close button for focused image */}
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-all duration-200 hover:bg-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ImageFocusOverlay;
