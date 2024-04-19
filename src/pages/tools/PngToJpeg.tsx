import ImageResultCard from "@/components/ImageResultCard";
import ImageUpload from "@/components/ImageUpload";
import PageContainer from "@/components/PageContainer";
import { pngToJpegDescription, pngToJpegTitle } from "@/constants/strings";
import { convertPngToJpeg } from "@/lib/utils";
import { IResult } from "@/types";
import React, { useState } from "react";

const PngToJpeg = () => {
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);

  const handleImagesCompression = async (images: File[]) => {
    if (loading && showCard) return;
    setShowCard(true);
    setLoading(true);

    const compressedResults = await Promise.all(
      images.map(async (image) => {
        const compressedFile = await convertPngToJpeg(image, 80); // 80% quality
        return {
          original: image.name.replace(/\.[^/.]+$/, ".jpeg"),
          compressed: compressedFile,
          sizeBefore: image.size,
          sizeAfter: compressedFile.size,
        };
      })
    );

    setResults(compressedResults);
    setLoading(false);
  };

  const handleReset = () => {
    setLoading(false);
    setShowCard(false);
    setResults([]);
  };
  return (
    <PageContainer title={pngToJpegTitle} subTitle={pngToJpegDescription}>
      <ImageUpload
        onSubmit={handleImagesCompression}
        handleReset={handleReset}
      />
      {showCard && <ImageResultCard loading={loading} results={results} />}
    </PageContainer>
  );
};

export default PngToJpeg;
