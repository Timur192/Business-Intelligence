import { useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import useDataSlice from "../../zustand/dataSlice";
import useToasts from "../../hooks/useToast";
import './index.css'

function index() {
  const [stateData, setStateData] = useState<any>([]);
  const [topology, setTopology] = useState();
  const [loadingMap, setLoadingMap] = useState(true);
  const { country, options } = useDataSlice((state) => state.dataState);
  const { ShowToast } = useToasts();
  const chartRef = useRef(null);

  useEffect(() => {
    if (country === "sales" || options === "usa" || options === "uzb") {
      ShowToast({
        status: "warning",
        error: "Check if you dragged the element correctly",
      });
    }
    if (country || options === undefined || country === undefined) {
      setLoadingMap(true);
      setStateData([]);
      setTopology(undefined);
    }

    fetch(`https://code.highcharts.com/mapdata/countries/${country?.slice(0,2)}/${country?.slice(0, 2)}-all.topo.json`)
      .then((response) => response.json())
      .then((res) => setTopology(res))
      .then(() => setLoadingMap(false));

    getDocs(collection(db, `${country}-${options}`)).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setStateData((prevState: any) => [
          ...prevState,
          [`${country?.slice(0, 2)}-${data.code.toLowerCase()}`, data.sales],
        ]);
      })
    );
  }, [country, options]);

  const option = {
    chart: {
      map: topology,
    },
    title: {
      text: `${country} Sales`
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox",
      },
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        name: "Sales",
        states: {
          hover: {
            color: "green",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        allAreas: false,
        data: stateData,
      },
    ],
  };

  return (
    <>
      {!loadingMap && (
        <div className="MapContainer">
        <HighchartsReact
          highcharts={Highcharts}
          options={option}
          constructorType={"mapChart"}
          updateArgs={[true, true, true]}
          ref={chartRef}
          />
          </div>
      )}
    </>
  );
}

export default index;
