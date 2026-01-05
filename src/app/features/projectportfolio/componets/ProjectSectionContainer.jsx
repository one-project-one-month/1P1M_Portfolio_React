import React, { useState } from "react";
import ProjectSectionView from "./ProjectSectionView";
import { useGetProjectPortfolio } from "../hooks/useGetProjectPortfolio";
import { useDebounce } from "@/hooks/useDebounce";

const ProjectSectionContainer = ({ keyword, sortDirection = "asc" }) => {
  const debounceValue = useDebounce(keyword, 700);
  const [page, setPage] = useState(0);

  const size = 2;
  const sortField = "name";

  const { data, isLoading } = useGetProjectPortfolio({
    keyword: debounceValue,
    page: page,
    sortDirection: sortDirection,
    sortField: sortField,
    size: size,
  });

  const totalPages = data?.meta.totalPages;

  return (
    <ProjectSectionView
    isLoading={isLoading}
      projects={data?.data}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
};

export default ProjectSectionContainer;
