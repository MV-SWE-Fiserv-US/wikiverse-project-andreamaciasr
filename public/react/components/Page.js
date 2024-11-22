import React from "react";
import apiURL from "../api";

export const Page = (props) => {

  async function handleDelete() {
    // Add fetch call to delete
    const res = await fetch(`${apiURL}/wiki/${props.page.slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log("Page deleted");
      // return to list view
      props.setSinglePage();
    } else {
      console.error("Failed to delete page");
    }
  }
  return (
    <>
      {console.log("page: ", props.page)}
      <h2>{props.page.title}</h2>
      {props.page.author ? (
        // checkif author is present
        <h3>Author: {props.page.author.name}</h3>
      ) : (
        <p>Author Unknown</p>
      )}
      <p>{props.page.content}</p>
      {props.page.tags && props.page.tags.length > 0 ? (
        <div>
          <h3>Tags:</h3>
          {props.page.tags.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
          ))}
        </div>
      ) : (
        <p>No tags yet</p>
      )}
      <p>Date: {new Date(props.page.createdAt).toLocaleDateString()}</p>
      <button onClick={() => handleDelete()}>Delete Entry</button>
      <button onClick={() => props.setSinglePage()}>Back to Wiki List</button>
    </>
  );
};
