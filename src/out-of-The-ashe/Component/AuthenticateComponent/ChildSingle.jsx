import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faSearch, faUpload, faDownload, faTrash, 
  faChevronLeft, faChevronRight, faTimes, faEllipsisV, faUserGraduate, faCalendarAlt 
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { 
  useGetChildByIDQuery, 
  useUpdateChildMutation, 
  useDeleteFileMutation, 
  useUploadProfileMutation,
  useCreateChildOtherFileMutation 
} from "../../Redux/Childes";

// --- Sub-Component: Media Gallery ---
const MediaGallery = ({ images, type, id, onUpload }) => {
  const [index, setIndex] = useState(0);
  const [showFull, setShowFull] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  
  if (!images?.length) return (
    <div className="w-40 h-40 bg-slate-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
      <FontAwesomeIcon icon={faUpload} className="text-slate-300 mb-2" />
      <span className="text-[10px] font-bold text-slate-400 uppercase">No Image</span>
    </div>
  );

  const current = images[index];

  const handleAction = async (action) => {
    setMenuOpen(false);
    try {
      if (action === 'download') {
        const res = await fetch(current.mediaurl);
        const blob = await res.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Profile_${type}.jpg`;
        link.click();
      } else if (action === 'delete') {
        await deleteFile({ public_id: current.public_id, id, selectionType: type }).unwrap();
        toast.success("Image removed");
      }
    } catch (err) { toast.error("Action failed"); }
  };

  return (
    <div className={`relative group ${showFull ? "fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" : "w-40 h-40"}`}>
      <img 
        src={current.mediaurl} 
        className={`object-cover rounded-2xl shadow-lg cursor-pointer transition-transform ${showFull ? "max-h-[80vh] w-auto" : "w-full h-full hover:scale-105"}`}
        onClick={() => setShowFull(!showFull)}
      />
      
      {/* Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => setIndex(prev => Math.max(0, prev - 1))} className="bg-white/80 p-2 rounded-full shadow-sm"><FontAwesomeIcon icon={faChevronLeft}/></button>
        <button onClick={() => setIndex(prev => Math.min(images.length -1, prev + 1))} className="bg-white/80 p-2 rounded-full shadow-sm"><FontAwesomeIcon icon={faChevronRight}/></button>
      </div>

      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-2 right-2 bg-white/90 w-8 h-8 rounded-full shadow-sm flex items-center justify-center hover:bg-white"
      >
        <FontAwesomeIcon icon={faEllipsisV} className="text-slate-600 text-xs"/>
      </button>

      {menuOpen && (
        <div className="absolute top-12 right-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-10 w-32 animate-in slide-in-from-top-2">
          <button onClick={() => handleAction('download')} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-bold flex items-center gap-2"><FontAwesomeIcon icon={faDownload}/> Download</button>
          <button onClick={() => handleAction('delete')} className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-500 rounded-lg text-xs font-bold flex items-center gap-2"><FontAwesomeIcon icon={faTrash}/> Delete</button>
        </div>
      )}
      
      {showFull && <button onClick={() => setShowFull(false)} className="absolute top-10 right-10 text-white text-3xl"><FontAwesomeIcon icon={faTimes}/></button>}
    </div>
  );
};

// --- Main Component ---
const ChildSingle = () => {
  const { id } = useParams();
  const { data: child, isLoading } = useGetChildByIDQuery(id);
  const [updateChild, { isLoading: isUpdating }] = useUpdateChildMutation();
  
  const [childInfo, setChildInfo] = useState({});
  const [editMode, setEditMode] = useState({ child: false, parent: false });

  useEffect(() => { if (child) setChildInfo(child); }, [child]);

  const handleSave = async (section) => {
    try {
      const payload = section === 'child' ? {
        childFirstName: childInfo.childFirstName,
        childLastName: childInfo.childLastName,
        childPhone: childInfo.childPhone,
        childBirthDay: childInfo.childBirthDay,
        Grade: childInfo.Grade,
        ChildDescription: childInfo.ChildDescription
      } : {
        parentFirstName: childInfo.parentFirstName,
        parentLastName: childInfo.parentLastName,
        parentPhone: childInfo.parentPhone,
        ParentDescription: childInfo.ParentDescription
      };

      await updateChild({ data: payload, id }).unwrap();
      toast.success("Profile updated!");
      setEditMode(prev => ({ ...prev, [section]: false }));
    } catch (err) { toast.error("Update failed"); }
  };

  if (isLoading) return <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-8">
      <ToastContainer position="top-right" />
      
      {/* Header Card */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white flex flex-col md:flex-row gap-8 items-center">
        <MediaGallery images={childInfo?.Childfile} type="child" id={id} />
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
              {childInfo?.childFirstName} {childInfo?.childLastName}
            </h1>
            <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              ID: {id?.slice(-5)}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-bold">
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faUserGraduate} className="text-sky-400"/> Grade {childInfo?.Grade}</span>
            <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="text-sky-400"/> {childInfo?.childBirthDay}</span>
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Child Detailed Info */}
        <section className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/40 border border-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-800">Child Details</h3>
            <button 
              onClick={() => editMode.child ? handleSave('child') : setEditMode({...editMode, child: true})}
              className={`px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${editMode.child ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {editMode.child ? "Save Changes" : "Edit Info"}
            </button>
          </div>
          
          <div className="space-y-4">
            <EditableField label="First Name" value={childInfo.childFirstName} onChange={v => setChildInfo({...childInfo, childFirstName: v})} editMode={editMode.child} />
            <EditableField label="Last Name" value={childInfo.childLastName} onChange={v => setChildInfo({...childInfo, childLastName: v})} editMode={editMode.child} />
            <EditableField label="Phone" value={childInfo.childPhone} onChange={v => setChildInfo({...childInfo, childPhone: v})} editMode={editMode.child} />
            <EditableField label="Description" value={childInfo.ChildDescription} onChange={v => setChildInfo({...childInfo, ChildDescription: v})} editMode={editMode.child} isTextArea />
          </div>
        </section>

        {/* Parent Info */}
        <section className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/40 border border-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-slate-800">Guardian Info</h3>
            <button 
              onClick={() => editMode.parent ? handleSave('parent') : setEditMode({...editMode, parent: true})}
              className={`px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${editMode.parent ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {editMode.parent ? "Save Changes" : "Edit Info"}
            </button>
          </div>
          
          <div className="space-y-4">
            <EditableField label="Parent Name" value={`${childInfo.parentFirstName || ''} ${childInfo.parentLastName || ''}`} editMode={false} />
            <EditableField label="Contact" value={childInfo.parentPhone} onChange={v => setChildInfo({...childInfo, parentPhone: v})} editMode={editMode.parent} />
            <EditableField label="Bio/Notes" value={childInfo.ParentDescription} onChange={v => setChildInfo({...childInfo, ParentDescription: v})} editMode={editMode.parent} isTextArea />
            <div className="pt-4 border-t border-slate-50">
               <MediaGallery images={childInfo?.Parentfile} type="parent" id={id} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Helper Component for Inputs ---
const EditableField = ({ label, value, onChange, editMode, isTextArea }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    {editMode ? (
      isTextArea ? (
        <textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-sky-400 rounded-2xl outline-none transition-all font-bold text-slate-700 min-h-[100px]"
        />
      ) : (
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 bg-slate-50 border-2 border-transparent focus:border-sky-400 rounded-2xl outline-none transition-all font-bold text-slate-700"
        />
      )
    ) : (
      <div className="p-4 bg-slate-50/50 rounded-2xl font-bold text-slate-600 border border-slate-100">
        {value || "Not provided"}
      </div>
    )}
  </div>
);

export default ChildSingle;