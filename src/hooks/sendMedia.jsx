import React from "react";
import MediaEditor from "./components/MediaEditor";
import useMediaUpload from "./hooks/useMediaUpload";

const App = () => {
  const { media, mediaType, handleMediaPicker, handleMediaClear } = useMediaUpload();
  const [showEditor, setShowEditor] = React.useState(false);

  const handleClose = () => {
    setShowEditor(false);
    handleMediaClear();
  };

  const handleDone = () => {
    console.log("Done clicked");
  };

  const handleSend = (caption) => {
    console.log("Caption sent:", caption);
    console.log("Media:", media);
    console.log("Media Type:", mediaType);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          handleMediaPicker("image"); 
          setShowEditor(true);
        }}
        className="bg-custom text-white px-4 py-2 rounded-lg"
      >
        Open Media Editor
      </button>

      {showEditor && (
        <MediaEditor
          media={media}
          mediaType={mediaType}
          onClose={handleClose}
          onDone={handleDone}
          onSend={handleSend}
        />
      )}
    </div>
  );
};

export default App;