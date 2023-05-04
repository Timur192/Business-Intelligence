import NavBar from "../../components/NavBar";
import Chart from "../../components/Chart";
import DragAndDrop from "../../components/DragAndDrop";
import "./index.css";

function HomeView() {

  return (
    <>
    <NavBar />
      <div className="chart-page">
        <DragAndDrop />
        <Chart />
      </div>
    </>
  );
}

export default HomeView;
