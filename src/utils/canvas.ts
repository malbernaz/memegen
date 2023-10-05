"use client";

import { fabric } from "fabric";

async function getImgDataURL(url: string): Promise<string> {
  return new Promise(async (resolve) => {
    const res = await fetch(url);
    const img = await res.blob();
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.readAsDataURL(img);
  });
}

export type ImageType = {
  url: string;
  width: number;
  height: number;
};

export function drawBackground(bg: ImageType, canvas: fabric.Canvas) {
  return new Promise(async (resolve) => {
    // using this utility function to avoid cors issues with the image url
    fabric.Image.fromURL(await getImgDataURL(bg.url), (img) => {
      const width = 480;
      const height = width * (bg.height / bg.width);

      canvas.setDimensions({ width, height });
      canvas.setBackgroundImage(
        img,
        () => {
          canvas.renderAll();
          resolve(canvas);
        },
        {
          scaleX: canvas.width! / img.width!,
          scaleY: canvas.height! / img.height!,
        },
      );
    });
  });
}

export function exportCanvas(canvas: fabric.Canvas) {
  const link = document.createElement("a");

  link.download = "meme.png";

  link.href = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: "png",
  });

  link.click();
}
