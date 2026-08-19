import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

/* Si algo falla en tiempo de ejecución, se muestra el error en lugar de una pantalla en blanco */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0713", color: "#efe6d4", fontFamily: "Georgia, serif", padding: 24 }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <p style={{ color: "#d9b36c", letterSpacing: "0.3em", textTransform: "uppercase", fontSize: 12 }}>El oráculo se ha nublado</p>
            <h1 style={{ fontSize: 28, margin: "12px 0" }}>Algo interrumpió la visión</h1>
            <p style={{ color: "#cfc2a8", fontStyle: "italic" }}>{String(this.state.error?.message ?? this.state.error)}</p>
            <button
              onClick={() => location.reload()}
              style={{ marginTop: 20, padding: "12px 28px", borderRadius: 999, border: "1px solid #d9b36c", background: "transparent", color: "#d9b36c", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: 12 }}
            >
              Volver a intentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
