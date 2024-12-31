import React, { useEffect, useRef, useState } from "react";
import initWasm, { Universe } from "./rustyGame/pkg/wasm_game_of_life.js";
// import initWasm, {
//   Universe,
// } from "../../public/rustyGame/engine/pkg/wasm_game_of_life";

const GameOfLife = () => {
  const canvasRef = useRef(null);
  const [wasm, setWasm] = useState(null);

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasmModule = await initWasm();
        const universe = Universe.new();
        setWasm({ wasmModule, universe });
        console.log("Wasm Universe initialized:", universe);
      } catch (error) {
        console.error("Failed to initialize WebAssembly:", error);
      }
    };

    loadWasm();
  }, []);

  useEffect(() => {
    if (!wasm || !canvasRef.current) return;

    const { wasmModule, universe } = wasm;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const CELL_SIZE = 5;
    const GRID_COLOR = "#CCCCCC";
    const ALIVE_COLOR = "#000000";
    const DEAD_COLOR = "#FFFFFF";

    const width = universe.width();
    const height = universe.height();
    canvas.width = (CELL_SIZE + 1) * width + 1;
    canvas.height = (CELL_SIZE + 1) * height + 1;

    const drawGrid = () => {
      ctx.beginPath();
      ctx.strokeStyle = GRID_COLOR;

      for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
      }

      for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
      }

      ctx.stroke();
    };

    const drawCells = () => {
      const cellsPtr = universe.cells();
      const cells = new Uint8Array(
        wasmModule.memory.buffer,
        cellsPtr,
        (width * height) / 8
      );

      ctx.beginPath();

      // Draw alive cells
      ctx.fillStyle = ALIVE_COLOR;
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          const idx = row * width + col;
          if ((cells[idx >> 3] & (1 << (idx & 7))) !== 0) {
            ctx.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
      }

      // Draw dead cells
      ctx.fillStyle = DEAD_COLOR;
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          const idx = row * width + col;
          if ((cells[idx >> 3] & (1 << (idx & 7))) === 0) {
            ctx.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }
      }

      ctx.stroke();
    };

    const renderLoop = () => {
      universe.tick();
      drawGrid();
      drawCells();
      requestAnimationFrame(renderLoop);
    };

    drawGrid();
    drawCells();
    renderLoop();
  }, [wasm]);

  return (
    <div>
      <h1>Game of Life</h1>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default GameOfLife;
