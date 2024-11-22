import React, { useState } from "react";
import apiURL from "../api";

export const NewArticleForm = ({setIsAddingArticle}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const articleData = {
      title,
      content,

      name,
      email,

      tags: tags.split(" ").join(" "),
    };

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData)
      });
      if (response.ok) {
        // Handle successful submission and return tu wiki view
        setIsAddingArticle();
        console.log(
          "Article submitted successfully, article data:",
          articleData
        );
      } else {
        // Handle errors
        console.error("Failed to submit article - article data:", articleData);
      }
    } catch (error) {
      console.log("Erros submitting article: ", error);
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>Author Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Author Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    <button onClick={() => setIsAddingArticle()}>Back to Wiki List</button>
    </>
  );
};
