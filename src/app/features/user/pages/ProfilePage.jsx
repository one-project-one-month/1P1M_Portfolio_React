import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import ProfileProjectCard from "@/components/ui/ProfileProjectCard";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import profileService from "@/services/profileService";
import { deleteProjectPortfolio } from "@/services/projectPortfolioService";
import toast from "react-hot-toast";
import {
  emailIconUrl,
  githubProfileIconUrl,
  linkedinProfileIconUrl,
  editIconUrl,
} from "@/assets/icons/iconUrls";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    project: null,
    isDeleting: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await profileService.getProfileData(user.id);
        if (response.success) {
          setProfileData(response.data);
        } else {
          setError("Failed to fetch profile data");
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen d text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen d text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#9C39FC] hover:bg-[#8B2FE0]"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const { devProfile, projectIdea, projectPortfolios } = profileData || {};

  const projectIdeasArray = Array.isArray(projectIdea)
    ? projectIdea
    : projectIdea
    ? [projectIdea]
    : [];

  // Transform project portfolio data to match component props
  const transformedProjects =
    projectPortfolios?.map((project) => ({
      id: project.id,
      title: project.name,
      description: project.description,
      image:
        project.projectPicUrl ||
        "https://picsum.photos/320/132?random=" + project.id,
      initialLikes: project.reaction_count || 0,
      initialViews: 0, // API doesn't provide views, using 0 as default
      owner: project.owner,
      projectLink: project.projectLink,
      repoLink: project.repoLink,
    })) || [];

  const transformedProjectIdeas = projectIdeasArray.map((idea) => ({
    id: idea.projectIdeaId,
    title: idea.projectIdeaName,
    description: idea.description,
    tags:
      idea.projectTypes && idea.projectTypes.length > 0
        ? idea.projectTypes
        : ["Project Idea"],
    submittedByProfile:
      devProfile?.profilePictureUrl ||
      "https://avatar.iran.liara.run/public/47",
    postBy: devProfile?.name || "Unknown",
    likeCount: idea.reactionCount || 0,
    liked: false,
    status: idea.status,
    owner: idea.dev_id === devProfile?.dev_id,
    originalIdea: idea,
  }));

  const handleLikeIdea = (projectId, liked) => {
    console.log(`Idea ${projectId} ${liked ? "liked" : "unliked"}`);
  };

  const handleEditIdea = (idea) => {
    console.log(`Edit idea ${idea.projectIdeaId}`);
    navigate("/project-idea", {
      state: {
        isEditMode: true,
        projectIdeaData: idea,
      },
    });
  };

  const handleProjectReact = async (projectId) => {
    console.log(`Project ${projectId} reacted`);
    return { ok: true };
  };

  const handleEditProject = (project) => {
    console.log(`Edit project:`, project);
    const originalProject = projectPortfolios?.find((p) => p.id === project.id);

    navigate("/create-project", {
      state: {
        isEditMode: true,
        projectData: originalProject,
      },
    });
  };

  const handleDeleteProject = (project) => {
    console.log(`Delete project:`, project);
    setDeleteModal({
      isOpen: true,
      project: project,
      isDeleting: false,
    });
  };

  const confirmDeleteProject = async () => {
    if (!deleteModal.project) return;

    setDeleteModal((prev) => ({ ...prev, isDeleting: true }));

    try {
      const result = await deleteProjectPortfolio(deleteModal.project.id);

      if (result.success) {
        toast.success("Project deleted successfully!", {
          position: "top-right",
        });

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await profileService.getProfileData(user.id);
        if (response.success) {
          setProfileData(response.data);
        }
      } else {
        toast.error("Failed to delete project. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.", {
        position: "top-right",
      });
    } finally {
      setDeleteModal({
        isOpen: false,
        project: null,
        isDeleting: false,
      });
    }
  };

  const cancelDeleteProject = () => {
    setDeleteModal({
      isOpen: false,
      project: null,
      isDeleting: false,
    });
  };

  const handleEditProfile = () => {
    navigate("/edit-profile", {
      state: {
        profileData: devProfile,
      },
    });
  };

  return (
    <div className="min-h-screen d text-white p-8">
      <div className="bg-[#1A1B23] rounded-3xl p-8 mb-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <img
            src={
              devProfile?.profilePictureUrl ||
              "https://avatar.iran.liara.run/public/47"
            }
            alt={devProfile?.name || "User"}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">
              {devProfile?.name || "Loading..."}
            </h1>
            <p className="text-[#99A1AF] text-lg mb-2">
              {devProfile?.techStacks?.join(", ") || "Developer"}
            </p>
            <div className="flex items-center gap-4 text-[#99A1AF] mb-4">
              <div className="flex items-center gap-2">
                <img src={emailIconUrl} alt="Email" className="w-5 h-5" />
                <span>{devProfile?.email || "N/A"}</span>
              </div>
              {devProfile?.github && (
                <div className="flex items-center gap-2">
                  <img
                    src={githubProfileIconUrl}
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                  <a
                    href={devProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              )}
              {devProfile?.linkedIn && (
                <div className="flex items-center gap-2">
                  <img
                    src={linkedinProfileIconUrl}
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                  <a
                    href={devProfile.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              )}
            </div>
            {devProfile?.aboutDev && (
              <p className="text-[#99A1AF] text-sm">{devProfile.aboutDev}</p>
            )}
          </div>
          <Button
            variant="primary"
            size="primary"
            className="bg-[#9C39FC] hover:bg-[#8B2FE0] px-8 flex items-center gap-2"
            onClick={handleEditProfile}
          >
            <img src={editIconUrl} alt="Edit" className="w-6 h-6" />
            Edit Profile
          </Button>
        </div>
      </div>

      {transformedProjectIdeas.length > 0 && (
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8">My Projects Ideas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {transformedProjectIdeas.map((idea) => (
              <ProjectIdeaCard
                key={idea.id}
                projectId={idea.id}
                title={idea.title}
                description={idea.description}
                submittedByProfile={idea.submittedByProfile}
                postBy={idea.postBy}
                likeCount={idea.likeCount}
                liked={idea.liked}
                tags={idea.tags}
                status={idea.status}
                canEdit={
                  idea.owner ? () => handleEditIdea(idea.originalIdea) : null
                }
                onLike={handleLikeIdea}
              />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <Button
            size="primary"
            className="border border-#99A1AF px-6 flex items-center gap-2"
            onClick={() => navigate("/create-project")}
          >
            <img src={editIconUrl} alt="Edit" className="w-6 h-6" />
            Add Projects
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {transformedProjects.length > 0 ? (
            transformedProjects.map((project) => (
              <ProfileProjectCard
                key={project.id}
                image={project.image}
                title={project.title}
                description={project.description}
                initialLikes={project.initialLikes}
                initialViews={project.initialViews}
                onClickReact={handleProjectReact}
                onEdit={project.owner ? handleEditProject : null}
                onDelete={project.owner ? handleDeleteProject : null}
                project={project}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#99A1AF] text-lg">
                No projects found. Start by adding your first project!
              </p>
            </div>
          )}
        </div>
      </div>

      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-[#1A1B23] rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <h3 className="text-white text-xl font-bold text-center mb-4">
              Are you sure to delete?
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Your project will be deleted. Are you really want to delete it?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="secondary"
                size="secondary"
                className="px-8 py-2 border border-gray-500 text-white bg-transparent hover:bg-gray-700"
                onClick={cancelDeleteProject}
                disabled={deleteModal.isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="primary"
                className="px-8 py-2 bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDeleteProject}
                disabled={deleteModal.isDeleting}
              >
                {deleteModal.isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
