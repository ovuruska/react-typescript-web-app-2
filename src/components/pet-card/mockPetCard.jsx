import ContentLoader from "react-content-loader";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function MockPetCard() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="pet-card-mock">
      <ContentLoader
        speed={2}
        width={400}
        height={80}
        backgroundColor="#3894d7"
        foregroundColor="#ecebeb"
      >
        {" "}
        <rect x="15" y="8" rx="3" ry="3" width="45%" height="70px" />
        <rect x={width / 2} y="8" rx="3" ry="3" width="45%" height="80px" />
      </ContentLoader>
    </div>
  );
}
