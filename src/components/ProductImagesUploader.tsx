import { Upload, X } from "lucide-react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { cn, convertFileToUrl } from "@/lib/utils";

type ImagesUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  options?: DropzoneOptions;
};

function ProductImagesUploader({
  files,
  onChange,
  options,
}: ImagesUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // check if user has already uploaded files then push new files and update the images array
      if (files) {
        const updatedFiles = [...files, ...acceptedFiles];
        onChange(updatedFiles);
      } else {
        onChange(acceptedFiles);
      }
    },
    [files, onChange]
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

  if (!files || files.length === 0) {
    return (
      <div className="grid gap-2">
        <button
          {...getRootProps()}
          type="button"
          className={cn(
            "flex h-32 w-full items-center justify-center rounded-md border border-dashed",
            {
              "border-sky-500 bg-sky-50": isDragActive,
            }
          )}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <p className="text-sm">
              <span className="text-sky-500">Click to upload</span> or drag and
              drop
            </p>

            <p className="text-xs font-semibold">JPG, JPEG, PNG or WebP</p>
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Upload</span>
          </div>

          <input {...getInputProps()} />
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-2">
      {files && files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
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

          <button
            className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
            {...getRootProps()}
            type="button"
          >
            <Upload className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Upload</span>
            <input {...getInputProps()} />
          </button>
        </div>
      )}

      {/* <div className="grid grid-cols-3 gap-2">
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
      </div> */}
    </div>
  );
}

export default ProductImagesUploader;
