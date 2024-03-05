import cn from "clsx";
import Concepts from "./Concepts";
import Relations from "./Relations";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLeftSidebarOpen } from "../store/menu/menu.selectors";
import { toggleLeftSidebar } from "../store/menu/menu.actions";
import { Button } from "flowbite-react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export default function LeftSidebar() {
  const dispatch = useDispatch();
  const open = useSelector(selectIsLeftSidebarOpen);
  const toggleOpenLeft = () => dispatch(toggleLeftSidebar());
  return (
    <div>
      <aside
        id="default-sidebar"
        className={cn(
          "absolute top-0 left-0 z-40 w-64 h-screen transition-transform",
          { "-translate-x-full": !open, "translate-x-0": open }
        )}
        aria-label="Sidenav"
      >
        <div className="flex flex-col overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <Concepts />
          <Relations />
        </div>
        <Button
          className="absolute top-24 -right-12 border-0"
          color="light"
          size="sm"
          onClick={toggleOpenLeft}
        >
          {open ? <RxCross1 /> : <RxHamburgerMenu />}
        </Button>
      </aside>
    </div>
  );
}
