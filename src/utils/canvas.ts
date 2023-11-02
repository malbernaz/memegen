"use client";

import { Canvas, Image, Object as FabricObject, controlsUtils } from "fabric";

// utility function to avoid cors issues with the image url
async function getImgDataURL(url: string): Promise<string> {
  return new Promise(async (resolve) => {
    const res = await fetch(url);
    const imgBlob = await res.blob();
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);

    reader.readAsDataURL(imgBlob);
  });
}

export type ImageType = {
  url: string;
  width: number;
  height: number;
};

export async function drawBackground(bg: ImageType, canvas: Canvas) {
  const img = await Image.fromURL(await getImgDataURL(bg.url), undefined, {});

  const width = 600;
  const height = width * (bg.height / bg.width);

  canvas.setDimensions({ width, height });

  img.scaleX = canvas.width / img.width;
  img.scaleY = canvas.height / img.height;

  canvas.backgroundImage = img;
}

export function exportCanvas(canvas: Canvas) {
  const link = document.createElement("a");

  link.download = "meme.png";
  link.href = canvas.toDataURL();

  link.click();
  link.remove();
}

export function addControls(obj: FabricObject) {
  obj.controls = {
    ...controlsUtils.createResizeControls(),
    mtr: obj.controls.mtr,
  };
}
