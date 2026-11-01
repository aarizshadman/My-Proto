import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import JavaScriptObfuscator from 'vite-plugin-javascript-obfuscator';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    // Only obfuscate on production build, not during dev
    command === 'build' && JavaScriptObfuscator({
      options: {
        compact: true,
        controlFlowFlattening: true,          // Scrambles control flow logic
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,              // Injects fake/junk code
        deadCodeInjectionThreshold: 0.2,
        stringArray: true,                    // Moves strings into array
        rotateStringArray: true,
        shuffleStringArray: true,
        stringArrayThreshold: 0.75,
        stringArrayEncoding: ['base64'],      // Encodes strings in base64
        selfDefending: true,                  // Breaks if code is reformatted
        disableConsoleOutput: true,           // Disables console.log in prod
        identifierNamesGenerator: 'hexadecimal', // Variables become _0x3f2a
        renameGlobals: false,
        transformObjectKeys: true,
      },
    }),
  ].filter(Boolean),
  server: {
    port: 5173,
    open: false,
  },
}));
