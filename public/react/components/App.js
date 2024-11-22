import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Page } from "./Page";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [singlePage, setSinglePage] = useState(false);
  const [singlePageData, setSinglePageData] = useState({});
  const [pageSlug, setPageSlug] = useState(null);

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
  }, [singlePage, pageSlug]);

  return (
    <main>
      {singlePage ? (
        <Page page={singlePageData} key={pageSlug}/>
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
        </>
      )}

    </main>
  );
};
