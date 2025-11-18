"use client";

import { useState } from "react";
import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import Header from "@/components/Header";
import BackgroundChanger from "@/components/BackgroundChanger";
import { PlusIcon, TrashIcon, ImageIcon } from "@/components/icons";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <Authenticated>
          <DashboardContent />
        </Authenticated>
        <Unauthenticated>
          <UnauthenticatedView />
        </Unauthenticated>
      </main>
    </>
  );
}

function UnauthenticatedView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
          Sign In Required
        </h1>
        <p className="text-gray-400 mb-8">
          Please sign in to access your dashboard and start creating amazing product
          images with AI-powered background changes.
        </p>
        <SignInButton mode="modal">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all">
            Sign In
          </button>
        </SignInButton>
      </div>
    </div>
  );
}

function DashboardContent() {
  const [selectedProjectId, setSelectedProjectId] = useState<Id<"projects"> | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const projects = useQuery(api.projects.listProjects);
  const createProject = useMutation(api.projects.createProject);
  const deleteProject = useMutation(api.projects.deleteProject);

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const projectId = await createProject({ name: newProjectName });
      setNewProjectName("");
      setIsCreatingProject(false);
      setSelectedProjectId(projectId);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  const handleDeleteProject = async (projectId: Id<"projects">) => {
    if (!confirm("Are you sure you want to delete this project and all its images?")) {
      return;
    }

    try {
      await deleteProject({ projectId });
      if (selectedProjectId === projectId) {
        setSelectedProjectId(null);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // If a project is selected, show the background changer
  if (selectedProjectId) {
    const selectedProject = projects?.find((p) => p._id === selectedProjectId);
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => setSelectedProjectId(null)}
            className="text-purple-400 hover:text-purple-300 transition-colors mb-2"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {selectedProject?.name || "Project"}
          </h1>
        </div>
        <BackgroundChanger projectId={selectedProjectId} />
      </div>
    );
  }

  // Otherwise, show the project list
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          My Projects
        </h1>
        <p className="text-gray-400">
          Create and manage your product background changer projects
        </p>
      </div>

      {/* Create New Project */}
      <div className="mb-8">
        {isCreatingProject ? (
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-300">New Project</h3>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors placeholder-gray-500 text-gray-100 mb-4"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateProject();
                } else if (e.key === "Escape") {
                  setIsCreatingProject(false);
                  setNewProjectName("");
                }
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreatingProject(false);
                  setNewProjectName("");
                }}
                className="flex-1 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg font-bold hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingProject(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            New Project
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {projects === undefined ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700">
          <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No projects yet</p>
          <p className="text-gray-500 text-sm">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div
                onClick={() => setSelectedProjectId(project._id)}
                className="p-6"
              >
                <div className="flex items-center justify-center w-full h-32 bg-gray-700/50 rounded-lg mb-4 group-hover:bg-gray-700 transition-colors">
                  <ImageIcon className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-200 mb-2 truncate">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="px-6 pb-4 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-all"
                  title="Delete project"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
