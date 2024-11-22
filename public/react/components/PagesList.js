import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, setSinglePageData, setPageSlug, setSinglePage }) => {

  function handleClick(page) {
	setSinglePage(true);
    setSinglePageData(page);
    setPageSlug(page.slug);
  }
  return (
    <>
      {pages.map((page, idx) => {
        return (
          <>
            <h1 onClick={() => handleClick(page)}>
				{page.title}
            </h1>
          </>
        );
      })}
    </>
  );
};
