"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

function AddVendorProduct() {
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    stock: 0,
    price: 0,
    category: "",
    customCategory: "",
    replacementDays: "",
    warranty: "",
    isWearable: false,
    sizes: [] as string[],
    freeDelivery: false,
    payOnDelivery: false,
    images: [] as File[],
    detailPoints: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const [currentPoint, setCurrentPoint] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [previewImage1, setPreviewImage1] = useState<File | null>(null);
  const [previewImage2, setPreviewImage2] = useState<File | null>(null);
  const [previewImage3, setPreviewImage3] = useState<File | null>(null);
  const [previewImage4, setPreviewImage4] = useState<File | null>(null);
  const categories = [
    "Fashion & LifeStyle",
    "Electronics & Gadjets",
    "Home & Living",
    "Beauty & Care",
    "Sports & Fitness",
    "Books & Stationery",
    "Toys & Hobbies",
    "Automotive & Tools",
    "Food & Groceries",
    "Jewelry & Watches",
    "Others",
  ];
  const router = useRouter();
  const ToggleSize = (size: string) => {
    setProductDetails((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };
  const handleRemove = (idx: number) => {
    setProductDetails((p) => ({
      ...p,
      detailPoints: p.detailPoints.filter((_, index) => index !== idx),
    }));
    setCurrentIndex((i) => i - 1);
  };
  const handleAddPoint = () => {
    if (!currentPoint.trim()) return;
    setProductDetails((p) => ({
      ...p,
      detailPoints: [...p.detailPoints, currentPoint],
    }));
    setCurrentPoint("");
    setCurrentIndex((c) => c + 1);
  };
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProductDetails((p) => ({ ...p, [name]: checked }));
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setProductDetails((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productDetails.images.length < 4) {
      toast.error("4 Images are required");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    Object.entries(productDetails).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((image) => formData.append(key, image));
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item.toString()));
      } else if (key === "category") {
        formData.append(
          key,
          value === "Others" ? productDetails.customCategory : value.toString(),
        );
      } else {
        formData.append(key, value.toString());
      }
    });
    formData.delete("customCategory");


    try {
      const res = await axios.post("/api/vendor/addProduct", formData);
      if (!res?.data?.success) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }
      toast.success(res.data.message);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 min-h-screen justify-center items-center py-16 px-4 font-sans overflow-x-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main card wrapper */}
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/85 rounded-3xl p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-slate-800 z-10"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6 border-b border-slate-900 pb-4 w-full text-left">
          Add New Product
        </h1>

        {/* Row 1: Title & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Product Title
            </label>
            <input
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
              placeholder="Enter product title"
              type="text"
              name="title"
              value={productDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Price (INR)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
            />
          </div>
        </div>

        {/* Row 2: Stock & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Stock Quantity
            </label>
            <input
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
              placeholder="Enter stock quantity"
              type="number"
              name="stock"
              value={productDetails.stock}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Category
            </label>
            <select
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm cursor-pointer"
              id="Category"
              name="category"
              onChange={handleChange}
              value={productDetails.category}
            >
              <option value="" className="bg-slate-950">
                Select Category
              </option>
              {categories.map((cat, index) => {
                return (
                  <option value={cat} key={index} className="bg-slate-950">
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Conditional Custom Category */}
        {productDetails.category === "Others" && (
          <div className="w-full mb-5 space-y-2 animate-fadeIn">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Custom Category
            </label>
            <input
              value={productDetails.customCategory}
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
              placeholder="Enter Custom Category"
              name="customCategory"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Product Description */}
        <div className="w-full mb-5 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Product Description
          </label>
          <textarea
            value={productDetails.description}
            placeholder="Enter detailed product description..."
            name="description"
            rows={4}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm resize-none"
          />
        </div>

        {/* Wearable Checkbox block */}
        <label
          htmlFor="isWearable"
          className="flex items-center gap-3.5 mb-5 w-full bg-slate-950/20 border border-slate-900 rounded-xl p-4 cursor-pointer hover:border-slate-800 transition-colors select-none"
        >
          <div className="relative flex items-center">
            <input
              onChange={handleChecked}
              type="checkbox"
              name="isWearable"
              id="isWearable"
              checked={productDetails.isWearable}
              className="peer sr-only"
            />
            {/* Custom Checkbox Box */}
            <div className="w-5 h-5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-violet-600 peer-checked:border-indigo-500/20 transition-all duration-200 shadow-inner">
              <svg
                className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-350">
            This is a Wearable / Clothing Product
          </span>
        </label>

        {/* Sizes layout (conditional) */}
        {productDetails.isWearable && (
          <div className="w-full mb-5 p-4 bg-slate-950/20 border border-slate-900 rounded-xl space-y-3 animate-fadeIn">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Sizes
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {sizeOptions.map((size, index) => {
                const isSelected = productDetails.sizes.includes(size);
                return (
                  <motion.button
                    key={index}
                    type="button"
                    onClick={() => ToggleSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500/20 shadow-md shadow-indigo-600/10"
                        : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-200"
                    }`}
                  >
                    {size}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Replacement & Warranty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Replacement Policy
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
              name="replacementDays"
              onChange={handleChange}
              value={productDetails.replacementDays}
              placeholder="Replacement Days (Eg: 7 Days)"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Warranty Details
            </label>
            <input
              type="text"
              name="warranty"
              value={productDetails.warranty}
              onChange={handleChange}
              placeholder="Warranty (e.g. 1 Year)"
              className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 text-sm"
            />
          </div>
        </div>

        {/* Logistics checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-6">
          <label
            htmlFor="freeDelivery"
            className="flex items-center gap-3.5 bg-slate-950/20 border border-slate-900 rounded-xl p-4 cursor-pointer hover:border-slate-800 transition-colors select-none"
          >
            <div className="relative flex items-center">
              <input
                onChange={handleChecked}
                type="checkbox"
                name="freeDelivery"
                id="freeDelivery"
                checked={productDetails.freeDelivery}
                className="peer sr-only"
              />
              <div className="w-5 h-5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-violet-600 peer-checked:border-indigo-500/20 transition-all duration-200 shadow-inner">
                <svg
                  className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-350">
              Free Delivery
            </span>
          </label>

          <label
            htmlFor="payOnDelivery"
            className="flex items-center gap-3.5 bg-slate-950/20 border border-slate-900 rounded-xl p-4 cursor-pointer hover:border-slate-800 transition-colors select-none"
          >
            <div className="relative flex items-center">
              <input
                onChange={handleChecked}
                type="checkbox"
                name="payOnDelivery"
                id="payOnDelivery"
                checked={productDetails.payOnDelivery}
                className="peer sr-only"
              />
              <div className="w-5 h-5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-violet-600 peer-checked:border-indigo-500/20 transition-all duration-200 shadow-inner">
                <svg
                  className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-350">
              Pay On Delivery (COD)
            </span>
          </label>
        </div>

        {/* Image upload segment */}
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 w-full text-left">
          Upload 4 Images
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 w-full gap-4 mb-6">
          {/* Image slot 1 */}
          <div className="relative group">
            {previewImage1 && (
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 z-20 p-1 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg flex items-center justify-center border border-slate-950"
                onClick={() => {
                  setProductDetails((p) => ({
                    ...p,
                    images: p.images.filter((file) => file !== previewImage1),
                  }));
                  setPreviewImage1(null);
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <input
              type="file"
              hidden
              disabled={!!previewImage1}
              id="img1"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProductDetails((p) => ({
                  ...p,
                  images: [...p.images, file],
                }));
                setPreviewImage1(file);
              }}
            />
            <label
              htmlFor="img1"
              className={`cursor-pointer bg-slate-950/40 hover:bg-slate-950/60 p-2 rounded-2xl h-28 flex flex-col items-center justify-center border transition-all duration-300 ${
                previewImage1
                  ? "border-indigo-500/30 shadow-md shadow-indigo-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {previewImage1 ? (
                <Image
                  src={URL.createObjectURL(previewImage1)}
                  alt="img1"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-xl select-none"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-500 group-hover:text-slate-350 transition-colors gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  <FiUpload
                    size={20}
                    className="text-slate-400 group-hover:text-indigo-400 transition-colors"
                  />
                  <span>Image 1</span>
                </div>
              )}
            </label>
          </div>

          {/* Image slot 2 */}
          <div className="relative group">
            {previewImage2 && (
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 z-20 p-1 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg flex items-center justify-center border border-slate-950"
                onClick={() => {
                  setProductDetails((p) => ({
                    ...p,
                    images: p.images.filter((file) => file !== previewImage2),
                  }));
                  setPreviewImage2(null);
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <input
              type="file"
              hidden
              disabled={!!previewImage2}
              id="img2"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProductDetails((p) => ({
                  ...p,
                  images: [...p.images, file],
                }));
                setPreviewImage2(file);
              }}
            />
            <label
              htmlFor="img2"
              className={`cursor-pointer bg-slate-950/40 hover:bg-slate-950/60 p-2 rounded-2xl h-28 flex flex-col items-center justify-center border transition-all duration-300 ${
                previewImage2
                  ? "border-indigo-500/30 shadow-md shadow-indigo-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {previewImage2 ? (
                <Image
                  src={URL.createObjectURL(previewImage2)}
                  alt="img2"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-xl select-none"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-500 group-hover:text-slate-350 transition-colors gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  <FiUpload
                    size={20}
                    className="text-slate-400 group-hover:text-indigo-400 transition-colors"
                  />
                  <span>Image 2</span>
                </div>
              )}
            </label>
          </div>

          {/* Image slot 3 */}
          <div className="relative group">
            {previewImage3 && (
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 z-20 p-1 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg flex items-center justify-center border border-slate-950"
                onClick={() => {
                  setProductDetails((p) => ({
                    ...p,
                    images: p.images.filter((file) => file !== previewImage3),
                  }));
                  setPreviewImage3(null);
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <input
              type="file"
              hidden
              disabled={!!previewImage3}
              id="img3"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProductDetails((p) => ({
                  ...p,
                  images: [...p.images, file],
                }));
                setPreviewImage3(file);
              }}
            />
            <label
              htmlFor="img3"
              className={`cursor-pointer bg-slate-950/40 hover:bg-slate-950/60 p-2 rounded-2xl h-28 flex flex-col items-center justify-center border transition-all duration-300 ${
                previewImage3
                  ? "border-indigo-500/30 shadow-md shadow-indigo-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {previewImage3 ? (
                <Image
                  src={URL.createObjectURL(previewImage3)}
                  alt="img3"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-xl select-none"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-500 group-hover:text-slate-350 transition-colors gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  <FiUpload
                    size={20}
                    className="text-slate-400 group-hover:text-indigo-400 transition-colors"
                  />
                  <span>Image 3</span>
                </div>
              )}
            </label>
          </div>

          {/* Image slot 4 */}
          <div className="relative group">
            {previewImage4 && (
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 z-20 p-1 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg flex items-center justify-center border border-slate-950"
                onClick={() => {
                  setProductDetails((p) => ({
                    ...p,
                    images: p.images.filter((file) => file !== previewImage4),
                  }));
                  setPreviewImage4(null);
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <input
              type="file"
              hidden
              disabled={!!previewImage4}
              id="img4"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setProductDetails((p) => ({
                  ...p,
                  images: [...p.images, file],
                }));
                setPreviewImage4(file);
              }}
            />
            <label
              htmlFor="img4"
              className={`cursor-pointer bg-slate-950/40 hover:bg-slate-950/60 p-2 rounded-2xl h-28 flex flex-col items-center justify-center border transition-all duration-300 ${
                previewImage4
                  ? "border-indigo-500/30 shadow-md shadow-indigo-500/5"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {previewImage4 ? (
                <Image
                  src={URL.createObjectURL(previewImage4)}
                  alt="img4"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover rounded-xl select-none"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-500 group-hover:text-slate-350 transition-colors gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
                  <FiUpload
                    size={20}
                    className="text-slate-400 group-hover:text-indigo-400 transition-colors"
                  />
                  <span>Image 4</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Detail points layout */}
        <div className="mt-4 w-full mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 w-full text-left">
            Product Detail Points
          </h3>
          <div className="flex gap-3">
            <input
              onChange={(e) => setCurrentPoint(e.target.value)}
              type="text"
              value={currentPoint}
              placeholder={`Enter Point ${currentIndex + 1}...`}
              className="flex-1 px-4 py-3 bg-slate-950/40 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
            />
            <button
              onClick={handleAddPoint}
              type="button"
              className="px-5 bg-indigo-650 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center"
            >
              Add Point
            </button>
          </div>

          {productDetails.detailPoints.length > 0 && (
            <ul className="mt-4 space-y-2.5 w-full">
              {productDetails.detailPoints.map((point, index) => {
                return (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-slate-950/45 border border-slate-900 px-4 py-3.5 rounded-xl text-sm text-slate-300"
                  >
                    <span className="leading-relaxed">
                      <span className="text-indigo-400 font-bold mr-1.5">
                        {index + 1}.
                      </span>{" "}
                      {point}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="text-slate-500 hover:text-rose-450 transition-colors duration-200 cursor-pointer p-1 rounded-lg hover:bg-slate-900/60"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Global Submit trigger */}
        <button
          type="submit"
          className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm tracking-wide rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center"
        >
          {loading ? <ClipLoader size={28} /> : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddVendorProduct;
