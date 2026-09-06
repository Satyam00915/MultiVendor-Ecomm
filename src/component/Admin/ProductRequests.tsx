"use client";
import UseGetAllProductData from "@/hooks/UseGetAllProductData";
import { IProduct } from "@/models/Product";
import { RootState } from "@/redux/store";
import { updateProductStatus } from "@/redux/vendorSlice";
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

  const handleApproved = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/updateProductStatus", {
        approvalStatus: "Approved",
        productId: selectedProduct?._id,
      });
      if (!res.data.success) {
        toast.error(res.data.message);
        setLoading(false);
        setSelectedProduct(null);
        return;
      }

      dispatch(
        updateProductStatus({
          productId: selectedProduct?._id,
          approvalStatus: "Approved",
        }),
      );
      toast.success(res.data.message);
      setLoading(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSelectedProduct(null);
    }
  };

  const handleRejected = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/updateProductStatus", {
        approvalStatus: "Rejected",
        productId: selectedProduct?._id,
        rejectedReason,
      });
      if (!res.data.success) {
        toast.error(res.data.message);
        setLoading(false);
        setSelectedProduct(null);
        return;
      }

      dispatch(
        updateProductStatus({
          productId: selectedProduct?._id,
          approvalStatus: "Rejected",
        }),
      );
      toast.success(res.data.message);
      setRejectModal(false);
      setLoading(false);
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setRejectModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="w-full max-w-full text-white font-sans">
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
                Category
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Stock
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400 text-center">
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
                  colSpan={7}
                  className="px-6 py-12 text-center text-slate-500 text-sm font-medium"
                >
                  No product approval requests found
                </td>
              </tr>
            ) : (
              pendingProducts.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm font-semibold text-slate-100 max-w-[200px] truncate">
                      {product?.title || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-emerald-400">
                      ₹{product?.price ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-350">
                      {product?.category || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">
                      {product?.stock ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        {product?.verificationStatus || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
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

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-4">
        {pendingProducts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm border border-slate-900 bg-slate-900/10 rounded-2xl">
            No product approval requests found
          </div>
        ) : (
          pendingProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-slate-900/20 border border-slate-900 rounded-2xl p-5 space-y-4 shadow-lg hover:border-slate-800 transition-colors duration-200"
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
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider shrink-0">
                        {product?.verificationStatus || "Pending"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {product?.category || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-slate-350 pt-2 border-t border-slate-900/60">
                  <p>
                    <b className="text-slate-450 font-medium mr-1">Price:</b>{" "}
                    <span className="text-emerald-400 font-mono font-semibold">
                      ₹{product?.price ?? "-"}
                    </span>
                  </p>
                  <p>
                    <b className="text-slate-450 font-medium mr-1">Stock:</b>{" "}
                    <span className="font-mono text-slate-300">
                      {product?.stock ?? "-"}
                    </span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900/60 flex justify-end">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-md transition-all duration-300 cursor-pointer text-center"
                  >
                    Check Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col z-10 my-auto scrollbar-thin scrollbar-thumb-slate-800"
            >
              {/* Close Icon Trigger */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-950/50"
              >
                <AiOutlineClose size={20} />
              </button>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-left mb-6 border-b border-slate-950 pb-4">
                Product Details
              </h3>

              {/* Product Images Gallery */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2.5 mb-6">
                  {selectedProduct.images.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-slate-950 border border-slate-800 relative group"
                    >
                      <Image
                        src={img}
                        alt={`Product ${i + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Product Details List */}
              <div className="space-y-3.5 text-sm text-slate-350">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Title</span>
                  <span className="text-slate-100 font-semibold max-w-[65%] text-right">
                    {selectedProduct.title}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Price</span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    ₹{selectedProduct.price}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Category</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.category}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Stock</span>
                  <span className="text-slate-100 font-mono font-semibold">
                    {selectedProduct.stock} units
                  </span>
                </div>

                <div className="flex justify-between items-start py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium pt-0.5">
                    Description
                  </span>
                  <span className="text-slate-350 text-right max-w-[65%] text-xs leading-relaxed">
                    {selectedProduct.description || "-"}
                  </span>
                </div>

                {selectedProduct.isWearable && (
                  <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                    <span className="text-slate-400 font-medium">Sizes</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedProduct.sizes &&
                      selectedProduct.sizes.length > 0 ? (
                        selectedProduct.sizes.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-950/60 border border-slate-800 text-xs font-bold text-slate-200"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">
                    Replacement Policy
                  </span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.replacementDays
                      ? `${selectedProduct.replacementDays} Days`
                      : "No Replacement"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Warranty</span>
                  <span className="text-slate-100 font-semibold">
                    {selectedProduct.warranty || "No warranty"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-slate-950/60">
                  <span className="text-slate-400 font-medium">Logistics</span>
                  <div className="flex gap-2 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-md border ${
                        selectedProduct.freeDelivery
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-950/60 text-slate-500 border-slate-900"
                      }`}
                    >
                      {selectedProduct.freeDelivery
                        ? "Free Delivery"
                        : "Standard Delivery"}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md border ${
                        selectedProduct.payOnDelivery
                          ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          : "bg-slate-950/60 text-slate-500 border-slate-900"
                      }`}
                    >
                      {selectedProduct.payOnDelivery
                        ? "COD Available"
                        : "Prepaid Only"}
                    </span>
                  </div>
                </div>

                {/* Detail Points */}
                {selectedProduct.detailPoints &&
                  selectedProduct.detailPoints.length > 0 && (
                    <div className="py-2">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Key Highlights
                      </span>
                      <ul className="space-y-1.5 bg-slate-950/40 p-3.5 rounded-xl border border-slate-950">
                        {selectedProduct.detailPoints.map((pt, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-300 flex items-start gap-2"
                          >
                            <span className="text-indigo-400 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  disabled={loading}
                  onClick={handleApproved}
                  className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? <ClipLoader size={20} /> : "Approve"}
                </button>
                <button
                  disabled={loading}
                  onClick={openRejectReasonArea}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  disabled={loading}
                  onClick={() => setSelectedProduct(null)}
                  className="py-3 px-5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Reason Modal */}
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
                Rejection Reason
              </h3>

              <textarea
                placeholder="Enter reason for rejection..."
                value={rejectedReason}
                onChange={(e) => setRejectedReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-950/40 border border-slate-900 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all duration-300 resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={handleRejected}
                  disabled={loading}
                  className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold rounded-xl shadow-lg shadow-rose-600/10 transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? <ClipLoader size={20} /> : "Confirm Reject"}
                </button>
                <button
                  disabled={loading}
                  onClick={() => setRejectModal(false)}
                  className="py-3 px-5 bg-slate-950/60 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-400 font-semibold rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
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
