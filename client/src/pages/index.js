import Image from "next/image";
import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react"; // Import Button from Chakra UI
import Login from "./login/index";

const inter = Inter({ subsets: ["latin"] });
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Input,
} from "@chakra-ui/react";
import { logout } from "@/redux/reducerSlices/userSlice";
import { useRouter } from "next/router";

const CustomMenu = () => {
  // Renamed Menu to CustomMenu
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="pink">
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <button onClick={() => router.push("/account")}>
            {" "}
            <MenuItem>My Account</MenuItem>
          </button>
          <Button onClick={() => dispatch(logout())}>
            <MenuItem>logout</MenuItem>
          </Button>
        </MenuGroup>
        <MenuDivider />
        {/* <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup> */}
      </MenuList>
    </Menu>
  );
};
export default function Home() {
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* <> {token}</> */}
      {isLoggedIn && userDetails != "Guest-User" ? (
        <CustomMenu />
      ) : (
        <div>
          {" "}
          <button>Login</button>
          <button>Register</button>
        </div>
      )}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Input
            color="tomato"
            placeholder="Enter your Tracking ID"
            _placeholder={{ opacity: 0.4, color: "inherit" }}
          />

          <Image
            src="/dropslogo.png"
            alt="Drops Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </div>

      {/* <CustomMenu /> */}

      {/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src=""
          alt="Drops Logo"
          width={180}
          height={37}
          priority
        />
      </div> */}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
