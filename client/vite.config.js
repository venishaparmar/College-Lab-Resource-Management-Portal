import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        "D:/Final_Merged/server/assets/images/component-complaint-images",
        "D:/Final_Merged/server/assets/images/computer-complaint-images",
        "D:/Final_Merged/client/src",
      ],
    },
  },
});
