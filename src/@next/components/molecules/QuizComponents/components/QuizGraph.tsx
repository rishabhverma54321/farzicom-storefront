import React, { useEffect, useRef, useState } from "react";
import styles from "../scss/index.module.scss";
import MemoCurveLine from "@components/atoms/SvgIcons/MemoCurveLine";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { getMetadataValue, parseJson } from "@utils/misc";
import { useRouter } from "next/router";
import { CachedImage } from "@components/molecules/CachedImage";
import { extractNumbersFromString } from "@components/molecules";

interface WeightLabelsProps {
  weightData: number[];
  options: any;
}

const WeightLabels: React.FC<WeightLabelsProps> = ({ weightData, options }) => {
  const marginTop = 20;
  const totalHeight = (weightData.length-1) * options?.yAxis + options?.yAxisFirstCoordinate + marginTop;
  const firstCoordinate: number = weightData.length - 1;
  return (
    <div className={styles.weightLabels}>
      <div
        className={styles.weightLabels_box}
        // style={{ bottom: `-${firstCoordinateHeight}px` }}
      >
        {weightData.map((weight, index) => (
          <div
            key={index}
            style={{
              height: `${
                firstCoordinate === index
                  ? options?.yAxisFirstCoordinate
                  : options?.yAxis
              }px`,
            }}
            className={styles.weightLabels_vertical}
          >
            {weight}
          </div>
        ))}
      </div>
      <div
        style={{ height: `${totalHeight}px`, marginTop: `-${marginTop}px` }}
        className={styles.weightLabels_vertical_height}
      />
    </div>
  );
};

const QuizHorizontalLabels = ({ data }: { data: any }) => {
  return (
    <div className={styles.quizHorizontalLabel}>
      <div className={styles.quizHorizontalLabel_line} />
      <div className={styles.quizHorizontalLabel_label}>
        {data?.map((item: string) => (
          <p>{item}</p>
        ))}
      </div>
    </div>
  );
};

export const QuizPoints = ({
  data,
  start,
  end,
  avg,
  options,
}: {
  data: any;
  start: number;
  end: number;
  avg: number;
  options: any;
}) => {
  const startPoint: any = useRef(null);
  const endPoint: any = useRef(null);
  const router = useRouter();
  const [svgWidth, setSvgWidth] = useState(null);
  const weightGoal: string = router?.query?.weightGoal as string | "";

  useEffect(() => {
    const updateSvgWidth = () => {
      if (startPoint.current && endPoint.current) {
        const startRect = startPoint.current.getBoundingClientRect();
        const endRect = endPoint.current.getBoundingClientRect();
        if (startRect && endRect) {
          setSvgWidth(endRect.left - startRect.left);
        }
      }
    };
    updateSvgWidth();

    // Recalculate on window resize to handle dynamic changes
    window.addEventListener("resize", updateSvgWidth);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateSvgWidth);
    };
  }, []);

  const desiredWeightRange = extractNumbersFromString(weightGoal);
  const desiredWeight: number =
    desiredWeightRange && desiredWeightRange.length === 2
      ? (desiredWeightRange[1] + desiredWeightRange[0]) / 2
      : desiredWeightRange[0];
  const start_bottom: number =
    Number(start) * options?.yAxis +
    options?.yAxisFirstCoordinate +
    options?.marginBottom; // its the targeted y axis for start
  const end_bottom: number =
    Number(end) * options?.yAxis +
    options?.yAxisFirstCoordinate +
    options?.marginBottom; // its the targeted y axis for end
  const avg_bottom: number = end_bottom - 30; // end_bottom + some margin-bottom (to cover up your Goal Text)
  const line_bottom: number =
    (Number(avg) + 1) * options?.yAxis + options?.yAxis + options?.marginBottom;
  const svgHeight: number = start_bottom - end_bottom;
  const end_bottom_svg: number = end_bottom;
  const svgLineCurve: number =
    desiredWeight <= 3 ? 1 : desiredWeight <= 6 ? 3 : 6;
  const svgLineCurveMob: number =
    desiredWeight <= 3 ? 1 : desiredWeight <= 6 ? 46 : 76;
  return (
    <div className={styles.weightGraph_coordinates}>
      <div
        style={{ bottom: `${start_bottom + 20}px` }}
        className={styles.weightGraph_coordinates_start}
        ref={startPoint}
      >
        {data?.before?.image ? (
          <div className={styles.weightGraph_coordinates_start_img}>
            <CachedImage
              url={data?.before?.image}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
        ) : (
          <></>
        )}
        <p>{data?.before?.weight} kgs</p>
      </div>
      <div
        style={{
          bottom: `${start_bottom - options?.beforeText}px`,
          left: "5.4rem",
        }}
        className={styles.weightGraph_coordinates_point}
      >
        {data?.before?.text || ""}
      </div>
      {svgWidth && isFinite(svgWidth) ? (
        <div
          style={{ bottom: `${end_bottom_svg}px` }}
          className={`${styles.weightGraph_coordinates_svg_desk} ${styles.weightGraph_coordinates_svg}`}
        >
          <MemoCurveLine
            height={svgHeight}
            width={svgWidth}
            totalAngle={svgLineCurve}
            circleHeight={svgHeight - 6}
          />
        </div>
      ) : (
        <></>
      )}
      {svgWidth && isFinite(svgWidth) ? (
        <div
          style={{ bottom: `${end_bottom_svg}px` }}
          className={`${styles.weightGraph_coordinates_svg_mob} ${styles.weightGraph_coordinates_svg}`}
        >
          <MemoCurveLine
            height={svgHeight}
            width={svgWidth}
            totalAngle={svgLineCurveMob}
            circleHeight={svgHeight}
          />
        </div>
      ) : (
        <></>
      )}
      <div
        style={{ bottom: `${end_bottom_svg + 9.5}px` }} // bottom + circle diameter
        className={styles.weightGraph_coordinates_line}
      />
      <div
        style={{
          bottom: `${avg_bottom}px`,
          height: `${options?.yAxis + 20}px`,
        }}
        className={styles.weightGraph_coordinates_avg}
      />
      <div
        ref={endPoint}
        style={{ bottom: `${end_bottom + options.afterImage}px` }}
        className={styles.weightGraph_coordinates_end}
      >
        {data?.after?.image ? (
          <div className={styles.weightGraph_coordinates_start_img}>
            <CachedImage
              url={data?.after?.image}
              isNextImage
              nextImageLayout="fill"
            />
          </div>
        ) : (
          <></>
        )}
        <p>{data?.after?.weight} kgs</p>
      </div>
      <div
        style={{
          bottom: `${end_bottom - options?.afterText}px`,
          right: `${options?.afterTextRight}rem`,
        }}
        className={styles.weightGraph_coordinates_point}
      >
        {data?.after?.text || ""}
      </div>
    </div>
  );
};

export const QuizGraphMarkDown = () => {
  return (
    <div className={styles.weightGraph_mark}>
      <div className={styles.weightGraph_mark_avg}>
        <div />
        <p>Ideal Weight</p>
      </div>
      <div className={styles.weightGraph_mark_line}>
        <div />
        <p>Goal Weight</p>
      </div>
      <div className={styles.weightGraph_mark_svg}>
        <div />
        <p>Your Plix Weight Loss Journey</p>
      </div>
    </div>
  );
};

export const QuizGraph = ({ metaData }: { metaData: Array<any> }) => {
  const quizGraphData =
    metaData &&
    getMetadataValue(metaData, "graph_data") &&
    parseJson(getMetadataValue(metaData, "graph_data"));

  const router = useRouter();

  const weight = router?.query?.weight || "";
  const month: string = (router?.query?.month as string) || "1month";
  const weightGoal: string = router?.query?.weightGoal as string | "";

  const filterdWeightGoal = extractNumbersFromString(weightGoal);

  const weightloss: string | number =
    filterdWeightGoal?.length === 2
      ? `${Number(weight) - Number(filterdWeightGoal[1])}` +
        "-" +
        `${Number(weight) - Number(filterdWeightGoal[0])}`
      : Number(weight) - Number(filterdWeightGoal[0]);

  const bodyType: string = router?.query?.bodyType as string | "";

  const graphData = (quizGraphData && quizGraphData[`${bodyType}`]) || {};

  const updatedGraphData = {
    ...graphData,
    before: { ...graphData.before, weight },
    after: { ...graphData.after, weight: weightloss },
  };

  const weightlossString = weightloss.toString();
  const newWeightloss =
    weightlossString.split("-").length > 1
      ? Math.round(
          (Number(weightlossString.split("-")[0]) +
            Number(weightlossString.split("-")[1])) /
            2
        )
      : weightloss;

  const [width] = useWindowWidth();
  const options = {
    yAxis: width > 540 ? 380 : 150,
    yAxisFirstCoordinate : width > 540 ? 100 : 60,
    marginBottom: width > 540 ? 31 : 21,
    beforeText: width > 540 ? 30 : 18,
    afterText: width > 540 ? 20 : 12,
    afterTextRight: width > 540 ? 3 : 2.7,
    afterImage: width > 540 ? 30 : 24,
  };
  const weightData = Array.isArray(quizGraphData?.yAxis) ? [...quizGraphData?.yAxis] :[]; // Adding an empty element to mantain the height of y-axis
  const reversedWeightData = [...weightData].reverse();
  const midIndex = reversedWeightData.findIndex(
    item => item > Number(newWeightloss) // 90
  );
  const udpatedWeightData = [
    ...reversedWeightData.slice(midIndex - 1, midIndex),
    ...reversedWeightData.slice(midIndex, midIndex + 2),
  ];

  const reverseWeightData = [...udpatedWeightData];
  const daysData = quizGraphData?.xAxis[month] || [];
  const startIndex = reverseWeightData.findIndex(
    item => item > Number(weight) // 90
  );
  const endIndex = reverseWeightData.findIndex(
    item => item > Number(newWeightloss) // 83
  );
  const start =
    startIndex !== -1 ? Number(weight) - reverseWeightData[startIndex - 1] : 0;
  const end =
    endIndex !== -1
      ? Number(newWeightloss) - reverseWeightData[endIndex - 1]
      : 0;
  const avg = reverseWeightData.findIndex(item => item === 50);

  const startPoint = Number(`${startIndex - 1}.${start}`);
  const endPoint = Number(`${endIndex - 1}.${end}`);
  const newWeightData = [...udpatedWeightData].reverse();

  if (quizGraphData && quizGraphData?.enable) {
    return (
      <div className={styles.weightGraph}>
        <div className={styles.weightGraph_graph}>
          <WeightLabels weightData={newWeightData} options={options} />
          <QuizPoints
            data={updatedGraphData}
            start={startPoint}
            end={endPoint}
            avg={endIndex} // avg starts from end index of weight range
            options={options}
          />
          <QuizHorizontalLabels data={daysData} />
        </div>
        <QuizGraphMarkDown />
      </div>
    );
  }
  return <></>;
};

QuizGraph.displayName = "QuizGraph";

export default QuizGraph;
