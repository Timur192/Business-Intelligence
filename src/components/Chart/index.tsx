import ReactECharts from "echarts-for-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { SunIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import useDataSlice from "../../zustand/dataSlice";
import useToasts from "../../hooks/useToast";
import "./index.css";

interface IState {
  state: string;
  code: string;
  sales: number;
}

function index() {
  const [stateData, setStateData] = useState<IState[]>([]);
  const [filters, setFilters] = useState<"filterToDown" | "filterToUp" | undefined>(undefined);
  const [coloredActive, setColoredActive] = useState<boolean>(false);
  const { country, options } = useDataSlice((state) => state.dataState);
  const { ShowToast } = useToasts();
  
  useEffect(() => {
    if (country === "sales" || options === "usa" || options === "uzb") {
      ShowToast({ status: "warning", error: "Check if you dragged the element correctly" });
    }
    if (country || options === undefined || country === undefined) {
      setStateData([]), setFilters(undefined);
    }
    getDocs(collection(db, `${country}-${options}`)).then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setStateData((prevState) => [
          ...prevState,
          {
            state: data.state,
            code: data.code,
            sales: data.sales,
          },
        ]);
      })
    );
  }, [country, options]);

  function filterBySalesAscending(arr: IState[]) {
    return arr
      .filter(function (item) {
        return typeof item.sales === "number";
      })
      .sort(function (a, b) {
        return b.sales - a.sales;
      });
  }

  const Filter = () => {
    setFilters(filters == "filterToDown" ? "filterToUp" : "filterToDown");
    if (filters) {
      setStateData(stateData.reverse().concat());
    } else {
      setStateData(filterBySalesAscending(stateData));
    }
  };

  const Colored = () => {
    setColoredActive(true);
  };

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisLabel: { interval: 0, rotate: -90 },
        data: stateData.map((item) => item.state),
        axisTick: {
          alignWithLabel: true,
        },
        nameTextStyle: {},
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    visualMap: coloredActive
      ? {
          show: false,
          min: 1000,
          max: stateData[0] && filterBySalesAscending(stateData)[0].sales,
          inRange: {
            color: ["#E21A07", "#F19A00", "#F5C100", "#C0FF01", "#55EF15"],
          },
          calculable: true,
        }
      : false,
    series: [
      {
        name: "Sales",
        type: "bar",
        barWidth: "60%",
        data: stateData.map((item) => item.sales),
      },
    ],
  };

  return (
    <>
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "100%" }}
      />
      <IconButton
        className="filterBTN"
        aria-label="filter"
        onClick={Colored}
        colorScheme={coloredActive ? "yellow" : "gray"}
        icon={<SunIcon />}
      />
      <IconButton
        className="filterBTN"
        aria-label="filter"
        onClick={Filter}
        icon={
          filters == "filterToDown" ? <TriangleDownIcon /> : <TriangleUpIcon />
        }
      />
    </>
  );
}

export default index;
