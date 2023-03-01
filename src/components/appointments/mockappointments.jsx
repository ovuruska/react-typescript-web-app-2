import ContentLoader from "react-content-loader";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function MockAppointments() {
  const { height, width } = useWindowDimensions();

  return (
    <ContentLoader
      speed={2}
      width={400}
      height={450}
      backgroundColor="#fff"
      foregroundColor="#ecebeb"
    >
      {" "}
      <rect
        x={(width - 350) / 2}
        y="8"
        rx="3"
        ry="3"
        width="350"
        height="65px"
      />
      <rect
        x={(width - 350) / 2}
        y="93"
        rx="3"
        ry="3"
        width="350"
        height="65px"
      />
      <rect
        x={(width - 350) / 2}
        y="178"
        rx="3"
        ry="3"
        width="350"
        height="65px"
      />
      <rect
        x={(width - 350) / 2}
        y="263"
        rx="3"
        ry="3"
        width="350"
        height="65px"
      />
      <rect
        x={(width - 350) / 2}
        y="348"
        rx="3"
        ry="3"
        width="350"
        height="65px"
      />
    </ContentLoader>
  );
}
