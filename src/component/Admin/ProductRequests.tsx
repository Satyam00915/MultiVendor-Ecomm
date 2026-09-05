"use client";
import UseGetAllProductData from "@/hooks/UseGetAllProductData";
import { IProduct } from "@/models/Product";
import { RootState } from "@/redux/store";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

function ProductRequests() {
  const dispatch = useDispatch();
  UseGetAllProductData();
  const { AllProductData } = useSelector((state: RootState) => state.vendor);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const pendingProducts = Array.isArray(AllProductData)
    ? AllProductData.filter((p) => p.verificationStatus === "Pending")
    : [];

  const openRejectReasonArea = () => {
    setRejectModal(true);
    setRejectedReason("");
  };

  return (
    <div className="w-full p-6 sm:p-10 min-h-screen text-white">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent text-left mb-8 border-b border-slate-900 pb-4">
        Product Approval Requests
      </h1>

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
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-900/60">
            {pendingProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-slate-500 text-sm font-medium"
                >
                  No vendor approval requests found
                </td>
              </tr>
            ) : (
              pendingProducts.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4.5 text-sm font-semibold text-slate-100">
                      <Image
                        src={product?.images[0]}
                        alt="Product Image"
                        width={250}
                        height={250}
                      />
                    </td>
                    <td className="px-6 py-4.5 text-sm text-slate-350">
                      {product?.title || "-"}
                    </td>
                    <td className="px-6 py-4.5 text-sm text-slate-400 font-mono">
                      {product?.price || "-"}
                    </td>
                    <td className="px-6 py-4.5 text-sm">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        {product?.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-sm text-center">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 cursor-pointer"
                      >
                        Check Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Layout  */}
      <div className="md:hidden flex flex-col gap-4">
        {pendingProducts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm border border-slate-900 bg-slate-900/10 rounded-2xl">
            No Product approval Requests
          </div>
        ) : (
          pendingProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-800 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-base font-semibold text-slate-100">
                    <Image
                      src={product?.images[0]}
                      alt="Product Image"
                      width={250}
                      height={250}
                    />
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                    {product?.title}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-slate-350">
                  <p>
                    <b className="text-slate-450 font-medium mr-1">Shop:</b>{" "}
                    {product?.price}
                  </p>
                  <p>
                    <b className="text-slate-450 font-medium mr-1">Phone:</b>{" "}
                    <span className="font-mono text-xs text-slate-400">
                      {product?.verificationStatus}
                    </span>
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-900/60 flex justify-end">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Check Details
                  </button>
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
                    {selectedProduct.images[0]}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.title}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Shop Name</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.description || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-start py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium pt-0.5">
                    Shop Address
                  </span>
                  <span className="text-slate-100 font-semibold text-right max-w-[65%]">
                    {selectedProduct.verificationStatus || "-"}
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
                    {selectedProduct.isActive || "-"}
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
                  onClick={openRejectReasonArea}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Reject
                </button>
                <button
                  disabled={loading}
                  onClick={() => setSelectedProduct(null)}
                  className="py-3 px-5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
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
              {/* Close Icon Trigger */}
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
                  // onClick={handleRejected}
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
      </AnimatePresence>
    </div>
  );
}

export default ProductRequests;
