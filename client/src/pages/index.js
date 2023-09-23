import Image from "next/image";
import { Inter } from "next/font/google";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@chakra-ui/react"; // Import Button from Chakra UI
import Login from "./login/index";
import { useState, useEffect } from "react";
// import styles from "../styles/form.module.css";
// import styles from "../styles/styles.module.css";
import styles from "../styles/form.module.css";

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
// google map docs
// import {
//   GoogleMap,
//   MarkerF,
//   Autocomplete,
//   useJsApiLoader,
// } from "@react-google-maps/api";

const PlacesCard = (props) => {
  return (
    // <div
    //   onMouseLeave={() => props.setIsSelectionOngoing(false)}
    //   onMouseOver={() => props.setIsSelectionOngoing(true)}
    //   className={styles.autocompleteBox}
    // >
    {
      /* {props.searchedPlaceList.length > 0 &&
        props.searchedPlaceList.map((item) => {
          return (
            <div
              onClick={() => {
                props.setPickInputAddress(item.formatted);
                props.setPickUpOpen(false);
              }}
              className={styles.autocompleteList}
            >
              {item.formatted.length > 15
                ? item.formatted.substring(0, 15) + "..."
                : item.formatted}
            </div>
          );
        })} */
    }
    // </div>
  );
};

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
  // google map docs
  // const [currentPos, setCurrentPos] = useState({
  //   lat: 27.700769,
  //   lng: 85.30014,
  // });

  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  //google map docs
  // const { isLoaded, loadError } = useJsApiLoader({
  //   // google map API used and libraries: places used
  //   googleMapsApiKey: "AIzaSyDLfjmFgDEt9_G2LXVyP61MZtVHE2M3H-0", // ,
  //   libraries: ["places"],
  // });

  // const [pickInputAddress, setPickInputAddress] = useState("");
  // const [dropInputAddress, setDropInputAddress] = useState("");

  // const [pickUpOpen, setPickUpOpen] = useState(false);
  // const [dropOpen, setDropOpen] = useState(false);

  // const [searchedPlaceList, setSearchedPlaceList] = useState([]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((latlan) => {
  //     const { latitude, longitude } = latlan.coords;
  //     setCurrentPos({ lat: latitude, lng: longitude });
  //   });
  // }, []);

  // const generatePlaces = async (text, pick) => {
  //   if (pick) {
  //     console.log(pick, "iam pickup");
  //     setPickUpOpen(true);
  //     setPickInputAddress(text);
  //   } else {
  //     setDropOpen(true);
  //     setDropInputAddress(text);
  //   }
  //   const res = await fetch(
  //     `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=a1dd45a7dfc54f55a44b69d125722fcb`
  //   );
  //   const data = await res.json();
  //   if (data.results) {
  //     setSearchedPlaceList(data.results);
  //   }
  // };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* // google map docs */}
      {/* {isLoaded && (
        <GoogleMap
          id="circle-example"
          mapContainerStyle={{
            height: "400px",
            width: "800px",
          }}
          zoom={13}
          center={{
            lat: 27.700769,
            lng: 85.30014,
          }}
        >
          <MarkerF draggable={true} position={currentPos} />
        </GoogleMap>
      )} */}
      {/* Automplete for map input used */}
      {/* <Autocomplete>
        <input />
      </Autocomplete> */}
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
