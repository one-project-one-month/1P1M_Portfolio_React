import React, { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { getProjectPortfolioDetails } from "@/services/projectPortfolioService";
import toast from "react-hot-toast";

const ProjectPortfolioDetail = ({ projectId, isOpen, onClose }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjectDetails = useCallback(async () => {
    if (!projectId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getProjectPortfolioDetails(projectId);

      if (response && response.success) {
        setProject(response.data);
      } else {
        throw new Error("Failed to fetch project details");
      }
    } catch (err) {
      console.error("Error fetching project details:", err);
      setError(err.response?.data?.message || "Failed to load project details");
      toast.error("Failed to load project details");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId, fetchProjectDetails]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white text-lg">Loading project details...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-red-400 text-lg">{error}</div>
          </div>
        ) : project ? (
          <div className="p-8">
            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Side - Project Image */}
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={project.projectPicUrl || "/placeholder-project.jpg"}
                    alt={project.name}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/500x280/374151/FFFFFF?text=Project+Image";
                    }}
                  />
                </div>
              </div>

              {/* Right Side - Project Details */}
              <div className="lg:w-1/2">
                {/* Featured Project Badge */}
                <div className="mb-4">
                  <span
                    className="text-white px-4 py-2 rounded-full text-sm font-medium"
                    style={{ background: "rgba(173, 70, 255, 0.20)" }}
                  >
                    Featured Project
                  </span>
                </div>

                {/* Project Title */}
                <div className="mb-6">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {project.name || "DD Project"}
                  </h1>
                  <div className="w-12 h-1 bg-purple-500 rounded-full"></div>
                </div>

                {/* About Section */}
                <div className="mb-6">
                  <h2 className="text-white text-lg font-semibold mb-3">
                    About
                  </h2>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.description || "DD details"}
                  </p>
                </div>

                {/* Tech Stack */}
                {project.projectPortfolioDetails?.languageAndTools &&
                  project.projectPortfolioDetails.languageAndTools.length >
                    0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.projectPortfolioDetails.languageAndTools.map(
                          (tech, index) => {
                            // Generate consistent colors based on tech name
                            const generateTechColors = (techName) => {
                              // Create a simple hash from the tech name for consistency
                              let hash = 0;
                              for (let i = 0; i < techName.length; i++) {
                                hash =
                                  techName.charCodeAt(i) + ((hash << 5) - hash);
                              }

                              // Generate RGB values from hash
                              const hue = Math.abs(hash) % 360;
                              const saturation = 60 + (Math.abs(hash) % 40); // 60-100%
                              const lightness = 50 + (Math.abs(hash) % 30); // 50-80%

                              // Convert HSL to RGB for solid color
                              const hslToRgb = (h, s, l) => {
                                h /= 360;
                                s /= 100;
                                l /= 100;
                                const a = s * Math.min(l, 1 - l);
                                const f = (n) => {
                                  const k = (n + h * 12) % 12;
                                  return (
                                    l -
                                    a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
                                  );
                                };
                                return [
                                  Math.round(f(0) * 255),
                                  Math.round(f(8) * 255),
                                  Math.round(f(4) * 255),
                                ];
                              };

                              const [r, g, b] = hslToRgb(
                                hue,
                                saturation,
                                lightness
                              );

                              return {
                                background: `rgba(${r}, ${g}, ${b}, 0.20)`,
                                color: `rgb(${r}, ${g}, ${b})`,
                              };
                            };

                            const techStyle = generateTechColors(tech);

                            return (
                              <span
                                key={index}
                                className="px-3 py-1.5 rounded-full text-sm font-medium"
                                style={techStyle}
                              >
                                {tech}
                              </span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                {/* Links Section */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">GitHub</h3>
                      <a
                        href={project.repoLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors text-sm wrap-break-word"
                      >
                        {project.repoLink ? "github.com/" : "github.com/"}
                      </a>
                    </div>

                    <div>
                      <h3 className="text-gray-400 text-sm mb-1">Live Site</h3>
                      <a
                        href={project.projectLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors text-sm wrap-break-word"
                      >
                        {project.projectLink
                          ? "www.finkoff.com →"
                          : "www.finkoff.com →"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">
                    Team
                  </h3>
                  <div className="flex -space-x-2">
                    {project.assignedDevs?.developers?.map((devId, index) => (
                      <div
                        key={devId}
                        className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1a1a1a]"
                      >
                        <img
                          src={devId.profilePictureUrl}
                          alt={`Team member ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectPortfolioDetail;
