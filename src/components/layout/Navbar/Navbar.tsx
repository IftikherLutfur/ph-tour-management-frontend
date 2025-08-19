import { Button } from "../../ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover"
import logo from "../../../assets/images/Background - 2025-08-07T175433.066.png"
import { Link } from "react-router"
import { authAPi, useLogoutMutation, useUserInfoQuery } from "../../../redux/features/auth/auth-api"
import { useDispatch } from "react-redux"
import { role } from "../../../constants/role"


// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC"},
  { href: "/admin", label: "Dashboard", role: role.admin},
  { href: "/user", label: "Dashboard", role: role.user},
]

export default function Component() {


  const {data} = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const handleForLogout = () =>{
    logout(undefined)
    dispatch(authAPi.util.resetApiState())
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink>
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <img className="h-12" src={logo} alt="" />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) =>
  link.role === "PUBLIC" && (
    <NavigationMenuItem key={index}>
      <NavigationMenuLink asChild>
        <Link to={link.href}>{link.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
)}
                {navigationLinks.map((link, index) =>
  link.role === data?.data?.role && (
    <NavigationMenuItem key={index}>
      <NavigationMenuLink asChild>
        <Link to={link.href}>{link.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
)}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}

     <div className="flex items-center gap-2">
      {data?.data?.email &&
       <Button 
       onClick={handleForLogout}
       variant="outline" size="sm" className="text-sm">
            Logout
          </Button>
      }
          {!data?.data?.email && <div>
            <Link to={"/login"}><Button variant="ghost" size="sm" className="text-sm">
            Sign In
          </Button></Link>
          <Link to={"/register"}><Button size="sm" className="text-sm">
            Register
          </Button></Link></div>}
          
        </div>
      </div>
    </header>
  )
}