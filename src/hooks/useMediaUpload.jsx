import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMediaUpload = () => {
  const [media, setMedia] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const navigate = useNavigate();

  const handleMediaPicker = (type) => {
    if (typeof document === "undefined") return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept =
      type === "image"
        ? "image/*"
        : type === "video"
        ? "video/*"
        : "application/pdf";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const mediaURL = URL.createObjectURL(file);
        setMedia(mediaURL);
        setMediaType(type);

        navigate("/edit-media", { state: { media: mediaURL, mediaType: type } });
      }
    };

    input.click();
  };
  
  const handleMediaUpload = (file, type) => {
    setMedia(file);
    setMediaType(type);
  };
  const handleMediaClear = () => {
    setMedia(null);
    setMediaType("");
  };


  const handleSendMedia = (caption) => {
    if (!media) return;

    setUploadedMedia({ media, mediaType, caption });

    const encodedMedia = encodeURIComponent(media);
    const encodedType = encodeURIComponent(mediaType);
    console.log(encodedMedia, encodedType);

    if (destination === "message") {
      navigate(`/messages?media=${encodedMedia}&type=${encodedType}`);
    } else if (destination === "post") {
      navigate(`/create-post?media=${encodedMedia}&type=${encodedType}`);
    }
    handleMediaClear();
    alert("Media sent successfully!");
  };


  return { 
     media,
     mediaType, 
     handleMediaPicker, 
     handleMediaClear,
     handleMediaUpload,
     handleSendMedia
    };
};

export default useMediaUpload;
