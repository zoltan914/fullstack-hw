import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AxiosResponse } from "axios";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllSensors } from "../../services/api";
import SensorPage from "../SensorPage";


vi.mock("../../services/api", () => ({ getAllSensors: vi.fn() }));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => ({
  ...(await vi.importActual<typeof import("react-router")>("react-router")),
  useNavigate: () => mockNavigate,
}));

const respond = (data: unknown) =>
  vi.mocked(getAllSensors).mockResolvedValue({ data } as AxiosResponse);

const renderPage = () =>
  render(
    <MemoryRouter>
      <SensorPage />
    </MemoryRouter>
  );

describe("SensorPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the table headers", async () => {
    respond([]);
    renderPage();

    expect(await screen.findByText("Sensor Name")).toBeInTheDocument();
    expect(screen.getByText("Sensor Type")).toBeInTheDocument();
    expect(screen.getByText("Alert Count")).toBeInTheDocument();
  });

  it("shows sensors loaded from the API with their alert count", async () => {
    respond([
      { id: "uuid-1", name: "Temp 1", type: "TEMPERATURE", alerts: [{}, {}] },
      { id: "uuid-2", name: "Humidity 1", type: "HUMIDITY", alerts: [] },
    ]);
    renderPage();

    expect(await screen.findByText("Temp 1")).toBeInTheDocument();
    expect(screen.getByText("Humidity 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Show" })).toHaveLength(2);
  });

  it("navigates to the sensor's readings page on click", async () => {
    respond([{ id: "uuid-1", name: "Temp 1", type: "TEMPERATURE", alerts: [] }]);
    renderPage();

    await userEvent.click(await screen.findByRole("button", { name: "Show" }));

    expect(mockNavigate).toHaveBeenCalledWith("/sensors/uuid-1");
  });

  beforeEach(() => vi.clearAllMocks());

  it("should show 'No sensors' message when the sensor list is empty", async () => {
    // GIVEN - Üres listát ad vissza a backend
    respond([]);
    renderPage()

    // THEN - Megjelenik a "No sensors" szöveg
    await waitFor(() => {
      expect(screen.getByText("No sensors")).toBeInTheDocument();
    });
  });

  it("shows sensors loaded from the API with their alert count", async () => {
    const mockSensors = [
      { id: "uuid-1", name: "Temp 1", type: "TEMPERATURE", alerts: [{}, {}] },
      { id: "uuid-2", name: "Humidity 1", type: "HUMIDITY", alerts: [] },
    ]
    respond(mockSensors)
    renderPage();

    expect(await screen.findByText("Temp 1")).toBeInTheDocument();
    expect(screen.getByText("Humidity 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Show" })).toHaveLength(2);
  });

  it("navigates to the sensor's readings page on click", async () => {
    const mockSensors = [
      { id: "uuid-1", name: "Temp 1", type: "TEMPERATURE", alerts: [] }
    ]
    respond(mockSensors)

    renderPage();

    await userEvent.click(await screen.findByRole("button", { name: "Show" }));

    expect(mockNavigate).toHaveBeenCalledWith("/sensors/uuid-1");
  });
});