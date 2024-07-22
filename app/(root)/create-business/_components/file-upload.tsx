import { UploadDropzone } from '@/lib/uploadthing';
import "@uploadthing/react/styles.css";
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface FileProps {
    onChange: (urls: string[] | string) => void;
    value: string[] | string;
    endpoint: "uploadImage" | "uploadFile";
    category: "profile" | "image";
}

const FileUpload = ({
    onChange,
    value,
    endpoint,
    category,
}: FileProps) => {
    const [imageUrls, setImageUrls] = useState<string[]>(Array.isArray(value) ? value : [value]);

    useEffect(() => {
        setImageUrls(Array.isArray(value) ? value : [value]);
    }, [value]);

    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const removeImage = (index: number) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls);
        onChange(category === 'profile' ? (newUrls[0] || '') : newUrls);
    };

    return (
        <>
            {category === "profile" ? (
                imageUrls.length > 0 && imageUrls.some(isValidUrl) ? (
                    imageUrls.map((url, index) => (
                        isValidUrl(url) && (
                            <div key={index} className='flex justify-center'>
                                <div className='relative h-20 w-20 bg-slate-300 rounded-full'>
                                    <Image
                                        fill
                                        src={url}
                                        alt='Upload'
                                        className='rounded-full object-cover'
                                    />
                                    <button
                                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                                        type='button'
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className='h-4 w-4' />
                                    </button>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <UploadDropzone
                        endpoint={endpoint}
                        appearance={{
                            button: {
                                padding: "5px",
                                color: "#fff",
                                fontSize: "10px",
                            },
                            container: {
                                width: "100%",
                                height: "140px",
                                padding: "10px",
                                display: "flex",
                                cursor: "pointer"
                            },
                            allowedContent: {
                                fontSize: "10px",
                                color: "black",
                            },
                            uploadIcon: {
                                color: "blue",
                            },
                            label: {
                                display: "none"
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            const newUrl = res?.[0].url;
                            const newUrls = [...imageUrls, newUrl];
                            setImageUrls(newUrls);
                            onChange(category === 'profile' ? newUrl : newUrls);
                        }}
                        onUploadError={(error: Error) => {
                            console.log(error);
                        }}
                    />
                )
            ) : (
                <>
                    <div className='flex flex-wrap gap-4'>
                        {imageUrls.map((url, index) => (
                            isValidUrl(url) && (
                                <div key={index} className='relative w-[100px] h-[100px] bg-slate-300 rounded-xl'>
                                    <Image src={url} alt='upload image' fill className="object-cover rounded-xl" />
                                    <button
                                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                                        type='button'
                                        onClick={() => removeImage(index)}
                                    >
                                        <X className='h-4 w-4' />
                                    </button>
                                </div>
                            )
                        ))}
                    </div>
                    <UploadDropzone
                        endpoint={endpoint}
                        appearance={{
                            button: {
                                padding: "5px",
                                color: "#fff",
                                fontSize: "10px",
                            },
                            container: {
                                width: "100%",
                                height: "140px",
                                padding: "10px",
                                display: "flex",
                                cursor: "pointer"
                            },
                            allowedContent: {
                                fontSize: "10px",
                                color: "black",
                            },
                            uploadIcon: {
                                color: "blue",
                            },
                            label: {
                                display: "none"
                            }
                        }}
                        onClientUploadComplete={(res) => {
                            const newUrl = res?.[0].url;
                            const newUrls = [...imageUrls, newUrl];
                            setImageUrls(newUrls);
                            onChange(newUrls);
                        }}
                        onUploadError={(error: Error) => {
                            console.log(error);
                        }}
                    />
                </>
            )}
        </>
    );
};

export default FileUpload;
