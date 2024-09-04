import { useEffect } from "react";

const Meta = ({ title, metaDescription, metaKeywords }) => {
  useEffect(() => {
    // Set the document title
    document.title = title;

    // Set the meta description
    if (metaDescription) {
      let descriptionMetaTag = document.querySelector(
        'meta[name="description"]'
      );
      if (descriptionMetaTag) {
        descriptionMetaTag.setAttribute("content", metaDescription);
      } else {
        descriptionMetaTag = document.createElement("meta");
        descriptionMetaTag.name = "description";
        descriptionMetaTag.content = metaDescription;
        document.head.appendChild(descriptionMetaTag);
      }
    }

    // Set the meta keywords
    if (metaKeywords) {
      let keywordsMetaTag = document.querySelector('meta[name="keywords"]');
      if (keywordsMetaTag) {
        keywordsMetaTag.setAttribute("content", metaKeywords);
      } else {
        keywordsMetaTag = document.createElement("meta");
        keywordsMetaTag.name = "keywords";
        keywordsMetaTag.content = metaKeywords;
        document.head.appendChild(keywordsMetaTag);
      }
    }
  }, [title, metaDescription, metaKeywords]);

  return null;
};

export default Meta;
