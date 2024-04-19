import ImageUpload from "@/components/ImageUpload";
import {
  imageCompressorDescription,
  imageCompressorTitle,
} from "@/constants/strings";
import { compressImage } from "@/lib/utils";
import { useState } from "react";
import ImageResultCard from "@/components/ImageResultCard";
import PageContainer from "@/components/PageContainer";
import { IResult } from "@/types";

const ImageCompression = () => {
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);

  const handleImagesCompression = async (images: File[]) => {
    if (loading && showCard) return;
    setShowCard(true);
    setLoading(true);

    const compressedResults = await Promise.all(
      images.map(async (image) => {
        const compressedFile = await compressImage(image, 80); // 80% quality
        return {
          original: image.name,
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
    <PageContainer
      title={imageCompressorTitle}
      subTitle={imageCompressorDescription}
    >
      <ImageUpload
        onSubmit={handleImagesCompression}
        handleReset={handleReset}
      />
      {showCard && <ImageResultCard loading={loading} results={results} />}
    </PageContainer>
  );
};

export default ImageCompression;
