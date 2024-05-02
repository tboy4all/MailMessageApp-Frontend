import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./component/Home";
import Layout from "./component/Layout";
import Message from "./component/Message";
import MessageDetails from "./component/MessageDetails";
import NotFound from "./component/NotFound";
import TogglePage from "./component/TogglePage";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<TogglePage />} />
        <Route path='/Dashboard' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='messages' element={<Message />} />
          <Route path='messages/:id' element={<MessageDetails />} />
          <Route path='*' element={<Navigate to={<NotFound />} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
