import type { Crop, PixelCrop } from "react-image-crop";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import ReactCrop from "react-image-crop";

import { Button } from "@mint-up/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@mint-up/ui/components/dialog";

interface ImageCropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
}

const ImageCropDialog = ({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
}: ImageCropDialogProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const size = Math.min(width, height);
      const x = (width - size) / 2;
      const y = (height - size) / 2;

      const initialCrop = {
        unit: "px" as const,
        width: size,
        height: size,
        x,
        y,
      };

      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    },
    [],
  );

  const getCroppedImg = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    );

    return new Promise<string>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          resolve(url);
        },
        "image/jpeg",
        0.95,
      );
    });
  }, [completedCrop]);

  const handleCropComplete = async () => {
    const croppedImageUrl = await getCroppedImg();
    if (croppedImageUrl) {
      onCropComplete(croppedImageUrl);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <p className="text-muted-foreground text-sm">
            Select a square area for your event image
          </p>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <div className="bg-muted/10 flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg">
            <ReactCrop
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minWidth={50}
              minHeight={50}
              keepSelection
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            >
              <Image
                ref={imgRef}
                src={imageSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                width={100}
                height={100}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </ReactCrop>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCropComplete}>Apply Crop</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
