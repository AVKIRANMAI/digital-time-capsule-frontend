import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Unlock,
  Share2,
  Trash2,
  X
} from "lucide-react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");

  // ================= FETCH CAPSULES =================
  useEffect(() => {
    fetchCapsules();
  }, []);

  const fetchCapsules = async () => {
    try {
      const response = await API.get("/capsules");
      setCapsules(response.data);
      checkReminders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= REMINDER BANNER =================
  const checkReminders = (capsulesData) => {
    const today = new Date();
    const upcoming = [];

    capsulesData.forEach((capsule) => {
      const unlockDate = new Date(capsule.unlock_date);
      const diffDays =
        (unlockDate - today) / (1000 * 60 * 60 * 24);

      if (diffDays <= 3 && diffDays > 0) {
        upcoming.push({
          id: capsule.id,
          title: capsule.title,
          days: Math.ceil(diffDays),
        });
      }
    });

    setReminders(upcoming);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this capsule?"))
      return;

    try {
      await API.delete(`/capsules/${id}`);
      setCapsules((prev) =>
        prev.filter((c) => c.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ================= SHARE =================
  const openShareModal = (token) => {
    const link = `${window.location.origin}/shared/${token}`;
    setShareLink(link);
    setShareModal(true);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="px-10 py-10">

        {/* Reminder Banner */}
        {reminders.length > 0 && (
          <div className="mb-6 bg-yellow-500/10 border border-yellow-400/30 text-yellow-400 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">
              ⏰ Upcoming Unlocks
            </h3>
            {reminders.map((r) => (
              <p key={r.id} className="text-sm">
                "{r.title}" unlocks in {r.days} day(s)
              </p>
            ))}
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">
          Your Capsules
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : capsules.length === 0 ? (
          <p>No capsules yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {capsules.map((capsule) => {
              const isLocked =
                new Date(capsule.unlock_date) >
                new Date();

              return (
                <div
                  key={capsule.id}
                  className="rounded-2xl overflow-hidden border border-white/10 hover:border-yellow-400/40 transition"
                >

                  {/* ================= IMAGE ================= */}
                 {capsule.media?.[0]?.file_url && (
                   <div className="h-40 overflow-hidden">
                    <img
                     src={capsule.media[0].file_url}
                     alt="Capsule"
                     className={`w-full h-full object-cover transition ${
                      isLocked ? "blur-md scale-110" : ""
                      }`}
                      />
                      </div>
                    )}

                  {/* ================= CONTENT ================= */}
                  <div className="p-6 bg-[#141414]">

                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-bold">
                        {capsule.title}
                      </h3>

                      <span
                        className={`px-3 py-1 text-xs rounded-full flex items-center gap-1 ${
                          isLocked
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {isLocked ? (
                          <>
                            <Lock size={12} /> Locked
                          </>
                        ) : (
                          <>
                            <Unlock size={12} /> Unlocked
                          </>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-3">
                      {isLocked
                        ? "This capsule is locked."
                        : capsule.message}
                    </p>

                    <p className="text-xs text-gray-500 mb-4">
                      {isLocked
                        ? "Unlocks "
                        : "Unlocked "}
                      {formatDate(
                        capsule.unlock_date
                      )}
                    </p>

                    {/* ================= BUTTONS ================= */}
                    <div className="flex justify-between items-center mt-4">

                      {/* View Button */}
                      <button
                        onClick={() =>
                          navigate(`/capsule/${capsule.id}`)
                        }
                        className="px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/5 transition"
                      >
                        View Capsule
                      </button>

                      {/* Icon Buttons */}
                      <div className="flex gap-3">

                        {/* Share */}
                        <button
                          onClick={() =>
                            openShareModal(
                              capsule.share_token ||
                                capsule.id
                            )
                          }
                          className="w-10 h-10 rounded-full border border-yellow-400/30 flex items-center justify-center text-yellow-400 hover:bg-yellow-400/10 transition"
                        >
                          <Share2 size={16} />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDelete(capsule.id)
                          }
                          className="w-10 h-10 rounded-full border border-red-400/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>

      {/* ================= SHARE MODAL ================= */}
      {shareModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#141414] p-6 rounded-xl w-[400px] border border-white/10">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">
                Share Capsule
              </h3>
              <X
                className="cursor-pointer"
                onClick={() =>
                  setShareModal(false)
                }
              />
            </div>

            <input
              value={shareLink}
              readOnly
              className="w-full bg-black border border-white/10 px-3 py-2 rounded-md mb-4"
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;