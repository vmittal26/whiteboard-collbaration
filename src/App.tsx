import "font-awesome/css/font-awesome.css";
import "./App.css";

import { AppWrapper, ToolBarWrapper, WhiteBoardWrapper } from "./AppJss";
import { ToolBar } from "./components/ToolBar/ToolBar";
import { WhiteBoard } from "./components/WhiteBoard/WhiteBoard";
import { ShapeInfoProvider } from "./provider/ShapeInfoProvider";
import { ShapesDataProvider } from "./provider/ShapesDataProvider";

function App() {
  return (
    <AppWrapper>
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
    </AppWrapper>
  );
}

export default App;
