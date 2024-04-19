import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/imageCompression.js

export const compressImage = async (file: File, quality: number) => {
  try {
    const options = {
      maxSizeMB: 2, // Maximum size of the compressed image (1MB in this example)
      maxWidthOrHeight: 800, // Maximum width or height of the compressed image
      useWebWorker: true, // Use Web Workers for faster compression
      quality: quality * 0.01, // Convert quality from percentage to decimal (e.g., 80% becomes 0.8)
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    return file; // Return the original file if compression fails
  }
};

export const convertPngToJpeg = async (
  imageFile: File,
  quality: number
): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const compressedFile = new File(
                    [blob],
                    imageFile.name.replace(/\.[^/.]+$/, ".jpeg"),
                    {
                      type: "image/jpeg",
                      lastModified: Date.now(),
                    }
                  );
                  resolve(compressedFile);
                } else {
                  reject(new Error("Failed to create blob."));
                }
              },
              "image/jpeg",
              quality / 100
            );
          } else {
            reject(new Error("Canvas context not available."));
          }
        };
      } else {
        reject(new Error("Invalid data URL."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const convertImageToWebP = async (imageFile: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to create canvas context."));
      return;
    }

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File(
              [blob],
              `${imageFile.name.replace(/\.[^/.]+$/, "")}.webp`,
              {
                type: "image/webp",
                lastModified: new Date().getTime(),
              }
            );
            resolve(webpFile);
          } else {
            reject(new Error("Failed to convert image to WebP blob."));
          }
        },
        "image/webp",
        0.8 // WebP quality (0-1)
      );
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = URL.createObjectURL(imageFile);
  });
};

export const generateFavicons = async (logoFile: File) => {
  if (!logoFile) {
    alert("Please upload a logo image.");
    return;
  }

  const sizes = [
    { name: "android-icon-36x36.png", width: 36 },
    { name: "android-icon-48x48.png", width: 48 },
    { name: "android-icon-192x192.png", width: 192 },
    { name: "apple-icon-57x57.png", width: 57 },
    { name: "apple-icon-60x60.png", width: 60 },
    { name: "apple-icon-72x72.png", width: 72 },
    { name: "apple-icon-76x76.png", width: 76 },
    { name: "apple-icon-120x120.png", width: 120 },
    { name: "apple-icon-152x152.png", width: 152 },
    { name: "apple-icon-180x180.png", width: 180 },
    { name: "favicon-16x16.png", width: 16 },
    { name: "favicon-32x32.png", width: 32 },
    { name: "favicon-96x96.png", width: 96 },
    { name: "ms-icon-70x70.png", width: 70 },
    { name: "ms-icon-144x144.png", width: 144 },
    { name: "ms-icon-150x150.png", width: 150 },
    { name: "ms-icon-310x310.png", width: 310 },
  ];

  const zip = new JSZip();

  await Promise.all(
    sizes.map(async (size) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = size.width;
      canvas.height = size.width;

      const img = new Image();
      img.src = URL.createObjectURL(logoFile);
      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx?.drawImage(img, 0, 0, size.width, size.width);
          const faviconBlob = canvas.toDataURL("image/png");
          const base64Data = faviconBlob.replace(
            /^data:image\/(png|jpg);base64,/,
            ""
          );
          zip.file(size.name, base64Data, { base64: true });
          resolve();
        };
      });
    })
  );

  // Generate the zip file as a Blob
  zip.generateAsync({ type: "blob" }).then((blob) => {
    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "favicons.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
