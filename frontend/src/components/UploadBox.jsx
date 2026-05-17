import {
  useState,
  useRef
} from "react";


export default function UploadBox({ onSubmit }) {

  const [text, setText] = useState("");

  const [file, setFile] = useState(null);

  const [dragActive, setDragActive] =
    useState(false);

  const inputRef = useRef(null);


  // =====================================
  // HANDLE FILE
  // =====================================

  const handleFile = (selectedFile) => {

    if (!selectedFile) return;

    const isValidExtension =
      selectedFile.name.endsWith(".txt") ||
      selectedFile.name.endsWith(".vtt");

    if (!isValidExtension) {

      alert(
        "Only .txt and .vtt files supported"
      );

      return;
    }

    setFile(selectedFile);
  };


  // =====================================
  // REMOVE FILE
  // =====================================

  const removeFile = () => {

    setFile(null);

    if (inputRef.current) {

      inputRef.current.value = "";
    }
  };


  // =====================================
  // CLEAR TEXT
  // =====================================

  const clearText = () => {

    setText("");
  };


  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = () => {

    const formData = new FormData();

    if (text.trim()) {

      formData.append(
        "text",
        text
      );
    }

    if (file) {

      formData.append(
        "file",
        file
      );
    }

    if (!text.trim() && !file) {

      alert(
        "Please upload file or enter transcript"
      );

      return;
    }

    onSubmit(formData);
  };


  // =====================================
  // DRAG EVENTS
  // =====================================

  const handleDrag = (e) => {

    e.preventDefault();
    e.stopPropagation();

    if (
      e.type === "dragenter" ||
      e.type === "dragover"
    ) {

      setDragActive(true);

    } else if (
      e.type === "dragleave"
    ) {

      setDragActive(false);
    }
  };


  // =====================================
  // HANDLE DROP
  // =====================================

  const handleDrop = (e) => {

    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);

    const droppedFiles =
      e.dataTransfer.files;

    if (
      droppedFiles &&
      droppedFiles.length > 0
    ) {

      const selectedFile =
        droppedFiles[0];

      handleFile(selectedFile);

      // UPDATE INPUT FILE NAME
      if (inputRef.current) {

        const dataTransfer =
          new DataTransfer();

        dataTransfer.items.add(
          selectedFile
        );

        inputRef.current.files =
          dataTransfer.files;
      }
    }
  };


  return (

    <div>

      <h2 className="
        text-2xl
        font-semibold
        mb-6
      ">
        Meeting Input
      </h2>


      {/* DRAG DROP AREA */}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-8
          transition-all
          mb-6
          cursor-pointer
          ${
            dragActive
              ? "border-blue-400 bg-blue-500/10"
              : "border-blue-900 bg-[#08172d]"
          }
        `}
      >

        <div className="text-center">

          <p className="
            text-lg
            text-gray-300
            mb-2
          ">
            Drag & Drop Transcript Here
          </p>

          <p className="
            text-sm
            text-gray-500
          ">
            Supports .txt and .vtt files
          </p>

        </div>

      </div>


      {/* TEXTAREA */}

      <div className="relative">

        <textarea
          placeholder="Paste meeting transcript here..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="
            w-full
            h-52
            bg-[#08172d]
            border
            border-blue-900
            rounded-xl
            p-4
            text-white
            outline-none
            focus:border-blue-500
            mb-3
          "
        />

        {
          text && (

            <button
              onClick={clearText}
              className="
                absolute
                top-3
                right-3
                bg-red-500/20
                hover:bg-red-500/40
                text-red-300
                px-3
                py-1
                rounded-lg
                text-sm
              "
            >
              Clear
            </button>
          )
        }

      </div>


      {/* FILE PREVIEW */}

      {
        file && (

          <div className="
            bg-[#08172d]
            border
            border-blue-900
            rounded-xl
            p-4
            mb-6
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="
                text-blue-300
                font-medium
              ">
                Uploaded File
              </p>

              <p className="
                text-gray-400
                mt-1
              ">
                {file.name}
              </p>

            </div>


            <button
              onClick={removeFile}
              className="
                bg-red-500/20
                hover:bg-red-500/40
                text-red-300
                px-4
                py-2
                rounded-lg
              "
            >
              Delete
            </button>

          </div>
        )
      }


      {/* FOOTER */}

      <div className="
        flex
        items-center
        justify-between
        flex-wrap
        gap-4
      ">

        {/* FILE INPUT */}

        <input
          ref={inputRef}
          type="file"
          accept=".txt,.vtt"
          onChange={(e) => {

            const selectedFile =
              e.target.files[0];

            handleFile(selectedFile);
          }}
          className="
            text-gray-300
            file:bg-blue-600
            file:border-none
            file:text-white
            file:px-4
            file:py-2
            file:rounded-lg
            file:mr-4
          "
        />


        {/* ANALYZE BUTTON */}

        <button
          onClick={handleSubmit}
          className="
            bg-blue-600
            hover:bg-blue-500
            transition-all
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "
        >
          Analyze Meeting
        </button>

      </div>

    </div>
  );
}