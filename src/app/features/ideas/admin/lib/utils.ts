export function changeProjectIdeaStatus(
  status:
    | ''
    | 'PENDING'
    | 'APPROVED'
    | 'ARCHIVED'
    | 'REJECTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED',
) {
  switch (status) {
    case '':
      return 'All';
    case 'PENDING':
      return 'In progress';
    case 'APPROVED':
      return 'Approved';
    case 'ARCHIVED':
      return 'Archived';
    case 'REJECTED':
      return 'Rejected';
    case 'IN_PROGRESS':
      return 'In-progress';
    case 'COMPLETED':
      return 'Completed';
    case 'DELETED':
      return 'Deleted';
    default:
      throw new Error(`Invalid project idea status: ${status satisfies never}`);
  }
}

export function changeProjectIdeaStatusColor(
  status:
    | ''
    | 'PENDING'
    | 'APPROVED'
    | 'ARCHIVED'
    | 'REJECTED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED',
) {
  switch (status) {
    case '':
      return '';
    case 'PENDING':
      return 'bg-[#FF8904]';
    case 'APPROVED':
      return 'bg-[#00A63E]';
    case 'ARCHIVED':
      return 'bg-[#A6A09B]';
    case 'REJECTED':
      return 'bg-[#A6A09B]';
    case 'IN_PROGRESS':
      return 'bg-[#A6A09B]';
    case 'COMPLETED':
      return 'bg-[#A6A09B]';
    case 'DELETED':
      return 'bg-[#A6A09B]';
    default:
      throw new Error(
        `Invalid project idea status color: ${status satisfies never}`,
      );
  }
}
