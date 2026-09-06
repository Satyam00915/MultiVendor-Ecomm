"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/Product";
import { AiOutlineClose } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import UseGetAllProductData from "@/hooks/UseGetAllProductData";

function VendorProducts() {
  const router = useRouter();
  UseGetAllProductData();
  const { userData } = useSelector((state: RootState) => state.user);
  const { AllProductData } = useSelector((state: RootState) => state.vendor);

  const myProducts =
    userData?._id && AllProductData && AllProductData.length > 0
      ? AllProductData.filter((p: IProduct) => p.vendor?._id === userData?._id)
      : [];

  console.log(myProducts);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();
  const [loading, setLoading] = useState(false);
  return (
    <div className="w-full max-w-full text-white font-sans overflow-x-hidden">
      {/* Header  */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-900 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          My Products
        </h1>

        <motion.button
          onClick={() => router.push("/addVendorProduct")}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 cursor-pointer flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          + Add Product
        </motion.button>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block overflow-hidden bg-slate-900/10 backdrop-blur-md rounded-2xl border border-slate-900 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-950/80 border-b border-slate-900">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Image
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Title
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                Active
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-900/60">
            {myProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500 text-sm font-medium"
                >
                  No vendor products found
                </td>
              </tr>
            ) : (
              myProducts.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                        {product?.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product?.title || "Product"}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-slate-500">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-sm font-semibold text-slate-100 max-w-[200px] truncate">
                      <div>
                        <p className="truncate">{product?.title || "-"}</p>
                        <p className="text-xs text-slate-400 font-normal mt-0.5">
                          {product?.category || "-"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-sm font-mono font-semibold text-emerald-400">
                      ₹{product?.price ?? "-"}
                    </td>
                    <td className="px-6 py-4.5 text-sm text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          product?.verificationStatus === "Approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : product?.verificationStatus === "Rejected"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {product?.verificationStatus || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-sm text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                          product?.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {product?.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          disabled={product.verificationStatus !== "Approved"}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-md transition-all duration-300 ${
                            product.verificationStatus === "Approved"
                              ? product?.isActive
                                ? "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer"
                                : "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                              : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                          }`}
                        >
                          {product?.isActive ? "Disable" : "Enable"}
                        </motion.button>
                      </div>

                      {product.verificationStatus === "Rejected" && (
                        <div className="mt-2.5 text-left bg-rose-950/20 border border-rose-950/40 p-2.5 rounded-xl text-xs space-y-1 max-w-[260px] mx-auto">
                          <p className="font-bold text-rose-400">
                            Rejection Reason:
                          </p>
                          <p className="text-slate-300 italic">
                            {product.rejectedReason || "No reason provided"}
                          </p>
                          <p className="text-[10px] text-amber-400 font-medium">
                            After edit, product will be sent for reverification.
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Layout  */}
      <div className="md:hidden flex flex-col gap-4 w-full max-w-full">
        {myProducts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm border border-slate-900 bg-slate-900/10 rounded-2xl">
            No vendor products found
          </div>
        ) : (
          myProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full max-w-full bg-slate-900/20 border border-slate-900 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg hover:border-slate-800 transition-colors duration-200 overflow-hidden box-border"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {product?.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product?.title || "Product"}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-500">
                        No Image
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base font-semibold text-slate-100 truncate">
                        {product?.title || "-"}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                          product?.verificationStatus === "Approved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : product?.verificationStatus === "Rejected"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {product?.verificationStatus || "Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {product?.category || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-350 pt-2 border-t border-slate-900/60">
                  <p>
                    <b className="text-slate-450 font-medium mr-1">Price:</b>{" "}
                    <span className="text-emerald-400 font-mono font-semibold">
                      ₹{product?.price ?? "-"}
                    </span>
                  </p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      product?.isActive
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {product?.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {product.verificationStatus === "Rejected" && (
                  <div className="bg-rose-950/20 border border-rose-950/40 p-3 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-rose-400">Rejection Reason:</p>
                    <p className="text-slate-300 italic">
                      {product.rejectedReason || "No reason provided"}
                    </p>
                    <p className="text-[10px] text-amber-400 font-medium">
                      After edit, product will be sent for reverification.
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-900/60 flex items-center justify-end gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer text-center"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg shadow-md transition-all duration-300 text-center ${
                      product.verificationStatus === "Approved"
                        ? product?.isActive
                          ? "bg-amber-600 hover:bg-amber-500 text-white cursor-pointer"
                          : "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                        : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                    }`}
                  >
                    {product?.isActive ? "Disable" : "Enable"}
                  </motion.button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col z-10 overflow-hidden"
            >
              {/* Close Icon Trigger */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-950/50"
              >
                <AiOutlineClose size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-left mb-6 border-b border-slate-950 pb-4">
                Vendor Details
              </h3>

              <div className="space-y-4 text-sm text-slate-350">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Name</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.title}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.description}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Shop Name</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.price || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-start py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium pt-0.5">
                    Shop Address
                  </span>
                  <span className="text-slate-100 font-semibold text-right max-w-[65%]">
                    {selectedProduct.stock || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="text-slate-100 font-semibold font-mono">
                    {selectedProduct.price || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400 font-medium">GSTIN</span>
                  <span className="text-slate-100 font-semibold uppercase font-mono text-xs px-2.5 py-1 rounded bg-slate-950/60 border border-slate-950/80">
                    {selectedProduct.verificationStatus || "-"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  disabled={loading}
                  // onClick={handleApproved}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  {loading ? <ClipLoader size={20} /> : "Approve"}
                </button>
                <button
                  disabled={loading}
                  // onClick={openRejectReasonArea}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Reject
                </button>
                <button
                  disabled={loading}
                  // onClick={() => setSelectedVendor(null)}
                  className="py-3 px-5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {rejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col z-10 overflow-hidden"
            >
              <button
                onClick={() => setRejectModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-950/50"
              >
                <AiOutlineClose size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-left mb-6 border-b border-slate-950 pb-4">
                Rejected Reason
              </h3>

              <textarea
                placeholder="Enter reason for rejection..."
                onChange={(e) => setRejectedReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300 resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRejected}
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Confirm Reject
                </button>
                <button
                  disabled={loading}
                  onClick={() => setRejectModal(false)}
                  className="py-3 px-5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}

export default VendorProducts;
