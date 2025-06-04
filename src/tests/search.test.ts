// tests/searchRepositories.test.ts
import { searchRepositories } from "../utils/search";
import { describe, it, expect, beforeEach, vi } from "vitest";

global.fetch = vi.fn();
const mockFetch = fetch as unknown as vi.Mock;

describe("searchRepositories", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it("builds correct URL with all params", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await searchRepositories("react in:name", "stars", "desc", 2);

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).toContain("sort=stars");
    expect(calledUrl).toContain("order=desc");
    expect(calledUrl).toContain("page=2");
  });

  it("omits sort when set to 'default'", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ items: [] }),
    });

    await searchRepositories("react in:name", "default", "desc", 1);

    const calledUrl = mockFetch.mock.calls[0][0];
    expect(calledUrl).not.toContain("sort=");
  });

  it("throws an error if response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(
      searchRepositories("react", "stars", "desc", 1)
    ).rejects.toThrow("GitHub API error: 500");
  });

  it("returns parsed JSON on success", async () => {
    const mockData = { items: [{ id: 123, name: "react" }] };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await searchRepositories("react", "stars", "desc", 1);
    expect(result).toEqual(mockData);
  });
});
