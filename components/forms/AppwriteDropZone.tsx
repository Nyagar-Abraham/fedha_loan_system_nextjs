import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import { ID } from "node-appwrite";
import React, { useState } from "react";
import DropZone, { FileRejection } from "react-dropzone";

import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/appwrite.config";
import { cn } from "@/lib/utils";

import { Input } from "../ui/input";

enum IDS {
  BUCKETID = "678f6351002c5ab7e87e",
}

const AppwriteDropZone = ({
  setFileUrl,
}: {
  setFileUrl: React.Dispatch<React.SetStateAction<ArrayBuffer | undefined>>;
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { toast } = useToast();

  const onDropAccepted = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles[0]);
      const file = acceptedFiles[0];
      setIsUploading(true);

      try {
        const response = await storage.createFile(
          IDS.BUCKETID,
          ID.unique(),
          file
        );

        const fileUlr = await storage.getFileView(IDS.BUCKETID, response.$id);

        console.log("url", fileUlr);
        setFileUrl(fileUlr);

        toast({
          title: `File uploaded successfully`,
          description: `${response.name} if type ${response.mimeType} has been uploaded to Logo Bucket`,
        });
      } catch (error) {
        console.error("File upload failed:", error);
        toast({
          title: `File upload Failed`,
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const onDropRejected = (rejectedfiles: FileRejection[]) => {
    console.log("rejected", rejectedfiles);
    setIsDragOver(false);
  };

  return (
    <div
      className={cn(
        ` ring-1 mt-4 ring-inset ring-orange40/40 min-h-24 rounded-sm  flex flex-col overflow-hidden p-1  `,
        {
          "ring-orange60 ": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1  flex-col items-center justify-center ">
        <DropZone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="flex size-full h-full flex-1 flex-col items-center justify-center rounded-md "
              {...getRootProps()}
            >
              <Input
                className=" bg-dark80-light30  flex-1 rounded-sm  "
                {...getInputProps()}
              />

              {isDragOver ? (
                <MousePointerSquareDashed className=" mb-2 size-6 text-zinc-500" />
              ) : isUploading ? (
                <Loader2 className=" mb-2 size-6 animate-spin text-zinc-500" />
              ) : (
                <ImageIcon className=" mb-2 size-6 text-zinc-500" />
              )}
              <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              {isUploading ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
};

export default AppwriteDropZone;
