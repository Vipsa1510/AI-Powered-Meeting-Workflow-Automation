import { useState } from "react";

import api from "../services/api";

import UploadBox from "../components/UploadBox";
import SummaryCard from "../components/SummaryCard";
import ActionItemsTable from "../components/ActionItemsTable";
import DecisionList from "../components/DecisionList";
import EmailModal from "../components/EmailModal";


export default function Home() {

  const [data, setData] = useState(null);

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailLoading, setEmailLoading] =
    useState(false);


  // =====================================
  // ANALYZE
  // =====================================

  const analyzeMeeting = async (
    formData
  ) => {

    try {

      setLoading(true);

      const response = await api.post(
        "/meeting/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setEmail("");

      if (response.data.success) {

        setData(response.data.data);

      } else {

        alert(
          response.data.message
        );
      }

    } catch (error) {

      console.error(error);

      alert("Analysis failed");

    } finally {

      setLoading(false);
    }
  };


  // =====================================
  // EMAIL
  // =====================================

  const generateEmail = async () => {

    try {

      setEmailLoading(true);

      const response = await api.post(
        "/meeting/generate-email",
        data
      );

      if (response.data.success) {

        setEmail(
          response.data.email
        );
      }

    } catch (error) {

      console.error(error);

      alert("Email generation failed");

    } finally {

      setEmailLoading(false);
    }
  };


  // =====================================
  // EXPORT MARKDOWN
  // =====================================

  const exportMarkdown = async () => {

    try {

      const response = await api.post(
        "/meeting/export-markdown",
        data
      );

      const markdown =
        response.data.markdown;

      const blob = new Blob(
        [markdown],
        {
          type: "text/markdown"
        }
      );

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;

      a.download =
        "meeting-report.md";

      a.click();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(error);

      alert("Export failed");
    }
  };


  // =====================================
  // COPY SUMMARY
  // =====================================

  const copySummary = () => {

    navigator.clipboard.writeText(
      data.summary
    );

    alert("Summary copied");
  };


  // =====================================
  // COPY EMAIL
  // =====================================

  const copyEmail = () => {

    navigator.clipboard.writeText(
      email
    );

    alert("Email copied");
  };


  return (

    <div className="
      min-h-screen
      bg-[#06152d]
      text-white
    ">

      <div className="
        max-w-6xl
        mx-auto
        px-6
        py-10
      ">

        {/* HEADER */}

        <div className="
          mb-10
          text-center
        ">

          <h1 className="
            text-5xl
            font-bold
            mb-3
          ">
            AI Meeting Assistant
          </h1>

          

        </div>


        {/* INPUT */}

        <div className="
          bg-[#0f223f]
          rounded-2xl
          p-8
          shadow-xl
          border
          border-blue-900
        ">

          <UploadBox
            onSubmit={analyzeMeeting}
          />

        </div>


        {/* LOADING */}

        {
          loading && (

            <div className="mt-6">

              <div className="
                bg-blue-500/20
                border
                border-blue-400
                text-blue-300
                px-5
                py-3
                rounded-xl
                inline-block
              ">
                Processing Meeting...
              </div>

            </div>
          )
        }


        {/* RESULTS */}

        {
          data && (

            <div className="
              space-y-8
              mt-10
            ">

              {/* SUMMARY */}

              <div className="
                bg-[#0f223f]
                rounded-2xl
                p-8
                shadow-xl
                border
                border-blue-900
              ">

                <div className="
                  flex
                  justify-between
                  items-center
                  mb-4
                ">

                  <h2 className="
                    text-3xl
                    font-bold
                  ">
                    Summary
                  </h2>

                  <button
                    onClick={copySummary}
                    className="
                      bg-[#13294d]
                      hover:bg-[#1b3b6f]
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                    "
                  >
                    Copy Summary
                  </button>

                </div>

                <SummaryCard
                  summary={data.summary}
                />

              </div>


              {/* ACTION ITEMS */}

              <div className="
                bg-[#0f223f]
                rounded-2xl
                p-8
                shadow-xl
                border
                border-blue-900
              ">

                <ActionItemsTable
                  items={
                    data.action_items || []
                  }
                />

              </div>


              {/* DECISIONS */}

              <div className="
                bg-[#0f223f]
                rounded-2xl
                p-8
                shadow-xl
                border
                border-blue-900
              ">

                <DecisionList
                  decisions={
                    data.decisions || []
                  }
                />

              </div>


              {/* BUTTONS */}

              <div className="
                flex
                gap-4
                flex-wrap
              ">

                <button
                  onClick={generateEmail}
                  disabled={emailLoading}
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

                  {
                    emailLoading
                      ? "Generating Email..."
                      : "Generate Follow-up Email"
                  }

                </button>


                <button
                  onClick={exportMarkdown}
                  className="
                    bg-[#13294d]
                    hover:bg-[#1b3b6f]
                    transition-all
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    border
                    border-blue-900
                  "
                >
                  Export Markdown
                </button>

              </div>


              {/* EMAIL */}

              {
                email && (

                  <div className="
                    bg-[#0f223f]
                    rounded-2xl
                    p-8
                    shadow-xl
                    border
                    border-blue-900
                  ">

                    <div className="
                      flex
                      justify-between
                      items-center
                      mb-4
                    ">

                      <h2 className="
                        text-3xl
                        font-bold
                      ">
                        Follow-up Email
                      </h2>

                      <button
                        onClick={copyEmail}
                        className="
                          bg-[#13294d]
                          hover:bg-[#1b3b6f]
                          px-4
                          py-2
                          rounded-lg
                          text-sm
                        "
                      >
                        Copy Email
                      </button>

                    </div>

                    <EmailModal
                      email={email}
                    />

                  </div>
                )
              }

            </div>
          )
        }

      </div>

    </div>
  );
}