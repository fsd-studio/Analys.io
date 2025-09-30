// components/Grid.js
import { useRef, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";

const Grid = () => {
  const [scale, setScale] = useState(1); // Zoom level
  const [objects, setObjects] = useState([]); // List of added objects
  const stageRef = useRef(null);

  // Function to handle zooming
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    // Zoom factor
    const scaleBy = 1.1;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setScale(newScale);

    // Adjust position to keep zoom centered
    stage.scale({ x: newScale, y: newScale });
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  // Function to draw the grid
  const drawGrid = () => {
    const gridSize = 50; // Size of each grid cell
    const lines = [];
    const width = 2000; // Canvas width
    const height = 2000; // Canvas height

    // Vertical lines
    for (let i = 0; i < width / gridSize; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i < height / gridSize; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, width, i * gridSize]}
          stroke="#ddd"
          strokeWidth={1}
        />
      );
    }

    return lines;
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable // Allow panning
        onWheel={handleWheel}
        ref={stageRef}
      >
        {/* Grid Layer */}
        <Layer>{drawGrid()}</Layer>

        {/* Objects Layer */}
        <Layer>
          {objects.map((obj) => (
            <Rect
              key={obj.id}
              x={obj.x}
              y={obj.y}
              width={obj.width}
              height={obj.height}
              fill={obj.fill}
              draggable // Allow dragging objects
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Grid;
