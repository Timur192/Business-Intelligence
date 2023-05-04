export interface DataElement {
  id: string;
  content: string;
}

export interface DroppableCase {
  countries: DroppableElement;
  columns: DroppableElement;
  options: DroppableElement;
  row: DroppableElement;
}

interface DroppableElement {
  name: string;
  items: DataElement[] | [];
}