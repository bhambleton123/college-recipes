import React from "react";

const PostStepForm = ({ handleChange, description, submitStep }) => {
  return (
    <div>
      <input
        name="description"
        placeholder="Step Description"
        type="text"
        value={description}
        onChange={handleChange}
        className="form-control w-75 mb-2 mt-2"
      />
      <button
        onClick={() => submitStep(description)}
        className="btn btn-secondary mt-2 ml-2"
      >
        Submit
      </button>
    </div>
  );
};

export default PostStepForm;
