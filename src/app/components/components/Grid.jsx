// components/Grid.js

import Card from "./Card";

const Grid = () => {

  return (
    <div className="p-3 flex flex-col gap-3">
      <Card type="danger"></Card>
      <Card type="primary"></Card>
      <Card type="neutral"></Card>
      <Card type="success"></Card>
    </div>
  );
};

export default Grid;
