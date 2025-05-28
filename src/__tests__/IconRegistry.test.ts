import { loadAwsIcons } from "../icons/aws";
import { loadAzureIcons } from "../icons/azure";
import { loadGcpIcons } from "../icons/gcp";
import { awsIcons } from "../icons/aws";
import { azureIcons } from "../icons/azure";
import { gcpIcons } from "../icons/gcp";

describe("Icon Registry", () => {
  describe("AWS Icons", () => {
    test("should load AWS icons", () => {
      const icons = loadAwsIcons();

      expect(typeof icons).toBe("object");
      expect(Object.keys(icons).length).toBeGreaterThan(0);
    });

    test("should have AWS icons available", () => {
      expect(typeof awsIcons).toBe("object");
      expect(Object.keys(awsIcons).length).toBeGreaterThan(0);
    });

    test("should include common AWS services", () => {
      const icons = loadAwsIcons();

      // Check for some common AWS services
      expect(icons).toHaveProperty("ec2");
      expect(icons).toHaveProperty("simplestorageservice");
      expect(icons).toHaveProperty("lambda");
      expect(icons).toHaveProperty("rds");
    });

    test("AWS icons should have required properties", () => {
      const icons = loadAwsIcons();
      const ec2Icon = icons.ec2;

      expect(ec2Icon).toBeDefined();
      expect(typeof ec2Icon.svg).toBe("string");
      expect(ec2Icon.svg.length).toBeGreaterThan(0);
      expect(ec2Icon.metadata).toBeDefined();
      expect(ec2Icon.metadata.provider).toBe("aws");
    });
  });

  describe("Azure Icons", () => {
    test("should load Azure icons", () => {
      const icons = loadAzureIcons();

      expect(typeof icons).toBe("object");
      expect(Object.keys(icons).length).toBeGreaterThan(0);
    });

    test("should have Azure icons available", () => {
      expect(typeof azureIcons).toBe("object");
      expect(Object.keys(azureIcons).length).toBeGreaterThan(0);
    });

    test("should include common Azure services", () => {
      const icons = loadAzureIcons();

      // Check for some common Azure services
      expect(icons).toHaveProperty("virtualmachine");
      expect(icons).toHaveProperty("storageaccounts");
      expect(icons).toHaveProperty("functionapps");
    });

    test("Azure icons should have required properties", () => {
      const icons = loadAzureIcons();
      const vmIcon = icons.virtualmachine;

      expect(vmIcon).toBeDefined();
      expect(typeof vmIcon.svg).toBe("string");
      expect(vmIcon.svg.length).toBeGreaterThan(0);
      expect(vmIcon.metadata).toBeDefined();
      expect(vmIcon.metadata.provider).toBe("azure");
    });
  });

  describe("GCP Icons", () => {
    test("should load GCP icons", () => {
      const icons = loadGcpIcons();

      expect(typeof icons).toBe("object");
      expect(Object.keys(icons).length).toBeGreaterThan(0);
    });

    test("should have GCP icons available", () => {
      expect(typeof gcpIcons).toBe("object");
      expect(Object.keys(gcpIcons).length).toBeGreaterThan(0);
    });

    test("should include common GCP services", () => {
      const icons = loadGcpIcons();

      // Check for some common GCP services
      expect(icons).toHaveProperty("compute_engine");
      expect(icons).toHaveProperty("cloud_storage");
      expect(icons).toHaveProperty("cloud_functions");
    });

    test("GCP icons should have required properties", () => {
      const icons = loadGcpIcons();
      const gceIcon = icons.compute_engine;

      expect(gceIcon).toBeDefined();
      expect(typeof gceIcon.svg).toBe("string");
      expect(gceIcon.svg.length).toBeGreaterThan(0);
      expect(gceIcon.metadata).toBeDefined();
      expect(gceIcon.metadata.provider).toBe("gcp");
    });
  });
});
