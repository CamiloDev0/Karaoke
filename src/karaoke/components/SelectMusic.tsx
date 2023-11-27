import { useUiKaraoke } from "../../hooks/useUiKaraoke";

export const SelectMusic = () => {
  const { nextPage, setSelectedMusic } = useUiKaraoke();

  return (
    <div>
      <img
        src="./assets/images/frame2.png"
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <img
        src="./assets/images/boton.png"
        alt=""
        style={{
          width: "39.55%",
          height: "11.86%",
          left: "30.18%",
          top: "53%",
          position: "absolute",
        }}
        onClick={() => [
          nextPage(),
          setSelectedMusic("bonito"),
          //   setCountstart(true),
        ]}
      />
      <img
        src="./assets/images/boton.png"
        alt=""
        style={{
          width: "39.55%",
          height: "11.86%",
          left: "30.18%",
          top: "66.32%",
          position: "absolute",
        }}
        onClick={() => [
          nextPage(),
          setSelectedMusic("provenza"),
          //   setCountstart(true),
        ]}
      />
    </div>
  );
};
