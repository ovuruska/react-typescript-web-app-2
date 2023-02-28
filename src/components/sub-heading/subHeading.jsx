export default function SubHeading(props) {
  return (
    <div
      className="subheading-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: "10px 0",
        marginTop: "20px",
      }}
    >
      <div
        className="flex-wrapper"
        style={{
          width: "95%",
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: "20px",
            marginLeft: "10px",
            color: "#787878",
          }}
        >
          {props.title}
        </h1>
      </div>
    </div>
  );
}
