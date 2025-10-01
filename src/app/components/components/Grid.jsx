// components/Grid.js

import Analysis from "./Analysis";

const Grid = () => {

  return (
    <div className="p-3 flex flex-col gap-3 items-center justify-center w-full">
      {/* <Card type="danger"></Card>
      <Card type="primary"></Card>
      <Card type="neutral"></Card>
      <Card type="success"></Card> */}

      <Analysis></Analysis>
    </div>
  );
};

export default Grid;
