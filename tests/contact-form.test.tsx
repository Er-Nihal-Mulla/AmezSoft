import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/forms/ContactForm";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() })
}));

describe("ContactForm", () => {
  it("renders the requested fields and omits budget", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Service")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Requirement")).toBeInTheDocument();
    expect(screen.getByLabelText("Preferred Contact Method")).toBeInTheDocument();
    expect(screen.queryByLabelText(/budget/i)).not.toBeInTheDocument();
  });
});
