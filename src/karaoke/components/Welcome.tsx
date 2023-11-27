import { useUiKaraoke } from "../../hooks/useUiKaraoke";
export const WelcomePage = () => {
  const { nextPage } = useUiKaraoke();
  return (
    <div>
      <img
        src={'./assets/images/frame1.png'}
        alt=""
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <img
        src={'./assets/images/boton.png'}
        alt=""
        style={{
          width: "50.88%",
          height: "3.52%",
          left: "24.61%",
          top: "68.23%",
          position: "absolute",
        }}
        onClick={() => {
          nextPage();
        }}
      />
    </div>
  );
};
