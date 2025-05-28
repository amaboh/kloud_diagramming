import React from "react";
import "./App.css";

// Import from published npm packages
import { Diagram } from "@cloud-diagrams/core";
import { EC2, RDS } from "@cloud-diagrams/aws";

function createMyArchitecture() {
  const diagram = new Diagram("My First Cloud Architecture");

  // Create cloud resources
  const webServer = new EC2("web-server", {
    label: "Web Server\n(t3.medium)",
    metadata: { instanceType: "t3.medium" },
  });

  const database = new RDS("database", {
    label: "PostgreSQL\n(db.t3.micro)",
    metadata: { engine: "postgresql" },
  });

  // Add to diagram and connect
  diagram.addNode(webServer);
  diagram.addNode(database);
  diagram.connect(webServer, database, { label: "SQL queries" });

  return diagram;
}

function App() {
  const diagram = createMyArchitecture();

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏗️ My Cloud Architecture</h1>
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            color: "black",
            margin: "20px",
          }}
        >
          <h2>✅ Diagram Created Successfully!</h2>
          <p>
            <strong>Diagram Name:</strong> {diagram.name}
          </p>
          <p>
            <strong>Number of Nodes:</strong> {diagram.getNodes().length}
          </p>
          <p>
            <strong>Number of Connections:</strong>{" "}
            {diagram.getConnections().length}
          </p>

          <div style={{ marginTop: "20px" }}>
            <h3>📦 Nodes:</h3>
            <ul style={{ textAlign: "left" }}>
              {diagram.getNodes().map((node) => (
                <li key={node.id}>
                  <strong>{node.id}</strong> ({node.type}) - {node.label}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3>🔗 Connections:</h3>
            <ul style={{ textAlign: "left" }}>
              {diagram.getConnections().map((conn, index) => (
                <li key={index}>
                  <strong>{conn.from.id}</strong> →{" "}
                  <strong>{conn.to.id}</strong>
                  {conn.options?.label && ` (${conn.options.label})`}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#d4edda",
              borderRadius: "8px",
              border: "1px solid #c3e6cb",
            }}
          >
            <strong>🎉 SUCCESS!</strong> The @cloud-diagrams packages from npm
            are working perfectly!
            <br />
            <small>
              Using published packages: @cloud-diagrams/core,
              @cloud-diagrams/aws
            </small>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6",
            }}
          >
            <h4>📋 Next Steps:</h4>
            <ul style={{ textAlign: "left", margin: 0 }}>
              <li>✅ Packages installed from npm</li>
              <li>✅ TypeScript imports working</li>
              <li>✅ Diagram creation successful</li>
              <li>🔄 Ready to add Mermaid rendering</li>
              <li>🔄 Ready to add more AWS services</li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
