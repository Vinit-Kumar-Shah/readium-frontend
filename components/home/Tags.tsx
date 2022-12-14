import React from "react";
//importing Custom link
import CustomLink from "../common/CustomLink";
//importing Loading Spinner
import LoadingSpinner from "../common/LoadingSpinner";
//importing useSWR
import { usePageDispatch } from "../../lib/context/PageContext";
import useSWR from "swr";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";
//importing Errormessage
import ErrorMessage from "../common/ErrorMessage";

const Tags = () => {
  const setPage = usePageDispatch();
  const handleClick = React.useCallback(() => setPage(0), []);
  const { data, error } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher);

  if (error) return <ErrorMessage message="Cannot load popular tags..." />;
  if (!data) return <LoadingSpinner />;

  const { tags } = data;
  return (
    <div className="tag-list">
      {tags?.map((tag) => (
        <CustomLink
          key={tag}
          href={`/?tag=${tag}`}
          as={`/?tag=${tag}`}
          className="tag-default tag-pill"
        >
          <span onClick={handleClick}>{tag}</span>
        </CustomLink>
      ))}
    </div>
  );
};

export default Tags;
