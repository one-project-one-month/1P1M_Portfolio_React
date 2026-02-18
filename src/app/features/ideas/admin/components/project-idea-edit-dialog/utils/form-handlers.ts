import type { EditIdeaType } from '../../../../shared/types/project-idea.types';

interface AdminSubmitParams {
  projectIdeaId: number;
  status: EditIdeaType['status'];
  devId: number;
  step1Data: {
    projectIdeaName?: string;
    description?: string;
    projectTypes?: string[];
  };
  updateInformationAsync: (data: {
    projectIdeaId: number;
    formData: Partial<EditIdeaType>;
  }) => Promise<unknown>;
  assignLeaderAsync: (data: {
    projectIdeaId: number;
    devId: number;
  }) => Promise<unknown>;
  updateStatusAsync: (data: {
    projectIdeaId: number;
    status: EditIdeaType['status'];
  }) => Promise<unknown>;
}

interface ClientSubmitParams {
  projectIdeaId: number;
  formData: {
    projectIdeaName?: string;
    description?: string;
    projectTypes?: string[];
  };
  updateInformationAsync: (data: {
    projectIdeaId: number;
    formData: Partial<EditIdeaType>;
  }) => Promise<unknown>;
}

export async function handleAdminSubmit({
  projectIdeaId,
  status,
  devId,
  step1Data,
  updateInformationAsync,
  assignLeaderAsync,
  updateStatusAsync,
}: AdminSubmitParams): Promise<void> {
  const promises: Promise<unknown>[] = [];

  // Add information update if there's data
  if (step1Data && Object.keys(step1Data).length > 0) {
    promises.push(
      updateInformationAsync({
        projectIdeaId,
        formData: step1Data,
      }),
    );
  }

  // Add leader assignment
  promises.push(
    assignLeaderAsync({
      projectIdeaId,
      devId,
    }),
  );

  // Add status update
  promises.push(
    updateStatusAsync({
      projectIdeaId,
      status,
    }),
  );

  // Execute all API calls simultaneously
  await Promise.all(promises);
}

export async function handleClientSubmit({
  projectIdeaId,
  formData,
  updateInformationAsync,
}: ClientSubmitParams): Promise<void> {
  await updateInformationAsync({
    projectIdeaId,
    formData,
  });
}
