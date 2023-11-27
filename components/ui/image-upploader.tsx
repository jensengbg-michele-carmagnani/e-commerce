"use client";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";
import { Button } from "./button";
import { ImagePlus, ImagePlusIcon, Trash } from "lucide-react";

interface ImageUplaodPorps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUploader: React.FC<ImageUplaodPorps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  console.log("Value",value);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
            key={url}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
                <Image
                  className="object-cover"
                  width={"200"}
                  height={"200"}
                  src={url}
                  alt={url}
                />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="xy2gip9q">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              variant={"secondary"}
              onClick={onClick}
              type="button"
              disabled={disabled}
            >
              <ImagePlus className="h-4 w-4 mr-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUploader;
