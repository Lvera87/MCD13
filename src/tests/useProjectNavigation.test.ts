import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProjectNavigation } from "@/hooks/useProjectNavigation";
import type { Project } from "@/data/projects";

const mockProjects: Project[] = [
    { id: "01", name: "Project A", category: "Cat A", description: "desc" },
    { id: "02", name: "Project B", category: "Cat B", description: "desc" },
    { id: "03", name: "Project C", category: "Cat C", description: "desc" },
];

describe("useProjectNavigation", () => {
    it("starts at HOME", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        expect(result.current.activeProjectId).toBe("HOME");
    });

    it("handleNext from HOME goes to first project", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.handleNext());
        expect(result.current.activeProjectId).toBe("01");
    });

    it("handleNext advances through projects in order", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.setActiveProjectId("01"));
        act(() => result.current.handleNext());
        expect(result.current.activeProjectId).toBe("02");
    });

    it("handleNext wraps from last project to first", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.setActiveProjectId("03"));
        act(() => result.current.handleNext());
        expect(result.current.activeProjectId).toBe("01");
    });

    it("handlePrev from HOME goes to last project", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.handlePrev());
        expect(result.current.activeProjectId).toBe("03");
    });

    it("handlePrev from first project goes back to HOME", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.setActiveProjectId("01"));
        act(() => result.current.handlePrev());
        expect(result.current.activeProjectId).toBe("HOME");
    });

    it("handlePrev steps backwards through projects", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.setActiveProjectId("03"));
        act(() => result.current.handlePrev());
        expect(result.current.activeProjectId).toBe("02");
    });

    it("activeProject is undefined when on HOME", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        expect(result.current.activeProject).toBeUndefined();
    });

    it("activeProject matches the selected project", () => {
        const { result } = renderHook(() => useProjectNavigation(mockProjects));
        act(() => result.current.setActiveProjectId("02"));
        expect(result.current.activeProject?.name).toBe("Project B");
    });
});
