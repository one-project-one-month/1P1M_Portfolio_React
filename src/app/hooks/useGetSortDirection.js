export function useGetSortDirection(filter) {
  switch (filter) {
    case "Newest":
      return "asc";

    case "Oldest":
      return "desc";

    default:
      return "desc";
  }
}
