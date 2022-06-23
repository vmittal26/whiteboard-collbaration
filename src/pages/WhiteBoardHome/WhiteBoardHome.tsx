import "font-awesome/css/font-awesome.css";
import { useContext } from "react";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import { WhiteBoard } from "../../components/WhiteBoard/WhiteBoard";
import { useGetSocket } from "../../hooks/useGetSocket";
import { ClientInfoProvider, ClientInfoProviderContext } from "../../provider/ClientInfoProvider";
import { ShapeInfoProvider } from "../../provider/ShapeInfoProvider";
import { ShapesDataProvider } from "../../provider/ShapesDataProvider";
import { ToolBarWrapper, WhiteBoardHomeWrapper, WhiteBoardWrapper } from "./WhiteBoardJss";

function WhiteBoardHome() {


  return (
    <WhiteBoardHomeWrapper>
      <ClientInfoProvider>
      <ShapesDataProvider>
      <ShapeInfoProvider>
        <WhiteBoardWrapper>
          <WhiteBoard />
        </WhiteBoardWrapper>
        <ToolBarWrapper>
          <ToolBar />
        </ToolBarWrapper>
      </ShapeInfoProvider>
      </ShapesDataProvider>
      </ClientInfoProvider>
    </WhiteBoardHomeWrapper>
  );
}

export default WhiteBoardHome;
