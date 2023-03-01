import ContentLoader from 'react-content-loader'
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";

const HomeContentLoader = () => {
    const { height, width } = useWindowDimensions();


    return <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    }}>
        <ContentLoader
            speed={4}
            width={width}
            height={height}
        >
            <rect width={width / 2 - 80} height={96} rx={8} ry={8} x={40} y={48} />
            <rect width={width / 2 - 80} height={96}  rx={8} ry={8} radius={8} x={width/2 + 40} y={48} />
            <rect width={width / 2 - 80} height={72} rx={8} ry={8} x={40} y={180} />
            <rect width={width / 2 - 80} height={72}  rx={8} ry={8} radius={8} x={width/2 + 40} y={180} />
        </ContentLoader>
    </div>
}

export default HomeContentLoader
