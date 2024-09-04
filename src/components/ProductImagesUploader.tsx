import { Upload, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Product } from "@/types";
import { useCallback } from "react";
import { convertFileToUrl } from "@/lib/utils";

type ImagesUploaderProps = {
  productImages?: Product["productImages"];
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  options?: DropzoneOptions;
};

function ProductImagesUploader({
  productImages,
  files,
  onChange,
  options,
}: ImagesUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...options,
  });

  const handleRemove = (event: React.MouseEvent, fileToRemove: File) => {
    event.stopPropagation();
    if (files) {
      const updatedFiles = files.filter((file: File) => file !== fileToRemove);
      onChange(updatedFiles);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Upload only SVG, JPG, JPEG or PNG.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <img
            alt="Product img"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src="/placeholder.svg"
            width="300"
          />
          {/* Featured Image */}

          {productImages && productImages.length > 0 && (
            <img
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={productImages[0].url}
              width="300"
            />
          )}

          {files && files.length > 0 && (
            <img
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={convertFileToUrl(files[0])}
              width="300"
            />
          )}

          {files && files.length > 0 && (
            <div className="flex gap-2 items-center">
              {files.map((file) => (
                <div key={file.name} className="relative">
                  <img
                    src={convertFileToUrl(file)}
                    width={400}
                    height={400}
                    alt="Uploaded image"
                    className="max-h-[350px] overflow-hidden object-cover border rounded-lg aspect-square"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => handleRemove(e, file)}
                    type="button"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            <button>
              <img
                alt="Product img"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </button>
            <button>
              <img
                alt="Product img"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="/placeholder.svg"
                width="84"
              />
            </button>
            <button
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
              {...getRootProps()}
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
              <input {...getInputProps()} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductImagesUploader;
