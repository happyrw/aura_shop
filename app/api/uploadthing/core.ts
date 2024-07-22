import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();


export const ourFileRouter = {
    uploadImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(() => { }),
    uploadFile: f(["image", "pdf"])
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;