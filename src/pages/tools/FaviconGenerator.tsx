import ImageResultCard from "@/components/ImageResultCard";
import ImageUpload from "@/components/ImageUpload";
import PageContainer from "@/components/PageContainer";
import { faviconDescription, faviconTitle } from "@/constants/strings";
import { generateFavicons } from "@/lib/utils";
import { IResult } from "@/types";
import React, { useState } from "react";

const FaviconGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [results, setResults] = useState<IResult[]>([]);

  const handleImagesCompression = async (images: File[]) => {
    if (loading && showCard) return;
    setShowCard(true);
    setLoading(true);
    const image = images[0];

    await generateFavicons(image); // 80% quality

    setLoading(false);
  };

  const handleReset = () => {
    setLoading(false);
    setShowCard(false);
    setResults([]);
  };

  return (
    <PageContainer title={faviconTitle} subTitle={faviconDescription}>
      <ImageUpload
        onSubmit={handleImagesCompression}
        handleReset={handleReset}
      />
      {showCard && <ImageResultCard loading={loading} results={results} />}
    </PageContainer>
  );
};

export default FaviconGenerator;
