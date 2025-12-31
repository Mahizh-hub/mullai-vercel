import { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type FileUploadFieldProps = {
  label: string;
  helperText?: string;
  accept?: string;
  value?: File;
  onChange: (file?: File) => void;
};

export function FileUploadField({
  label,
  helperText,
  accept = "image/png,image/jpeg,image/jpg",
  value,
  onChange,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileName = value?.name ?? "No file selected.";

  return (
    <div className="space-y-3">
      <Label className="text-gray-700">{label}</Label>

      {/* Upload box */}
      <div className="flex items-center rounded-md border bg-white overflow-hidden">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 border-r text-sm text-gray-600 hover:bg-gray-50"
        >
          Browse...
        </button>

        <span className="px-4 text-sm text-gray-500 truncate">{fileName}</span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onChange(file);

          if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
          } else {
            setPreview(null);
          }
        }}
      />

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}

      {/* Image preview */}
      {preview && (
        <div className="pt-2">
          <Image
            src={preview}
            alt="Uploaded preview"
            width={96}
            height={96}
            className="rounded-full border object-cover"
          />
        </div>
      )}
    </div>
  );
}
