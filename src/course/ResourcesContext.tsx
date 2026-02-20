import React, { createContext, useContext, useMemo, useState } from "react";
import { dummyResourcesByCrn } from "./dummyResources";

export type Resource = {
  id: string;
  crn: string;
  title: string;
  category: string;
  fileName: string;
  mimeType?: string;
  size?: number;
  uri: string; // picked file uri (no copying for now)
  uploadedAt: string;
  comments: { id: string; text: string; author: string; createdAt: string }[];
};

type NewResourceInput = {
  title: string;
  category: string;
  fileName: string;
  mimeType?: string;
  size?: number;
  uri: string;
};

type ResourcesContextValue = {
  getResources: (crn: string) => Resource[];
  addResource: (crn: string, r: NewResourceInput) => Promise<void>;
  addComment: (crn: string, resourceId: string, text: string, isAnonymous: boolean) => void;
};

const ResourcesContext = createContext<ResourcesContextValue | null>(null);

export function ResourcesProvider({ children }: { children: React.ReactNode }) {
  const getResources = (crn: string) => resourcesByCrn[crn] ?? [];
const [resourcesByCrn, setResourcesByCrn] = useState<Record<string, Resource[]>>(dummyResourcesByCrn);
  // ✅ "Mock upload": store the picked file metadata + URI (no filesystem copy yet)
  const addResource = async (crn: string, r: NewResourceInput) => {
    const newResource: Resource = {
      id: `res_${Date.now()}`,
      crn,
      title: r.title.trim(),
      category: r.category.trim(),
      fileName: r.fileName,
      mimeType: r.mimeType,
      size: r.size,
      uri: r.uri,
      uploadedAt: new Date().toISOString(),
      comments: [],
    };

    setResourcesByCrn((prev) => ({
      ...prev,
      [crn]: [newResource, ...(prev[crn] ?? [])],
    }));
  };

  const addComment = (crn: string, resourceId: string, text: string, isAnonymous: boolean) => {
    const newComment = {
      id: `c_${Date.now()}`,
      text: text.trim(),
      author: isAnonymous ? "Anonymous" : "You",
      createdAt: new Date().toISOString(),
    };

    setResourcesByCrn((prev) => ({
      ...prev,
      [crn]: (prev[crn] ?? []).map((r) =>
        r.id === resourceId ? { ...r, comments: [...r.comments, newComment] } : r
      ),
    }));
  };

  const value = useMemo(() => ({ getResources, addResource, addComment }), [resourcesByCrn]);

  return <ResourcesContext.Provider value={value}>{children}</ResourcesContext.Provider>;
}

export function useResources() {
  const ctx = useContext(ResourcesContext);
  if (!ctx) throw new Error("useResources must be used inside ResourcesProvider");
  return ctx;
}