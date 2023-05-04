import { useState } from "react";
import { DataElement, DroppableCase } from "./interface";
import { DropResult } from "react-beautiful-dnd";
import useDataSlice from "../../zustand/dataSlice";

const countriesState: DataElement[] = [
  { id: "1", content: "usa" },
  { id: "2", content: "uzb" },
];

const optionsState: DataElement[] = [{ id: "3", content: "sales" }];

const columnsName: DroppableCase = {
  countries: {
    name: "Countries",
    items: countriesState,
  },
  columns: {
    name: "Columns",
    items: [],
  },
  options: {
    name: "Options",
    items: optionsState,
  },
  row: {
    name: "Row",
    items: [],
  },
};

function useDND() {
  const [columns, setColumns] = useState(columnsName);
  const setUser = useDataSlice((state) => state.setData);

  let country = columns.columns.items[0]?.content;
  let options = columns.row.items[0]?.content;

  setUser(country, options);

  const onDragEnd = (result: DropResult, columns: { [x: string]: any; }, setColumns: (arg0: any) => void) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return { onDragEnd, columns, setColumns };
}

export default useDND;
