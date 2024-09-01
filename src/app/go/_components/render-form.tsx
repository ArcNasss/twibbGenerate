"use client";
import { useEffect, useState } from "react";
import { isValidImageUrl } from "@/utils/validator";
import Form from "./form";

export interface Props {
  searchParams: {
    title?: string;
    frameUrl?: string;
    caption?: string;
    slug?: string;
  };
}

export default function RenderForm({ searchParams }: Readonly<Props>) {
  const [customFrameUrl, setCustomFrameUrl] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedFrameUrl = localStorage.getItem("customFrameUrl");
    setCustomFrameUrl(storedFrameUrl || undefined);
    setIsLoading(false); // Set loading to false once data is fetched
  }, []);

  if (isLoading) {
    return (
      <h1 className="text-[36px] font-bold leading-[130%] sm:text-[44px] mb-[18px]">
        <span className="text-yellow-500 animation-pulse">Loading...</span>{" "}
        sabar dikit 🙏
      </h1>
    );
  }

  if (!searchParams.frameUrl) {
    if (!customFrameUrl) {
      return (
        <h1 className="text-[36px] font-bold leading-[130%] sm:text-[44px] mb-[18px]">
          <span className="text-yellow-500">Something went wrong</span> refresh
          sekali lagi 🙏😁
        </h1>
      );
    }

    return (
      <Form searchParams={{ ...searchParams, frameUrl: customFrameUrl }} />
    );
  }

  if (isValidImageUrl(searchParams.frameUrl)) {
    return <Form searchParams={searchParams} />;
  }

  return (
    <h1 className="text-[36px] font-bold leading-[130%] sm:text-[44px] mb-[18px]">
      <span className="text-primary-500">ERROR</span> Invalid frame!
    </h1>
  );
}
