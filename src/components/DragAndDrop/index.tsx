import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DataElement } from "./interface";
import useDnd from "./dndFunctions";

function index() {
  const { onDragEnd, columns, setColumns } = useDnd();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "auto auto", height: '90vh' }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              style={{
                display: "flex",
                border: "1px solid #b0b0b0",
                margin: "0 10px 0 0",
              }}
              key={columnId}
            >
              <Droppable droppableId={columnId} key={columnId}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "#fff",
                        padding: 4,
                        width: 170,
                        height: 'auto',
                      }}
                    >
                      <h2>{column.name}</h2>
                      {column.items.map((item: DataElement, index: number) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: "none",
                                    borderRadius: "5px",
                                    padding: '10px 0 0 10px',
                                    margin: "0 0 5px 0",
                                    minHeight: "45px",
                                    backgroundColor: snapshot.isDragging
                                      ? "#263B4A"
                                      : "#456C86",
                                    color: "white",
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {item.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default index;
