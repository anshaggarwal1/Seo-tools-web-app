import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Image, Loader2 } from "lucide-react";

type IResult = {
  original: string;
  compressed: File;
  sizeBefore: number;
  sizeAfter: number;
};

type ImageResultCardProps = {
  loading: boolean;
  results: IResult[];
};
const ImageResultCard: FC<ImageResultCardProps> = ({ loading, results }) => {
  const handleDownload = (file: File) => {
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="my-6 max-w-4xl">
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        {loading &&
          [...new Array(2)].map(() => (
            <Skeleton className="w-full h-20 my-3" />
          ))}
        {results.map((result, index) => (
          <div
            key={index}
            className="p-3 md:p-6 bg-gray-100 dark:bg-gray-700 flex flex-wrap md:flex-nowrap items-center w-full gap-x-6 gap-y-2 my-3 rounded"
          >
            <div className="flex gap-2 items-center md:border-r w-full">
              <Image className="text-primary" />
              <p className="text-sm md:text-md max-w-80 truncate ">
                {result.original}
              </p>
            </div>
            <div className="md:border-r w-full">
              <p className="text-xs md:text-md">
                {result.sizeBefore > 1024 * 1024
                  ? `${(result.sizeBefore / (1024 * 1024)).toFixed(2)} MB`
                  : `${(result.sizeBefore / 1024).toFixed(2)} KB`}{" "}
                to{" "}
                {result.sizeAfter > 1024 * 1024
                  ? `${(result.sizeAfter / (1024 * 1024)).toFixed(2)} MB`
                  : `${(result.sizeAfter / 1024).toFixed(2)} KB`}
              </p>
            </div>
            <div className="hidden md:block border-r">
              <p className="text-md mx-3">
                {(
                  ((result.sizeBefore - result.sizeAfter) / result.sizeBefore) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
            <Button
              size={"sm"}
              onClick={() => handleDownload(result.compressed)}
            >
              Download
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ImageResultCard;
