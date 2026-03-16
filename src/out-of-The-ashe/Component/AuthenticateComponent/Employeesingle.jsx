import { useNavigate, useParams } from "react-router-dom";
import { useGetEmployeeByIdQuery } from "../../Redux/Employee";
import { useDispatch } from "react-redux";
import { UpdateChatId } from "../../Redux/StateWeb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faGraduationCap, 
  faCommentDots, 
  faBriefcase,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

function EmployeeProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: emp, isLoading } = useGetEmployeeByIdQuery(id);

  const startChat = () => {
    dispatch(UpdateChatId(id));
    navigate('/MessagePage');
  };

  if (isLoading) {
    return (
      <div className="flex inset-0 z-50 bg-white/80 items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sky-600 font-black uppercase tracking-widest text-xs">Fetching Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-sky-500 font-bold transition-colors group"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform"/>
        <span>Back to Directory</span>
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-white">
        {/* Banner Decor */}
        <div className="h-32 bg-gradient-to-r from-sky-400 to-indigo-500" />

        <div className="px-8 pb-12">
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 mb-8">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={emp?.profile?.mediaurl || emp?.profile || "https://via.placeholder.com/150"} 
                alt={emp?.firstName} 
                className="w-40 h-40 rounded-[2.5rem] object-cover border-8 border-white shadow-lg bg-slate-100"
              />
              <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            {/* Title Info */}
            <div className="flex-1 text-center md:text-left pb-2">
              <h1 className="text-3xl font-black text-slate-800 capitalize leading-tight">
                {emp?.firstName} {emp?.lastName}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sky-600 font-bold uppercase tracking-widest text-xs mt-1">
                <FontAwesomeIcon icon={faBriefcase} />
                <span>{emp?.role || "Staff Member"}</span>
              </div>
            </div>

            {/* Action Button */}
            <button 
              onClick={startChat} 
              className="md:mb-2 bg-sky-500 hover:bg-sky-600 text-white font-black px-8 py-4 rounded-2xl shadow-lg shadow-sky-100 transition-all active:scale-95 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faCommentDots} />
              Message
            </button>
          </div>

          <hr className="border-slate-100 mb-10" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoBlock 
              icon={faGraduationCap} 
              label="Education" 
              value={emp?.educationBackground || "Details not provided"} 
            />
            <InfoBlock 
              icon={faPhone} 
              label="Contact Phone" 
              value={emp?.phone || "N/A"} 
            />
            <InfoBlock 
              icon={faEnvelope} 
              label="Email Address" 
              value={emp?.email || "N/A"} 
              isEmail
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Sub-component
const InfoBlock = ({ icon, label, value, isEmail }) => (
  <div className="flex flex-col gap-2 p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-hover hover:bg-white hover:shadow-md">
    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-500 shadow-sm">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className={`font-bold text-slate-700 break-words ${isEmail ? 'text-sky-600' : ''}`}>
        {value}
      </p>
    </div>
  </div>
);

export default EmployeeProfile;