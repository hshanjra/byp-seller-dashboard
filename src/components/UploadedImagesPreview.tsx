import { X } from "lucide-react";

interface Props {
  images?: {
    url: string;
    alt: string;
  }[];
  productId: string;
}

function UploadedImagesPreview({ images, productId }: Props) {
  if (!images || images.length === 0) return null;

  const handleRemove = (url: string) => {
    // Remove image from database as well as from image server

    console.log(url, productId);
  };

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-2 items-center mb-5">
      {images.map((img, i) => (
        <div key={i} className="relative">
          <img
            src={img.url}
            alt="Preview"
            width={400}
            height={400}
            className="max-h-[350px] overflow-hidden object-cover border rounded-lg aspect-square"
            loading="lazy"
          />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            onClick={() => handleRemove(img.url)}
            type="button"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default UploadedImagesPreview;
