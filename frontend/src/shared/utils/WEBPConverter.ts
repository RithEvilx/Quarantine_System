import Compressor from "compressorjs";

// ——— tiny utilities ———
const renameLike = (orig: File, out: Blob, newExt: string, typeOverride?: string) =>
  new File([out], orig.name.replace(/\.[^./]+$/, "") + newExt, {
    type: typeOverride || (out as File).type || orig.type,
    lastModified: Date.now(),
  });

export const compressTo = (file: File, opts: { mimeType: "image/png" | "image/jpeg"; quality?: number; maxWidth?: number; maxHeight?: number }) =>
  new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      mimeType: opts.mimeType, // force output type
      // quality: opts.quality ?? 0.8, // only affects jpeg/webp - old check
      quality: opts.mimeType === "image/jpeg" ? Math.min(1, Math.max(0.1, opts.quality ?? 0.82)) : undefined,
      maxWidth: opts.maxWidth ?? 1920, // avoid huge canvases
      maxHeight: opts.maxHeight ?? 1920, // ^
      convertSize: Infinity, // never auto-convert to JPEG
      success(result) {
        // Always return a File with a proper extension
        const ext = opts.mimeType === "image/png" ? ".png" : ".jpg";
        resolve(renameLike(file, result, ext, opts.mimeType));
      },
      error: reject,
    });
  });
