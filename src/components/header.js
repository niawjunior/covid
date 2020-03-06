import React, { useState } from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [navOpen, setNavOpen] = useState(false)

  const clickNav = () => {
    setNavOpen(prev => !prev)
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link className="text-xl text-red-400 hover:text-red-600" to="/">
          {siteTitle}
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={clickNav}
          className="flex items-center px-3 py-2 border rounded text-white hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          navOpen
            ? "w-full block flex-grow lg:flex lg:items-center lg:w-auto"
            : "lg:block md:hidden sm:hidden block w-full hidden flex-grow lg:flex lg:items-center lg:w-auto"
        }
      >
        <div className="text-sm lg:flex-grow">
          <Link
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-400 mr-4"
            to="/about"
          >
            เกี่ยวกับ
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
