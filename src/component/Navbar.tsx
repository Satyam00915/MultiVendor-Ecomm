"use client";
import { IUser } from "@/models/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/assets/favicon.jpg";
import React, { useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import { GoListOrdered } from "react-icons/go";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IconType } from "react-icons";

function Navbar({ user }: { user: IUser }) {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Categories", path: "/category" },
    { label: "Shop", path: "/shop" },
    { label: "Orders", path: "/orders" },
  ];
  const [openMenu, setOpenMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full text-white z-50 bg-slate-950/60 backdrop-blur-md border-b border-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-3 cursor-pointer select-none hover:opacity-90 transition-opacity"
          >
            <Image
              src={logo}
              width={38}
              height={38}
              alt="Logo"
              className="rounded-full border border-slate-850 object-cover shadow-md"
            />
            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white to-slate-350 bg-clip-text text-transparent hidden sm:inline">
              MultiCart
            </span>
          </div>

          {user.role === "user" && (
            <div className="hidden md:flex gap-1.5">
              {navItems.map((item) => (
                <NavItem
                  key={item.label}
                  label={item.label}
                  path={item.path}
                  router={router}
                />
              ))}
            </div>
          )}

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4">
            {user.role === "user" && (
              <IconButton
                Icon={AiOutlineSearch}
                onClick={() => router.push("/category")}
              />
            )}
            <IconButton
              Icon={AiOutlinePhone}
              onClick={() => router.push("/support")}
            />

            <div className="relative">
              {user?.image ? (
                <Image
                  alt="Profile"
                  className="rounded-full border border-slate-800 cursor-pointer hover:border-indigo-500/80 transition-colors object-cover"
                  width={34}
                  height={34}
                  src={user?.image}
                  onClick={() => setOpenMenu((c) => !c)}
                />
              ) : (
                <IconButton
                  Icon={AiOutlineUser}
                  onClick={() => setOpenMenu((c) => !c)}
                />
              )}

              {openMenu && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800/80 bg-slate-950/90 py-1.5 z-50 overflow-hidden"
                  >
                    <DropDownBtn
                      Icon={AiOutlineUser}
                      label="Profile"
                      onClick={() => router.push("/profile")}
                      close={() => setOpenMenu(false)}
                    />
                    <DropDownBtn
                      Icon={AiOutlineLogout}
                      label="Sign Out"
                      onClick={() => signOut()}
                      close={() => setOpenMenu(false)}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <CartBtn router={router} count={"0"} />
          </div>

          {/* MobileIcons */}
          <div className="md:hidden flex items-center gap-4">
            {user?.role === "vendor" || user?.role === "admin" ? (
              <>
                <IconButton
                  Icon={AiOutlinePhone}
                  onClick={() => router.push("/support")}
                />
                <div className="relative">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      width={34}
                      height={34}
                      alt="Profile"
                      className="rounded-full border border-slate-800 cursor-pointer hover:border-indigo-500/80 transition-colors object-cover"
                      onClick={() => setOpenMenu((c) => !c)}
                    />
                  ) : (
                    <IconButton
                      Icon={AiOutlineUser}
                      onClick={() => setOpenMenu((c) => !c)}
                    />
                  )}

                  {openMenu && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-48 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800/80 bg-slate-950/90 py-1.5 z-50 overflow-hidden"
                      >
                        <DropDownBtn
                          Icon={AiOutlineUser}
                          label="Profile"
                          onClick={() => router.push("/profile")}
                          close={() => setOpenMenu(false)}
                        />
                        <DropDownBtn
                          Icon={AiOutlineLogout}
                          label="Sign Out"
                          onClick={() => signOut()}
                          close={() => setOpenMenu(false)}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </>
            ) : (
              <>
                <IconButton
                  Icon={AiOutlineSearch}
                  onClick={() => router.push("/category")}
                />

                <IconButton
                  Icon={AiOutlinePhone}
                  onClick={() => router.push("/support")}
                />

                <CartBtn router={router} count="5" />
                <AiOutlineMenu
                  size={28}
                  className="cursor-pointer"
                  onClick={() => setSidebarOpen(true)}
                />

                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ x: "100vw" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100vw" }}
                      transition={{ type: "spring", stiffness: 35 }}
                      className="fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] bg-slate-950/85 border-l border-slate-900 backdrop-blur-xl p-6 text-slate-100 shadow-2xl flex flex-col z-50"
                    >
                      <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-4">
                        <h1 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
                          Menu
                        </h1>
                        <AiOutlineClose
                          className="text-slate-400 hover:text-white cursor-pointer hover:bg-slate-900/40 p-1.5 rounded-lg transition-all duration-200"
                          onClick={() => setSidebarOpen(false)}
                          size={32}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <SideBarBtn
                          label="Home"
                          Icon={AiOutlineHome}
                          path={"/"}
                          router={router}
                          setSidebarOpen={setSidebarOpen}
                        />
                        <SideBarBtn
                          label="Category"
                          Icon={AiOutlineAppstore}
                          path={"/category"}
                          router={router}
                          setSidebarOpen={setSidebarOpen}
                        />
                        <SideBarBtn
                          label="Profile"
                          Icon={AiOutlineUser}
                          path={"/profile"}
                          router={router}
                          setSidebarOpen={setSidebarOpen}
                        />
                        <SideBarBtn
                          label="Shop"
                          Icon={AiOutlineShop}
                          path={"/shop"}
                          router={router}
                          setSidebarOpen={setSidebarOpen}
                        />
                        <SideBarBtn
                          label="Orders"
                          Icon={GoListOrdered}
                          path={"/orders"}
                          router={router}
                          setSidebarOpen={setSidebarOpen}
                        />
                        <button
                          className="flex items-center gap-5 w-full px-4 py-3.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 cursor-pointer text-base font-semibold border border-transparent hover:border-red-500/20 mt-4 group"
                          onClick={() => {
                            signOut();
                            setSidebarOpen(false);
                          }}
                        >
                          <AiOutlineLogout
                            size={20}
                            className="text-slate-400 group-hover:text-red-400 transition-colors"
                          />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Components
const NavItem = ({
  label,
  path,
  router,
}: {
  label: string;
  path: string;
  router: AppRouterInstance;
}) => {
  return (
    <button
      onClick={() => router.push(path)}
      className="text-slate-300 hover:text-white hover:bg-slate-900/40 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
    >
      {label}
    </button>
  );
};

const IconButton = ({
  Icon,
  onClick,
}: {
  Icon: IconType;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <button
      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/50 transition-all duration-200 cursor-pointer flex items-center justify-center"
      onClick={onClick}
    >
      <Icon size={20} />
    </button>
  );
};

const DropDownBtn = ({
  Icon,
  label,
  onClick,
  close,
}: {
  Icon: IconType;
  label: string;
  onClick: () => void;
  close: () => void;
}) => {
  return (
    <button
      onClick={() => {
        onClick();
        close();
      }}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-350 hover:text-white hover:bg-slate-900/50 transition-colors duration-200 cursor-pointer font-medium"
    >
      <Icon size={16} className="text-slate-400" />
      {label}
    </button>
  );
};

const CartBtn = ({
  router,
  count,
}: {
  router: AppRouterInstance;
  count: string;
}) => {
  return (
    <button
      className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/50 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
      onClick={() => router.push("/cart")}
    >
      <AiOutlineShoppingCart size={20} />
      <span className="text-xs bg-indigo-650 hover:bg-indigo-600 text-white rounded-full px-2 py-0.5 font-bold shadow-md">
        {count}
      </span>
    </button>
  );
};

const SideBarBtn = ({
  label,
  path,
  router,
  Icon,
  setSidebarOpen,
}: {
  label: string;
  path: string;
  router: AppRouterInstance;
  Icon: IconType;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="flex items-center gap-5 w-full px-4 py-3.5 text-slate-350 hover:text-white hover:bg-slate-900/40 rounded-xl transition-all duration-200 cursor-pointer text-base font-semibold group"
      onClick={() => {
        router.push(path);
        setSidebarOpen(false);
      }}
    >
      <Icon
        size={20}
        className="text-slate-400 group-hover:text-white transition-colors"
      />
      {label}
    </button>
  );
};

export default Navbar;
