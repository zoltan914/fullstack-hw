import { beforeEach, describe, expect, it, vi } from "vitest";


const { mockGet, mockPost, mockUse } = vi.hoisted(() => ({
  mockGet: vi.fn(),
  mockPost: vi.fn(),
  mockUse: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: mockGet,
      post: mockPost,
      interceptors: { response: { use: mockUse } },
    }),
  },
}));

import {
  getAllAlerts,
  getAllReadingsBySensorId,
  getAllSensors,
  saveSensorReading,
} from "../api";

// az interceptor a modul betöltésekor regisztrálódik, ezért itt olvassuk ki
const onRejected = mockUse.mock.calls[0][1];

describe("api service", () => {
  beforeEach(() => {
    mockGet.mockClear();
    mockPost.mockClear();
  });

  it("getAllSensors calls GET /sensors", () => {
    getAllSensors();
    expect(mockGet).toHaveBeenCalledWith("/sensors");
  });

  it("getAllReadingsBySensorId calls GET /sensor-readings/{id}", () => {
    getAllReadingsBySensorId("abc");
    expect(mockGet).toHaveBeenCalledWith("/sensor-readings/abc");
  });

  it("saveSensorReading posts the reading", () => {
    const dto = { sensorId: "abc", value: 16.2, timestamp: "2026-11-24T15:10:00"};
    saveSensorReading(dto);
    expect(mockPost).toHaveBeenCalledWith("/sensor-readings", dto);
  });

  it("getAllAlerts calls GET /alerts", () => {
    getAllAlerts();
    expect(mockGet).toHaveBeenCalledWith("/alerts");
  });

  it("interceptor logs a warning on 404 and re-throws the error", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = { response: { status: 404 } };

    await expect(onRejected(error)).rejects.toBe(error);
    expect(warn).toHaveBeenCalled();
  });
});