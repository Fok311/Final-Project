import { Navbar, Button, Dropdown, Indicator, Badge } from "react-daisyui";
import { useRouter } from "next/navigation";
import {  useState, useEffect } from "react";
import { useQuery } from "react-query";
import localforage from "localforage";
import { logout } from "@/pages/api/users";
import { getUser } from "@/pages/api/users";

export default function Nav() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: userCheck } = useQuery("role", () => getUser())
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const token = await localforage.getItem("token");
      if (token) {
        setLoading(false);
        setAuth(token);
      }
    };
    getToken();
  }, []);





  return (
    <div className="pb-10 flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
      <Navbar>
        <Navbar.Start>
          <Dropdown>
            <Button color="ghost" shape="circle" tabIndex={0}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Button>
            <Dropdown.Menu tabIndex={0} className="menu-compact w-52">
              <Dropdown.Item href="/">Homepage</Dropdown.Item>
              {!auth ? (
                <>
                  <Dropdown.Item href="/login">Login</Dropdown.Item>
                  <Dropdown.Item href="/register">Register</Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item
                  onClick={() => {
                    logout();
                    setAuth(false)
                    push("/");
                  }}
                >
                  Logout
                </Dropdown.Item>
                
              )}
              <Dropdown.Item href="/cart">Cart</Dropdown.Item>
              <Dropdown.Item href="/usersdashboard">User Dashboard</Dropdown.Item>
              <Dropdown.Item href="/productsdashboard">Product Dashboard</Dropdown.Item>
              <Dropdown.Item href="/products/create">Add Product</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Start>
        <Navbar.Center>
          <Button color="ghost" className="normal-case text-xl">
            myBook
          </Button>
        </Navbar.Center>
        <Navbar.End className="navbar-end">
          {showLogoutMessage && <div>Logout successful</div>}
        </Navbar.End>
      </Navbar>
    </div>
  );
}


