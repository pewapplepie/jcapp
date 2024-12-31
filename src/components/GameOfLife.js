import React, { useEffect, useRef, useState, useCallback } from "react";
import initWasm, { Universe } from "./rustyGame/pkg/wasm_game_of_life.js";

const GameOfLife = (callback, deps) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const [wasmModule, setWasm] = useState(null);
  const [universe, setUniverse] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [isPause, setIsPause] = useState(false); // Start un-paused
  const CELL_SIZE = 5;

  const GRID_COLOR = "#f8f5f6";
  const ALIVE_COLOR = "#2B282A";
  const DEAD_COLOR = "#fcfcfc";

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const wasmModule = await initWasm();
        const univ = Universe.new();
        setWasm(wasmModule);
        setUniverse(univ);
        setWidth(univ.width());
        setHeight(univ.height());
        console.log("Wasm Universe initialized:", univ);
      } catch (error) {
        console.error("Failed to initialize WebAssembly:", error);
      }
    };

    loadWasm();
  }, []);

  const drawGrid = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
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
  }, [width, height, CELL_SIZE, GRID_COLOR])

  const drawCells = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !universe || !wasmModule) return;
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
  }, [universe, wasmModule, width, height, CELL_SIZE, ALIVE_COLOR, DEAD_COLOR]);

  useEffect(() => {
    if (!universe || !wasmModule) return;

    const renderLoop = () => {
      if (!isPause) {
        universe.tick();
        drawGrid();
        drawCells();
        animationIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    if (!isPause) {
      renderLoop();
    } else if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [universe, wasmModule, isPause, drawGrid, drawCells]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !universe) return;

    const handleClick = (event) => {
      const boundingRect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / boundingRect.width;
      const scaleY = canvas.height / boundingRect.height;

      const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
      const canvasTop = (event.clientY - boundingRect.top) * scaleY;

      const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
      const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

      universe.toggle_cell(row, col);

      drawGrid();
      drawCells();
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [universe, drawGrid, drawCells, width, height]);

  const togglePlayPause = () => {
    setIsPause(prev => !prev);
  };

  return (
    <div className="flex flex-col">
      <h1>Game of Life</h1>
      <canvas className="min-w-full" ref={canvasRef} width={width * (CELL_SIZE + 1) + 1} height={height * (CELL_SIZE + 1) + 1} />
      <div className="flex flex-col justify-center">
        <div>
          <button className="hover:bg-dark py-2 w-1/5 rounded-l font-bold" onClick={togglePlayPause}>
            {isPause ? "▶" : "||"}
          </button>
        </div>
        <div className="flex flex-row justify-center">
          <button>Add Glider</button>
          <button>Position</button>
        </div>
        <div className="flex flex-row justify-center">
          <button>Add Spaceship</button>
          <button>Position</button>
        </div>
      </div>
    </div>
  )
};

export default GameOfLife;