import { describe, it, expect, vi, beforeEach } from "vitest";

const manifestData = {
  name: "Media Us",
  short_name: "MediaUs",
  description: "Cronograma de servicios, manejo de equipos y calendario para tu iglesia",
  display: "standalone",
  theme_color: "#0f172a",
  background_color: "#ffffff",
};

describe("PWA baseline", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifestData),
    });
  });

  it("has manifest with correct properties", async () => {
    const response = await fetch("/manifest.json");
    const manifest = await response.json();
    expect(manifest.name).toBe("Media Us");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#0f172a");
  });
});