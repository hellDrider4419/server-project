import Form from "@rjsf/material-ui";
import { useAlert } from "react-alert";
import writeUserData, { retriveData } from "../firebasseconfig.js";
import { useState } from "react";

let schema = {
  definitions: {
    PostDetails: {
      type: "object",
      properties: {
        "Post Data": { type: "string" },
        Color: { type: "string" },
        "Background color": { type: "string" },
        "Content type": {
          type: "string",
          enum: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "division",
            "paragraph",
            "image",
            "html",
            "video",
          ],
        },
        Position: { type: "string", enum: ["left", "right", "center"] },
        Css: { type: "string" },
      },
      required: ["Post Data", "Position", "Content type"],
    },
  },
  title: "Add Post",
  description: "Enter data to save the post details",
  type: "object",
  properties: {
    "Post Title": {
      type: "string",
    },
    "Featured Media URL": {
      type: "string",
    },
    Category: {
      type: "array",
      items: {
        type: "string",
      },
    },
    Tags: {
      type: "array",
      items: {
        type: "string",
      },
    },
    "Post Type": {
      type: "string",
      enum: ["short", "news", "large"],
    },
    Author: {
      type: "string",
    },
    "Post Content": {
      type: "array",
      items: {
        $ref: "#/definitions/PostDetails",
      },
    },
  },
  required: ["Post Title", "Author", "Featured Media URL", "Category"],
};

// console.log("please fill the post data");
export default function PostForm(props) {
  let [updateData, setUpdateData] = useState({});
  let [willUpdate, setWillUpdate] = useState(false);
  let [postIndex, setPostIndex] = useState(-1);
  let [alertState, setAlertState] = useState("none");
  let [btnState, setbtnState] = useState("none");
  let [alertMsg, setAlertMsg] = useState("");
  let [wantUpdate, setUpdate] = useState(false);
  let [check, setCheck] = useState(true);
  let alert = useAlert();
  const onclickbtn = () => {
    setAlertState("none");
    setAlertMsg("");
    setbtnState("none");
    retriveData(setUpdateData, setWillUpdate);
    setCheck(true);
  };
  const onSubmit = ({ formData }, e) =>
    formData["Post Title"]
      ? (() => {
          setCheck(false);
          writeUserData(
            formData,
            setUpdateData,
            setWillUpdate,
            setPostIndex,
            setAlertState,
            setbtnState,
            setAlertMsg,
            setUpdate,
            willUpdate,
            postIndex,
            wantUpdate
          );
        })()
      : (() => {
          alert.show("Please insert data in the form");
        })();

  if (props.match.params.ghfhj === "6458b47r485n46343nn58nhrhf") {
    if (props.match.params.sdjadj === "8745887hf584t7ffndkajd") {
      return (
        <div style={{ width: "90%", margin: "50px" }}>
          <Form
            schema={schema}
            formData={updateData}
            onSubmit={check ? onSubmit : ""}
          />
          <div
            id="AlertBG"
            style={{
              display: alertState,
              position: "fixed",
              height: "100%",
              left: 0,
              top: 0,
              width: "100%",
              backgroundColor: "#00000062",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              id="Alertblock"
              style={{
                borderRadius: "5px",
                backgroundColor: "white",
                padding: "30px",
                justifyContent: "center",
                flexDirection: "column",
                display: "flex",
                maxWidth: "600px",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <p>{alertMsg}</p>
              <div
                id="alertButtons"
                style={{
                  width: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  id="alertOkButton"
                  style={{
                    display: btnState,
                    width: "80px",
                    padding: "3px",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "#4686e6",
                  }}
                  onClick={onclickbtn}
                >
                  ok
                </div>
                <div
                  id="alertCancelButton"
                  style={{
                    width: "80px",
                    padding: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: "#f24a4d",
                  }}
                  onClick={() => {
                    setAlertState("none");
                    setAlertMsg("");
                    setbtnState("none");
                    setCheck(true);
                  }}
                >
                  cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <></>;
}
