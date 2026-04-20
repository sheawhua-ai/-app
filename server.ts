import express from "express";
import { createServer as createViteServer } from "vite";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/download-build", (req, res) => {
    console.log("Triggering build...");
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error("Build error:", error);
        return res.status(500).json({ error: "Build failed" });
      }
      const filePath = path.join(process.cwd(), "dist", "index.html");
      if (fs.existsSync(filePath)) {
        res.download(filePath, "store_app.html");
      } else {
        res.status(404).json({ error: "File not found" });
      }
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
