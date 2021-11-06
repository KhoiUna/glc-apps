import Layout from "../containers/layout";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import fetchReservationTimeForChart from "../utils/fetchReservationTimeForChart";
import FormatTime from "../helpers/FormatTime";

let vAxisTicks = new Array(24).fill(null).map((item, index) => ({
  v: index,
  f: FormatTime.timeSlot(index),
}));

export default function Time({}) {
  const [timeData, setTimeData] = useState([]);
  useEffect(() => {
    fetchReservationTimeForChart()
      .then((r) => setTimeData(r))
      .catch((err) => console.error("Error fetching time data"));
  }, []);

  return (
    <Layout componentName="Busy Times">
      <h2 style={{ textAlign: "center" }}>Kitchen's busy times</h2>

      <div
        style={{
          textAlign: "center",
          margin: "1rem 0 0 0",
          minHeight: "50vh",
        }}
      >
        <Chart
          width={"100%"}
          height={400}
          chartType="BubbleChart"
          loader={<p>Loading Chart...</p>}
          data={timeData}
          options={{
            colorAxis: { colors: ["#ff0", "#f00"] },
            sizeAxis: {
              maxSize: 10,
            },
            hAxis: {
              title: "Day of the week",
              ticks: [
                { v: 0, f: "Sun" },
                { v: 1, f: "Mon" },
                { v: 2, f: "Tue" },
                { v: 3, f: "Wed" },
                { v: 4, f: "Thu" },
                { v: 5, f: "Fri" },
                { v: 6, f: "Sat" },
              ],
              viewWindow: {
                min: -2,
                max: 8,
              },
            },
            vAxis: {
              title: "Time slot",
              ticks: vAxisTicks,
              viewWindow: {
                min: -5,
                max: 28,
              },
              gridlines: {
                minSpacing: 1,
                color: "",
              },
            },
          }}
        />
      </div>
    </Layout>
  );
}
