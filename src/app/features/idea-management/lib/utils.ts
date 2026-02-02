export function changeProjectIdeaStatus(
  status: 'PENDING' | 'APPROVED' | 'ARCHIVED',
) {
  switch (status) {
    case 'PENDING':
      return 'In progress';
    case 'APPROVED':
      return 'Approved';
    case 'ARCHIVED':
      return 'Archived';
    default:
      throw new Error(`Invalid project idea status: ${status satisfies never}`);
  }
}

export function changeProjectIdeaStatusColor(
  status: 'PENDING' | 'APPROVED' | 'ARCHIVED',
) {
  switch (status) {
    case 'PENDING':
      return 'bg-[#FF8904]';
    case 'APPROVED':
      return 'bg-[#00A63E]';
    case 'ARCHIVED':
      return 'bg-[#A6A09B]';
    default:
      throw new Error(
        `Invalid project idea status color: ${status satisfies never}`,
      );
  }
}
