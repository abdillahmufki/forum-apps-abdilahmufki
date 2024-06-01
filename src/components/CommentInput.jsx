import { useRef } from "react";
import PropTypes from "prop-types";
import QuillEditor from "./QuillEditor";
import "quill/dist/quill.snow.css";
import "../styles/quill.custom.css";

function CommentInput({ onCreateComment }) {
  const quillRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    let content = "";
    if (quillRef.current.getLength() > 1) {
      content = quillRef.current.getSemanticHTML();
    }

    onCreateComment(content).then(() => {
      quillRef.current.setContents([]);
    });
  };

  return (
    <form className="text-end" onSubmit={handleSubmit}>
      <div className="mb-2 text-start">
        <QuillEditor ref={quillRef} />
      </div>
      <button type="submit" className="btn btn-primary algin-self-end">
        Send
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onCreateComment: PropTypes.func.isRequired,
};

export default CommentInput;
