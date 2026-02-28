import { Lock, Unlock, Trash2, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CapsuleCard({ capsule, refresh }) {
  const navigate = useNavigate();

  const isLocked =
    capsule.is_locked ||
    new Date(capsule.unlock_date) > new Date();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleDelete = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    await API.delete(`/capsules/${capsule.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    refresh();
  };

  const handleToggleLock = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");

    const endpoint = isLocked
      ? `/capsules/unlock/${capsule.id}`
      : `/capsules/lock/${capsule.id}`;

    await API.patch(endpoint, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    refresh();
  };

  const timeLeft =
    new Date(capsule.unlock_date) - new Date();

  return (
    <div
      onClick={() => navigate(`/capsule/${capsule.id}`)}
      className="cursor-pointer rounded-2xl bg-[#141414] border border-white/10 p-6 hover:border-yellow-400/30 transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
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
          {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
          {isLocked ? "Locked" : "Unlocked"}
        </span>
      </div>

      {/* Message Preview */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
        {isLocked
          ? "🔒 This capsule is locked"
          : capsule.message}
      </p>

      {/* Unlock Date */}
      <p className="text-xs text-gray-500 mb-4">
        {isLocked ? "Unlocks" : "Unlocked"}{" "}
        {formatDate(capsule.unlock_date)}
      </p>

      {/* Countdown */}
      {isLocked && (
        <p className="text-xs text-yellow-400 mb-4">
          Unlocks in{" "}
          {Math.max(
            0,
            Math.floor(timeLeft / (1000 * 60 * 60 * 24))
          )}{" "}
          days
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-4 text-xs">

        <button
          onClick={handleToggleLock}
          className="text-yellow-400"
        >
          {isLocked ? "Unlock" : "Lock"}
        </button>

        <button
          onClick={handleDelete}
          className="text-red-400 flex items-center gap-1"
        >
          <Trash2 size={14} />
          Delete
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            alert("Share feature coming soon 🔥");
          }}
          className="text-blue-400 flex items-center gap-1"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>
    </div>
  );
}

export default CapsuleCard;