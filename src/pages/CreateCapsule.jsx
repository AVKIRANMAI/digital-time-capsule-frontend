// // import { useState, useCallback } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Clock,
// //   ArrowLeft,
// //   Upload,
// //   X,
// //   Sparkles,
// // } from "lucide-react";
// // import API from "../services/api";

// // function CreateCapsule() {
// //   const navigate = useNavigate();

// //   const [isDragActive, setIsDragActive] = useState(false);
// //   const [uploadedFiles, setUploadedFiles] = useState([]);
// //   const [title, setTitle] = useState("");
// //   const [message, setMessage] = useState("");
// //   const [unlockDate, setUnlockDate] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [secretMessage, setSecretMessage] = useState("");

// //   // Drag handlers
// //   const handleDrag = useCallback((e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === "dragenter" || e.type === "dragover") {
// //       setIsDragActive(true);
// //     } else if (e.type === "dragleave") {
// //       setIsDragActive(false);
// //     }
// //   }, []);

// //   const handleDrop = useCallback((e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setIsDragActive(false);
// //     const files = Array.from(e.dataTransfer.files);
// //     setUploadedFiles((prev) => [...prev, ...files]);
// //   }, []);

// //   const removeFile = (index) => {
// //     setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   // 🔥 MAIN SUBMIT FUNCTION
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!title || !message || !unlockDate) {
// //       alert("Please fill all required fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem("token");

// //       // 1️⃣ Create capsule (JSON request)
// //       const response = await API.post(
// //         "/capsules",
// //         {
// //           title,
// //           message,
// //           unlock_date: unlockDate,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const capsuleId = response.data.data.id;

// //       // 2️⃣ Upload media (if any)
// //       if (uploadedFiles.length > 0) {
// //         const formData = new FormData();
// //         formData.append("file", uploadedFiles[0]);
// //         formData.append("capsule_id", capsuleId);

// //         await API.post("/capsules/upload", formData, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });
// //       }

// //       alert("Capsule sealed successfully ✨");
// //       navigate("/dashboard");

// //     } catch (error) {
// //       console.error(error.response?.data || error);
// //       alert("Failed to seal capsule");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0f0f0f] text-white">

// //       {/* Navbar */}
// //       <header className="border-b border-white/10">
// //         <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-12">
// //           <div className="flex items-center gap-4">
// //             <button
// //               onClick={() => navigate("/dashboard")}
// //               className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 hover:border-yellow-400"
// //             >
// //               <ArrowLeft className="h-4 w-4" />
// //             </button>
// //             <div className="flex items-center gap-2">
// //               <Clock className="h-5 w-5 text-yellow-400" />
// //               <span className="font-serif text-lg font-bold">
// //                 TimeCapsule
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main */}
// //       <main className="flex flex-1 items-center justify-center px-4 py-10">
// //         <div className="w-full max-w-2xl rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-xl">

// //           <h1 className="mb-2 text-3xl font-serif font-bold">
// //             Create a Capsule
// //           </h1>
// //           <p className="mb-6 text-sm text-gray-400">
// //             Seal a moment in time ✨
// //           </p>

// //           <form onSubmit={handleSubmit} className="flex flex-col gap-6">

// //             {/* Title */}
// //             <input
// //               type="text"
// //               placeholder="Give your capsule a name"
// //               value={title}
// //               onChange={(e) => setTitle(e.target.value)}
// //               className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm focus:border-yellow-400 focus:outline-none"
// //               required
// //             />

// //             {/* Message */}
// //             <textarea
// //               rows={5}
// //               placeholder="Write a message to your future self..."
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:border-yellow-400 focus:outline-none"
// //               required
// //             />
// //             {/* Secret Message */}
// // <textarea
// //   placeholder="Write a secret message (revealed only after unlock)"
// //   value={secretMessage}
// //   onChange={(e) => setSecretMessage(e.target.value)}
// //   className="bg-black border border-purple-500/30 p-3 rounded-md mt-4"
// // />

// //             {/* Unlock Date */}
// //             <input
// //               type="date"
// //               value={unlockDate}
// //               onChange={(e) => setUnlockDate(e.target.value)}
// //               className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm focus:border-yellow-400 focus:outline-none"
// //               required
// //             />

// //             {/* Drag Upload */}
// //             <div
// //               onDragEnter={handleDrag}
// //               onDragLeave={handleDrag}
// //               onDragOver={handleDrag}
// //               onDrop={handleDrop}
// //               className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-all ${
// //                 isDragActive
// //                   ? "border-yellow-400 bg-yellow-400/10"
// //                   : "border-white/20 hover:border-yellow-400"
// //               }`}
// //             >
// //               <Upload className="h-6 w-6 text-gray-400" />
// //               <p className="text-sm">
// //                 Drag and drop files here or click to browse
// //               </p>
// //               <input
// //                 type="file"
// //                 className="mt-2"
// //                 onChange={(e) =>
// //                   setUploadedFiles(Array.from(e.target.files))
// //                 }
// //               />
// //             </div>

// //             {/* Uploaded Files */}
// //             {uploadedFiles.length > 0 && (
// //               <div className="flex flex-col gap-2">
// //                 {uploadedFiles.map((file, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2"
// //                   >
// //                     <span className="text-xs">{file.name}</span>
// //                     <button
// //                       type="button"
// //                       onClick={() => removeFile(index)}
// //                     >
// //                       <X className="h-4 w-4 text-red-400" />
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 font-semibold text-black transition-all hover:brightness-110 disabled:opacity-50"
// //             >
// //               <Sparkles className="h-4 w-4" />
// //               {loading ? "Sealing..." : "Seal This Capsule"}
// //             </button>

// //           </form>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // export default CreateCapsule;

// import { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Clock,
//   ArrowLeft,
//   Upload,
//   X,
//   Sparkles,
// } from "lucide-react";
// import API from "../services/api";

// function CreateCapsule() {
//   const navigate = useNavigate();

//   const [isDragActive, setIsDragActive] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [unlockDate, setUnlockDate] = useState("");
//   const [secretMessage, setSecretMessage] = useState("");
//   const [recipientEmail, setRecipientEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleDrag = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setIsDragActive(true);
//     } else {
//       setIsDragActive(false);
//     }
//   }, []);

//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragActive(false);
//     const files = Array.from(e.dataTransfer.files);
//     setUploadedFiles(files);
//   }, []);

//   const removeFile = (index) => {
//     setUploadedFiles((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !message || !unlockDate) {
//       alert("Please fill required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 1️⃣ Create capsule
//       const response = await API.post("/capsules", {
//         title,
//         message,
//         unlock_date: unlockDate,
//         secretMessage,
//         recipientEmail,
//       });

//       console.log("Capsule Created:", response.data); 
//       const capsuleId = response.data.data.id; 
//       if (!capsuleId) { 
//         alert("Capsule ID missing"); 
//         return; }
//       // 2️⃣ Upload media if exists
//       if (uploadedFiles.length > 0) {
//         const formData = new FormData();
//         formData.append("file", uploadedFiles[0]);
//         formData.append("capsule_id", capsuleId);

//         await API.post("/capsules/upload", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       alert("Capsule sealed successfully ✨");
//       navigate("/dashboard");

//     } catch (error) {
//   console.error("Create Capsule Error:", error);

//   const message =
//     error.response?.data?.message ||
//     error.response?.data?.error ||
//     error.message ||
//     "Something went wrong";

//   alert(message);

// } finally {
//   setLoading(false);
// }};

//   return (
//     <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0f0f0f] text-white">

//       <header className="border-b border-white/10">
//         <div className="mx-auto flex items-center justify-between px-6 py-4 md:px-12">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 hover:border-yellow-400"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>
//             <div className="flex items-center gap-2">
//               <Clock className="h-5 w-5 text-yellow-400" />
//               <span className="font-serif text-lg font-bold">
//                 TimeCapsule
//               </span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="flex flex-1 items-center justify-center px-4 py-10">
//         <div className="w-full max-w-2xl rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-xl">

//           <h1 className="mb-6 text-3xl font-bold">
//             Create a Capsule
//           </h1>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-6">

//             <input
//               type="text"
//               placeholder="Capsule Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="h-11 rounded-xl border border-white/10 bg-white/5 px-4"
//               required
//             />

//             <textarea
//               rows={4}
//               placeholder="Main Message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
//               required
//             />

//             <textarea
//               placeholder="Secret Message (revealed after unlock)"
//               value={secretMessage}
//               onChange={(e) => setSecretMessage(e.target.value)}
//               className="rounded-xl border border-purple-500/30 bg-purple-900/20 px-4 py-3"
//             />

//             <input
//               type="email"
//               placeholder="Future Recipient Email (optional)"
//               value={recipientEmail}
//               onChange={(e) => setRecipientEmail(e.target.value)}
//               className="h-11 rounded-xl border border-white/10 bg-white/5 px-4"
//             />

//             <input
//               type="date"
//               value={unlockDate}
//               onChange={(e) => setUnlockDate(e.target.value)}
//               className="h-11 rounded-xl border border-white/10 bg-white/5 px-4"
//               required
//             />

//             {/* Upload */}
//             <div
//               onDragEnter={handleDrag}
//               onDragOver={handleDrag}
//               onDragLeave={handleDrag}
//               onDrop={handleDrop}
//               className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/20 px-6 py-10"
//             >
//               <Upload className="h-6 w-6 text-gray-400" />
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setUploadedFiles(
//                     Array.from(e.target.files)
//                   )
//                 }
//               />
//             </div>

//             {uploadedFiles.map((file, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between bg-white/10 p-2 rounded"
//               >
//                 <span>{file.name}</span>
//                 <X
//                   className="cursor-pointer"
//                   onClick={() => removeFile(index)}
//                 />
//               </div>
//             ))}

//             <button
//               type="submit"
//               disabled={loading}
//               className="h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold"
//             >
//               {loading ? "Sealing..." : "Seal Capsule"}
//             </button>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default CreateCapsule;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function CreateCapsule() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [secretMessage, setSecretMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message || !unlockDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create capsule
      const response = await API.post("/capsules", {
        title,
        message,
        unlock_date: unlockDate,
        secretMessage,
        recipientEmail,
      });

      console.log("Capsule Created:", response.data);

      const capsuleData = response.data?.data;

      if (!capsuleData || !capsuleData.id) {
        console.error("Capsule ID missing:", response.data);
        alert("Capsule created but ID missing");
        return;
      }

      const capsuleId = capsuleData.id;

      // 2️⃣ Upload media (if exists)
      if (uploadedFiles.length > 0) {
        const formData = new FormData();
        formData.append("file", uploadedFiles[0]);
        formData.append("capsule_id", capsuleId);

        await API.post("/capsules/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("Capsule sealed successfully ✨");
      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Create Capsule Error:",
        error.response?.data || error.message
      );
      alert("Failed to create capsule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold">Create Capsule</h2>

        <input
          type="text"
          placeholder="Capsule Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <textarea
          placeholder="Secret Message (optional)"
          value={secretMessage}
          onChange={(e) => setSecretMessage(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          type="email"
          placeholder="Recipient Email (optional)"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          type="date"
          value={unlockDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          type="file"
          onChange={(e) =>
            setUploadedFiles(Array.from(e.target.files))
          }
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-black p-3 rounded font-semibold"
        >
          {loading ? "Sealing..." : "Seal Capsule"}
        </button>
      </form>
    </div>
  );
}

export default CreateCapsule;