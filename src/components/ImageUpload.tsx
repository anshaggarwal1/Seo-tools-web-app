import React, { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// import { FiUpload } from "react-icons/fi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import RadialProgress from "./ui/progress";
import { Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ImageUploadProps = {
  onSubmit: (images: File[]) => void;
  handleReset: () => void;
};
export default function ImageUpload({
  onSubmit,
  handleReset,
}: ImageUploadProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const uploadImages = async (images: File[]) => {
    setLoading(true);
    setProgress(0);
    setFiles(images);

    const uploadPromises = images.map((image) => {
      const imageUrl = URL.createObjectURL(image);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(imageUrl);
        }, 500);
      });
    });

    Promise.all(uploadPromises).then((uploadedUrls) => {
      setUploadedImages(uploadedUrls as string[]);
      setLoading(false);
    });

    let totalProgress = 0;
    const progressInterval = setInterval(() => {
      totalProgress += 10;
      setProgress(totalProgress);
      if (totalProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 500);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      const selectedImages = Array.from(event.target.files);
      await uploadImages(selectedImages);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      await uploadImages(acceptedFiles);
    }
  }, []);

  const removeSelectedImages = () => {
    setLoading(false);
    setProgress(0);
    setUploadedImages([]);
    handleReset();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Card className="my-6 max-w-4xl">
      <CardHeader>
        <CardTitle className=" mb-3">Upload Image</CardTitle>
      </CardHeader>

      <CardContent>
        <div
          {...getRootProps()}
          className=" flex items-center justify-center w-full"
        >
          <label
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full py-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {loading && (
              <div className=" text-center max-w-md  ">
                <RadialProgress progress={progress} />
                <p className=" text-sm font-semibold">Uploading Picture</p>
                <p className=" text-xs text-gray-400">
                  Do not refresh or perform any other action while the picture
                  is being upload
                </p>
              </div>
            )}

            {!loading && uploadedImages.length === 0 && (
              <div className=" text-center">
                <div className=" border p-2 rounded-md max-w-min mx-auto">
                  <Upload className="text-[1.6em]" />
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Drag an image</span>
                </p>
              </div>
            )}

            {!loading && uploadedImages.length > 0 && (
              <div className=" flex gap-x-6 text-center">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="mb-2">
                    <img
                      width={1000}
                      height={1000}
                      src={image}
                      className="w-full object-contain max-h-16 mx-auto mt-2 mb-3 opacity-70"
                      alt={`uploaded image ${index + 1}`}
                    />
                    <p className="text-sm font-semibold">
                      Picture {index + 1} Uploaded
                    </p>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400">
              Click submit to upload the pictures
            </p>
          </label>

          <Input
            {...getInputProps()}
            id="dropzone-file"
            accept="image/png, image/jpeg"
            type="file"
            className="hidden"
            disabled={loading}
            onChange={handleImageChange}
          />
        </div>
      </CardContent>

      <CardFooter className=" flex items-center justify-end gap-x-2">
        <Button
          onClick={removeSelectedImages}
          type="button"
          variant="secondary"
        >
          Reset
        </Button>

        <Button
          onClick={() => onSubmit(files)}
          disabled={loading}
          size={"sm"}
          className=" text-sm"
        >
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
