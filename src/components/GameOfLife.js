import React, { useEffect, useRef, useState, useCallback } from "react";
import initWasm, { Universe } from "./rustyGame/pkg/wasm_game_of_life.js";
const fps = new (class {
  constructor() {
    this.fpsElement = null; // Initialize as null, dynamically set later
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }

  updateFpsElement() {
    // if (!this.fpsElement) {
    this.fpsElement = document.getElementById("fps");
    // }
  }

  render() {
    this.updateFpsElement();
    if (!this.fpsElement) return; // Exit early if FPS element is not found

    const now = performance.now();
    const delta = now - this.lastFrameTimeStamp;
    this.lastFrameTimeStamp = now;

    const fps = 1000 / delta;

    // Keep only the latest 100 frames
    this.frames.push(fps);
    if (this.frames.length > 100) {
      this.frames.shift();
    }

    // Calculate statistics
    const min = Math.min(...this.frames);
    const max = Math.max(...this.frames);
    const mean =
      this.frames.reduce((acc, curr) => acc + curr, 0) / this.frames.length;

    // Update the HTML content of the FPS display
    this.fpsElement.innerHTML = `
      <div>Frames per Second:</div>
      <div>Latest: ${Math.round(fps)}</div>
      <div>Avg (last 100): ${Math.round(mean)}</div>
      <div>Min (last 100): ${Math.round(min)}</div>
      <div>Max (last 100): ${Math.round(max)}</div>
    `;
  }
  reset() {
    this.frames = [];
    this.lastFrameTimeStamp = performance.now();
  }
})();
const GameOfLife = (callback, deps) => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const fpsRef = useRef(null);
  const [wasmModule, setWasm] = useState(null);
  const [universe, setUniverse] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [isPause, setIsPause] = useState(false); // Start un-paused
  const [selectedDirection, setSelectedDirection] = useState(0);
  const [selectedSpaceshipDirection, setSelectedSpaceshipDirection] =
    useState(0);

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
    const ctx = canvasRef.current?.getContext("2d");
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
  }, [width, height, CELL_SIZE, GRID_COLOR]);

  const drawCells = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
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
        fps.render();
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

  //   useEffect(() => {
  //     fps.reset();
  //   }, []);

  const togglePlayPause = () => {
    setIsPause((prev) => !prev);
  };
  const clearBoard = () => {
    universe.reset_canvas();
    drawGrid();
    drawCells();
  };

  const addGlider = () => {
    const direction = selectedDirection;
    if (direction < 0 || direction > 3) {
      setSelectedDirection(0);
    }
    universe.place_glider(direction);
    drawGrid();
    drawCells();
  };

  const addSpaceshipe = () => {
    const direction = selectedSpaceshipDirection;
    if (direction < 0 || direction > 3) {
      setSelectedSpaceshipDirection(0);
    }
    universe.place_lightweight_spaceship(direction);
    drawGrid();
    drawCells();
  };
  const restartBoard = () => {
    universe.start_random_canvas();
    drawGrid();
    drawCells();
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {/* Header Section */}

      <article className="text-balance gap-4 ">
        <h1 className="text-2xl font-bold mb-4">Game of Life</h1>
        This is demo Web-Assembly project with game of life
        <p />
        The engine of calculation is built with Rust. The benefit of the using
        Rust is obvious, for it's low-level control and memory efficiency. Rust
        lacks a runtime, enabling small .wasm sizes because there is no extra
        bloat included like a garbage collector. You only pay (in code size) for
        the functions you actually use.
        <p />
        <p>
          The project is followed by
          <a
            href="https://rustwasm.github.io/docs/book/p"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Rust and WebAssembly
          </a>
          book, which explain how to use wasm library and how to make
          interaction between Rust and frontend.
        </p>
      </article>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-5xl">
        {/* Canvas Wrapper */}
        <div className="flex justify-center w-full md:w-2/3 shadow-md rounded-lg p-4">
          <canvas
            className="border -gray-300 rounded"
            ref={canvasRef}
            style={{
              width: `${width * (CELL_SIZE + 1) + 1}px`,
              height: `${height * (CELL_SIZE + 1) + 1}px`,
            }}
            width={width * (CELL_SIZE + 1) + 1}
            height={height * (CELL_SIZE + 1) + 1}
          />
        </div>

        {/* Sidebar Section */}
        <div className="flex flex-col items-center w-full md:w-1/3 shadow-md rounded-lg p-4">
          {/* FPS Counter */}
          <div id="fps" ref={fpsRef} className="text-sm mb-4 space-y-1"></div>

          <div className="flex items-center gap-4">
            {/* Play/Pause Button */}
            <button
              className="bg-primary_bright hover:bg-highlight py-2 px-4 rounded mb-4"
              onClick={togglePlayPause}
            >
              {isPause ? "▶ Start" : "|| Pause"}
            </button>
            <button
              className="bg-primary_bright hover:bg-highlight py-2 px-4 rounded mb-4"
              onClick={clearBoard}
            >
              Clear Board
            </button>
            <button
              className="bg-primary_bright hover:bg-highlight py-2 px-4 rounded mb-4"
              onClick={restartBoard}
            >
              Random Board
            </button>
          </div>
          {/* Controls */}
          {/* Controls */}
          <div className="flex flex-col gap-4 w-full">
            {/* Add Glider Buttons */}
            <div className="flex flex-col gap-2">
              <button
                className="bg-primary_bright hover:bg-highlight py-2 px-4 rounded"
                onClick={addGlider}
              >
                Add Glider
              </button>
              <div className="flex items-center gap-2">
                <span>Position Glider:</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((dir) => (
                    <button
                      key={dir}
                      className={`py-1 px-2 rounded ${
                        selectedDirection === dir
                          ? "bg-dark text-black"
                          : "bg-primary_bright hover:bg-highlight"
                      }`}
                      onClick={() => setSelectedDirection(dir)}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add Spaceship Buttons */}
            <div className="flex flex-col gap-2">
              <button
                className="bg-primary_bright hover:bg-highlight py-2 px-4 rounded"
                onClick={addSpaceshipe}
              >
                Add Spaceship
              </button>
              <div className="flex items-center gap-2">
                <span> Position Spaceship:</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((dir) => (
                    <button
                      key={dir}
                      className={`py-1 px-2 rounded ${
                        selectedSpaceshipDirection === dir
                          ? "bg-dark text-black"
                          : "bg-primary_bright hover:bg-highlight"
                      }`}
                      onClick={() => setSelectedSpaceshipDirection(dir)}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
