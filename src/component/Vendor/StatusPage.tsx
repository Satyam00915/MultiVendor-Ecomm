import { IUser } from "@/models/User";
import VendorDashboard from "./VendorDashboard";
import { AiOutlineClockCircle, AiOutlineCloseCircle } from "react-icons/ai";

function StatusPage({ user }: { user: IUser }) {
  if (!user) {
    return <div className="w-full min-h-screen">Loading...</div>;
  }

  if (user?.vendor?.verificationStatus === "Approved") {
    return <VendorDashboard />;
  }

  if (user?.vendor?.verificationStatus === "Pending") {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans overflow-hidden px-4">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center z-10">
          {/* Status Indicator Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 animate-pulse">
            <AiOutlineClockCircle size={32} className="text-amber-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
            Verification Pending
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light max-w-xs">
            You can access the vendor dashboard only after{" "}
            <span className="text-indigo-400 font-semibold">
              Admin Permission
            </span>
            .
          </p>

          {/* Details wrapper */}
          <div className="w-full bg-slate-950/40 border border-slate-900 rounded-2xl p-4 mb-4 flex items-center justify-between text-sm">
            <span className="text-slate-400 font-medium">
              Verification Status:
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
              {user?.vendor?.verificationStatus}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-light">
            It usually takes 2-3 hours.
          </div>
        </div>
      </div>
    );
  }

  if (user?.vendor?.verificationStatus === "Rejected") {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-slate-100 font-sans overflow-hidden px-4">
        {/* Decorative background glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center text-center z-10">
          {/* Status Indicator Icon */}
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
            <AiOutlineCloseCircle size={32} className="text-rose-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-3">
            Application Rejected
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light max-w-xs">
            Your request to activate your vendor account has been rejected by the administrator.
          </p>

          {/* Rejection Reason card if present */}
          {user?.vendor?.rejectedReason && (
            <div className="w-full bg-rose-950/10 border border-rose-950/20 rounded-2xl p-5 mb-6 text-left space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-rose-400">
                Reason for Rejection
              </span>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{user?.vendor?.rejectedReason}"
              </p>
            </div>
          )}

          <div className="text-xs text-slate-500 font-light max-w-[280px]">
            If you believe this is a mistake, please contact our support team at{" "}
            <span className="text-indigo-400 font-medium">admin@multikart.com</span>.
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
}

export default StatusPage;
