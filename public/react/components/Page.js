import React from "react";

export const Page = (props) => {
  return (
    <>
      {console.log(props.page)}
      <h2>{props.page.title}</h2>
      {props.page.author ? (
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
    </>
  );
};
