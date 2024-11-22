import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Page } from "./Page";
import { NewArticleForm } from "./NewArticleForm";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [singlePage, setSinglePage] = useState(false);
  const [singlePageData, setSinglePageData] = useState({});
  const [pageSlug, setPageSlug] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error :(! ", err);
    }
  }

  async function fetchSinglePage(slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`);
      const pageData = await response.json();
      setSinglePageData(pageData);
    } catch (err) {
      console.log("Oh no an error :(! ", err);
    }
  }

  useEffect(() => {
    if (singlePage) {
      fetchSinglePage(pageSlug);
    } else {
      fetchPages();
    }
  }, [singlePage, pageSlug, isAddingArticle]);

  return (
    <main>
      {singlePage ? (
        <Page
          page={singlePageData}
          key={pageSlug}
          setSinglePage={setSinglePage}
        />
      ) : isAddingArticle ? (
        <NewArticleForm setIsAddingArticle={setIsAddingArticle}/>
      ) : (
        <>
          <h1>WikiVerse</h1>
          <h2>An interesting 📚</h2>
          <PagesList
            pages={pages}
            setSinglePageData={setSinglePageData}
            setPageSlug={setPageSlug}
            setSinglePage={setSinglePage}
          />
          <button onClick={() => setIsAddingArticle(!isAddingArticle)}>
            Add an New Article
          </button>
        </>
      )}
      
    </main>
  );
};
