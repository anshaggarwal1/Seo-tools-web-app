import ImageResultCard from "@/components/ImageResultCard";
import ImageUpload from "@/components/ImageUpload";
import PageContainer from "@/components/PageContainer";
import { imgToWebpDescription, imgToWebpTitle } from "@/constants/strings";
import { convertImageToWebP } from "@/lib/utils";
import { IResult } from "@/types";
import React, { useState } from "react";

const ImageToWebP = () => {
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);

  const handleImagesConversion = async (images: File[]) => {
    if (loading && showCard) return;
    setShowCard(true);
    setLoading(true);

    const convertedResults = await Promise.all(
      images.map(async (image) => {
        const convertedFile = await convertImageToWebP(image);
        return {
          original: image.name,
          compressed: convertedFile,
          sizeBefore: image.size,
          sizeAfter: convertedFile.size,
        };
      })
    );

    setResults(convertedResults);
    setLoading(false);
  };

  const handleReset = () => {
    setLoading(false);
    setShowCard(false);
    setResults([]);
  };

  return (
    <PageContainer title={imgToWebpTitle} subTitle={imgToWebpDescription}>
      <ImageUpload
        onSubmit={handleImagesConversion}
        handleReset={handleReset}
      />
      {showCard && <ImageResultCard loading={loading} results={results} />}
    </PageContainer>
  );
};

export default ImageToWebP;
